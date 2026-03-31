const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/request', auth, (req, res) => {
  const { type, description } = req.body;
  // In a real app, this would save to a SupportRequest model or send an email.
  // For now, we simulate success.
  console.log(`Support request from user ${req.user.id}: ${type} - ${description}`);
  res.json({ message: 'Request submitted successfully. Our team will contact you within 4 hours.' });
});

module.exports = router;
