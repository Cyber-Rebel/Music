const {geminisongmooddetection} = require('../services/ai.serviecs.js')

const musicMoodDectect = async (req, res, next) => {
    // Check if user selected manual mood or AI detection
    const moodMode = req.body.moodMode || 'ai'; // default to ai if not specified
    
    // If manual mood selection, skip AI detection
    if (moodMode === 'manual' && req.body.mood) {
        req.moodDetectionResult = req.body.mood.toLowerCase();
        return next();
    }

    // AI Detection Mode
    const musicFile = req.file || (req.files && req.files['music'] && req.files['music'][0]);
    
    if (!musicFile) {
        return res.status(400).json({ message: "Music file is required for AI mood detection" });
    }

    try {
        const base64Music = musicFile.buffer.toString('base64');
        const response = await geminisongmooddetection(base64Music);
        console.log("Response from mood detection:", response);

        // Parse the response if it's a JSON string
        let moodData;
        if (typeof response === 'string') {
            // Remove markdown code blocks if present
            const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            moodData = JSON.parse(cleanedResponse);
        } else {
            moodData = response;
        }

        const mood = moodData.mood;
        req.moodDetectionResult = mood;
        next();

    } catch (error) {
        console.log("Error in mood detection", error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

module.exports = {musicMoodDectect};
