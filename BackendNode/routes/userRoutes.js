const express = require("express");
const { signup, login, addEmotion, updateEmotion, getEmotions } = require("../controllers/userController");

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// Emotions routes
router.post("/emotions/add", addEmotion);
router.put("/emotions/update", updateEmotion);
router.get("/emotions/:userId", getEmotions);

module.exports = router;