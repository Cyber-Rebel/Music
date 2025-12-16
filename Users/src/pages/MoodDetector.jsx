import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import { FaCamera, FaExclamationCircle } from "react-icons/fa";

const MoodDetector = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);

  // Load AI models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  // Start camera
  useEffect(() => {
    if (!modelsLoaded) return;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
      }
    });
  }, [modelsLoaded]);

  // Detect face + mood
  const cpmoment = async () => {
    setAnalyzing(true);
    setError(null);
    setFaceDetected(false);

    const detections = await faceapi
      .detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

    if (detections.length === 0) {
      setError("Face not detected! Please position yourself clearly.");
      setAnalyzing(false);
      return;
    }

    // ✅ Face detected → blue border
    setFaceDetected(true);

    const sorted = Object.entries(detections[0].expressions).sort(
      (a, b) => b[1] - a[1]
    );

    const mood = sorted[0][0];
    navigate(`/mood-songs/${mood}`);
    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 flex flex-col items-center gap-8 w-full max-w-4xl">

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Mood Detector
          </h1>
          <p className="text-gray-400 mt-2">
            Let AI find the perfect music for your vibe
          </p>
        </div>

        {/* Camera Box */}
        <div className="w-full max-w-2xl">
          <div
            className={`relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-black/50 backdrop-blur-xl transition-all duration-300
              ${
                faceDetected
                  ? "border-2 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                  : "border border-white/10"
              }
            `}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-auto max-h-[60vh] object-cover scale-x-[-1]"
            />

            {/* Loading */}
            {!modelsLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-white">Loading AI Models...</p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <div className="text-center">
                  <FaExclamationCircle className="text-4xl text-red-500 mx-auto" />
                  <p className="text-white mt-3 font-semibold">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={cpmoment}
          disabled={!modelsLoaded || analyzing}
          className="px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {analyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <FaCamera />
              Detect Mood
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MoodDetector;
