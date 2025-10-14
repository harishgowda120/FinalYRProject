const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, age, email, password, mobile, profession, goals = [], emotions = [] } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Create new user with provided goals & emotions
    const user = await User.create({
      name,
      age,
      email,
      password,   // ⚠️ You should hash this with bcrypt
      mobile,
      profession,
      emotions,
      goals,
    });

    res.status(201).json({ message: "Signup successful", user });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (password !== user.password)
      return res.status(401).json({ message: 'Invalid credentials' });

   

    res.status(200).json({
      message: 'Login successful',
      user,
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// ➕ Add emotion
const addEmotion = async (req, res) => {
  try {
    const { userId, emotion, confidence } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.emotions.push({ emotion, confidence });
    await user.save();

    res.status(201).json({ message: "Emotion added", emotions: user.emotions });
  } catch (err) {
    res.status(500).json({ message: "Failed to add emotion", error: err.message });
  }
};

// ✏️ Update emotion
const updateEmotion = async (req, res) => {
  try {
    const { userId, emotionId, newEmotion, newConfidence } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const emotion = user.emotions.id(emotionId);
    if (!emotion) return res.status(404).json({ message: "Emotion not found" });

    if (newEmotion) emotion.emotion = newEmotion;
    if (newConfidence) emotion.confidence = newConfidence;

    await user.save();

    res.status(200).json({ message: "Emotion updated", emotions: user.emotions });
  } catch (err) {
    res.status(500).json({ message: "Failed to update emotion", error: err.message });
  }
};

// 📥 Get all emotions
const getEmotions = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("emotions");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ emotions: user.emotions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch emotions", error: err.message });
  }
};


module.exports = { signup, login, addEmotion, updateEmotion, getEmotions };

