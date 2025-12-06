const {GoogleGenAI,createUserContent,createPartFromUri} = require('@google/genai')

const ai = new GoogleGenAI({});

const geminisongmooddetection = async (base64Music) => {

const contents = [
{
  text: `Analyze this audio and respond ONLY in JSON format:

{
  "mood": "happy | sad | angry | fearful | disgusted | surprised | neutral",
  "emoji": "😊 | 😢 | 😠 | 😨 | 🤢 | 😲 | 😐",
  "energy_level": "low | medium | high",
  "reason": "short explanation (why you detected this mood)"
}

Rules:
- Only choose ONE mood from the list
- "emoji" must match the mood
- No extra text outside JSON
`
}
,
  {
    inlineData: {
      mimeType: "audio/mp3",
      data: base64Music,
    },
  },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
});
console.log(response.text);
return response.text;


}


module.exports = {geminisongmooddetection};