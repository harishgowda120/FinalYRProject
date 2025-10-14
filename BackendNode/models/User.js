const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  profession: String,

  // Store detected emotions history
  emotions: [
    {
      emotion: String,         // e.g. "happy", "sad"
      confidence: Number,      // confidence score if available
      detectedAt: { type: Date, default: Date.now } // timestamp
    }
  ],

  // User goals
  goals: [
    {
      title: String,           // e.g. "Complete assignment"
      description: String,     // optional detailed goal
      status: { type: String, default: "pending" }, // pending/completed
      createdAt: { type: Date, default: Date.now },
      dueDate: Date
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
