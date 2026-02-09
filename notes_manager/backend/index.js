require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION BLOCK ---
// Use the variable from .env, but if it's missing, use your Atlas string directly
const DB_URI = process.env.MONGO_URI || "PASTE_YOUR_ATLAS_STRING_HERE";

console.log("Attempting to connect to:", DB_URI.substring(0, 20) + "..."); 

mongoose.connect(DB_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);
  });
// ---------------------------------

app.use('/api/notes', require('./routes/notes'));
app.use('/api/bookmarks', require('./routes/bookmarks'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));