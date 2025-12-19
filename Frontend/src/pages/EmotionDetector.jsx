import { useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function EmotionDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [emotionResult, setEmotionResult] = useState('');
  const [probabilities, setProbabilities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualEmotion, setManualEmotion] = useState('');
  const [isOverride, setIsOverride] = useState(false);
  const [lastEmotionId, setLastEmotionId] = useState(null);

  // 🔥 Updated Flask URL
  const FLASK_BACKEND_URL = "https://finalpybackend-2.onrender.com/detect_emotion";

  const NODE_BACKEND_URL = "https://finalyrproject-2.onrender.com/api/users/emotions";

  const user = JSON.parse(localStorage.getItem("user"));

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const captureImage = async () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    const imageData = canvasRef.current.toDataURL('image/png');
    setCapturedImage(imageData);

    const blob = await (await fetch(imageData)).blob();
    const file = new File([blob], "capture.png", { type: "image/png" });

    await sendToFlask(file);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCapturedImage(reader.result);
    };
    reader.readAsDataURL(file);

    await sendToFlask(file);
  };

  const sendToFlask = async (file) => {
    setLoading(true);
    setEmotionResult("");
    setProbabilities(null);
    setIsOverride(false);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(FLASK_BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("FLASK RESPONSE:", data);

      if (response.ok) {
        const detectedEmotion = data.emotion;

        setEmotionResult(
          `😃 Detected Emotion: ${detectedEmotion} — ${data.explanation}`
        );

        // Save probability list
        setProbabilities(data.probabilities);

        // ➕ Save detected emotion to Node backend
        if (user?._id) {
          const saveRes = await fetch(`${NODE_BACKEND_URL}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user._id,
              emotion: detectedEmotion,
              confidence: 1.0,
            }),
          });

          const saveData = await saveRes.json();
          if (saveRes.ok) {
            const last = saveData.emotions[saveData.emotions.length - 1];
            setLastEmotionId(last._id);
          }
        }
      } else {
        setEmotionResult(`❌ Error: ${data.error || "Unable to detect emotion"}`);
      }
    } catch (error) {
      setEmotionResult(`⚠️ Request failed: ${error.message}`);
    }

    setLoading(false);
  };

  const handleOverride = async () => {
    if (!manualEmotion.trim()) return;
    setEmotionResult(`✏️ User Updated Emotion: ${manualEmotion}`);
    setIsOverride(true);

    if (user?._id && lastEmotionId) {
      try {
        await fetch(`${NODE_BACKEND_URL}/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            emotionId: lastEmotionId,
            newEmotion: manualEmotion,
            newConfidence: 1.0,
          }),
        });
      } catch (error) {
        console.error("Failed to update emotion:", error);
      }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="p-4 flex-grow-1">
        <div className="container">
          <h2 className="mb-4">🎭 Emotion Detector</h2>
          <p className="text-muted">
            📌 Capture or upload a photo to analyze your emotion. Update manually if incorrect.
          </p>

          <div className="row">
            {/* Camera */}
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">📷 Live Camera</h5>
                  <video ref={videoRef} width="100%" height="240" autoPlay className="border rounded"></video>
                  <div className="mt-3 d-flex justify-content-between">
                    <button className="btn btn-outline-primary" onClick={startCamera}>Start Camera</button>
                    <button className="btn btn-success" onClick={captureImage}>Capture</button>
                  </div>
                  <canvas ref={canvasRef} width="320" height="240" className="d-none"></canvas>
                </div>
              </div>
            </div>

            {/* Upload */}
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">📁 Upload Image</h5>
                  <input type="file" accept="image/*" className="form-control mb-3" onChange={handleImageUpload} />
                </div>
              </div>
            </div>
          </div>

          {/* Display Result */}
          {capturedImage && (
            <div className="card mt-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🧠 Emotion Result</h5>

                <img src={capturedImage} alt="Captured" className="img-thumbnail mb-3" style={{ maxWidth: '320px' }} />

                <p className="fs-5">{loading ? "⏳ Detecting emotion..." : emotionResult}</p>

                {/* 🔥 Probability Table */}
                {probabilities && (
                  <div className="mt-3">
                    <h6 className="fw-bold">📊 Emotion Probabilities</h6>
                    <ul className="list-group">
                      {Object.entries(probabilities).map(([emo, val]) => (
                        <li key={emo} className="list-group-item d-flex justify-content-between">
                          <strong>{emo}</strong>
                          <span>{val.toFixed(2)}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Manual Override */}
                {!loading && emotionResult && (
                  <div className="mt-3">
                    <label className="form-label fw-bold">🙋 Not correct? Update emotion:</label>
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your actual feeling..."
                        value={manualEmotion}
                        onChange={(e) => setManualEmotion(e.target.value)}
                      />
                      <button className="btn btn-warning" onClick={handleOverride}>Update</button>
                    </div>
                    {isOverride && <p className="text-success mt-2">✔️ Emotion updated.</p>}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

