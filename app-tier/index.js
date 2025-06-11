const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const feedbackService = require('./FeedbackService');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

// Health check
app.get('/health', (req, res) => {
  res.json("Feedback API is healthy!");
});

// Add feedback
app.post('/feedback', (req, res) => {
  const { name, message } = req.body;
  try {
    feedbackService.addFeedback(name, message);
    res.status(200).json({ message: "Thanks for your feedback!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving feedback", error: err.message });
  }
});

// Get all feedback
app.get('/feedback', (req, res) => {
  feedbackService.getAllFeedback((results) => {
    res.status(200).json({ feedback: results });
  });
});

// Delete all feedback
app.delete('/feedback', (req, res) => {
  feedbackService.deleteAllFeedback(() => {
    res.status(200).json({ message: "All feedback deleted." });
  });
});

app.listen(port, () => {
  console.log(`Feedback API running on http://localhost:${port}`);
});
