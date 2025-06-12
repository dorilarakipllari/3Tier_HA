const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const feedbackService = require('./FeedbackService');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

// ✅ Health check
app.get('/health', (req, res) => {
  res.json("Feedback API is healthy!");
});

app.post('/feedback', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ message: "Both name and message are required." });
  }

  feedbackService.addFeedback(name, message, (err, result) => {
    if (err) {
      console.error("Error adding feedback:", err.message);
      return res.status(500).json({ message: "Error saving feedback", error: err.message });
    }
    res.status(200).json({ message: "Thanks for your feedback!" });
  });
});

// ✅ Get all feedback (with error handling)
app.get('/feedback', (req, res) => {
  feedbackService.getAllFeedback((err, results) => {
    if (err) {
      console.error("DB error:", err.message);
      return res.status(500).json({ message: "Failed to get feedback", error: err.message });
    }
    res.status(200).json({ feedback: results });
  });
});

// ✅ Delete all feedback (with error handling)
app.delete('/feedback', (req, res) => {
  feedbackService.deleteAllFeedback((err, result) => {
    if (err) {
      console.error("Delete error:", err.message);
      return res.status(500).json({ message: "Error deleting feedback", error: err.message });
    }
    res.status(200).json({ message: "All feedback deleted." });
  });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Feedback API running at http://localhost:${port}`);
});
