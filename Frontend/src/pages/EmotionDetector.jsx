import { useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function EmotionDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [emotionResult, setEmotionResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [manualEmotion, setManualEmotion] = useState('');
  const [isOverride, setIsOverride] = useState(false);
  const [lastEmotionId, setLastEmotionId] = useState(null); // track last added emotion for updates

  const FLASK_BACKEND_URL = "http://127.0.0.1:8000/detect_emotion"; 
  const NODE_BACKEND_URL = "https://finalyrproject-2.onrender.com/api/users/emotions"; // Node API routes

  // ✅ Get logged-in user globally (adjust based on your global state management)
  const user = JSON.parse(localStorage.getItem("user"));

  // Start webcam
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  // Capture frame from video and send to backend
  const captureImage = async () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    const imageData = canvasRef.current.toDataURL('image/png');
    setCapturedImage(imageData);

    const blob = await (await fetch(imageData)).blob();
    const file = new File([blob], "capture.png", { type: "image/png" });

    await sendToFlask(file);
  };

  // Upload image from file input
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

  // Send image to Flask for emotion detection
  const sendToFlask = async (file) => {
    setLoading(true);
    setEmotionResult("");
    setIsOverride(false);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(FLASK_BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        const detectedEmotion = data.emotion;
        setEmotionResult(`😃 Detected Emotion: ${detectedEmotion} — ${data.explanation}`);

        // ➕ Save detected emotion to Node backend
        if (user?._id) {
          const saveRes = await fetch(`${NODE_BACKEND_URL}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user._id,
              emotion: detectedEmotion,
              confidence: data.confidence || 1.0,
            }),
          });

          const saveData = await saveRes.json();
          if (saveRes.ok) {
            const last = saveData.emotions[saveData.emotions.length - 1];
            setLastEmotionId(last._id); // save ID for future update
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

  // Handle manual override
  const handleOverride = async () => {
    if (!manualEmotion.trim()) return;
    setEmotionResult(`✏️ User Updated Emotion: ${manualEmotion}`);
    setIsOverride(true);

    // ✏️ Update emotion in Node backend
    if (user?._id && lastEmotionId) {
      try {
        const updateRes = await fetch(`${NODE_BACKEND_URL}/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            emotionId: lastEmotionId,
            newEmotion: manualEmotion,
            newConfidence: 1.0,
          }),
        });

        await updateRes.json(); // (you can log this if needed)
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
            📌 Click "Capture" for a clear image or upload a photo. If the detected emotion doesn’t match your real feeling, you can update it manually.
          </p>

          <div className="row">
            {/* Camera Section */}
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

            {/* Upload Section */}
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
                
                <p className="fs-5">
                  {loading ? "⏳ Detecting emotion..." : emotionResult}
                </p>

                {/* Manual Override Section */}
                {!loading && emotionResult && (
                  <div className="mt-3">
                    <label className="form-label fw-bold">🙋 Not correct? Update your emotion:</label>
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your actual feeling..."
                        value={manualEmotion}
                        onChange={(e) => setManualEmotion(e.target.value)}
                      />
                      <button className="btn btn-warning" onClick={handleOverride}>
                        Update
                      </button>
                    </div>
                    {isOverride && (
                      <p className="text-success mt-2">✔️ Your update has been recorded.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-5">
            <h4>ℹ️ How it works</h4>
            <p>
              This tool allows you to either capture your photo from the webcam or upload one from your device.
              The backend analyzes the facial expressions using AI (DeepFace in Flask) and returns the detected emotion.
              If the prediction is incorrect, you can override it with your actual feeling. Your data is then stored securely in the database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

