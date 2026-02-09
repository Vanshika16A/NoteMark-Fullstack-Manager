const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => res.json({ msg: "Auth setup coming soon" }));
router.post('/login', (req, res) => res.json({ msg: "Auth setup coming soon" }));

module.exports = router;