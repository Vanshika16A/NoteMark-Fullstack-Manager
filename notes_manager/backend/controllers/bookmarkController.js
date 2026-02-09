const Bookmark = require('../models/Bookmark');
const axios = require('axios');
const { parse } = require('node-html-parser');

exports.getBookmarks = async (req, res) => {
  try {
    const { q } = req.query;
    let query = {}; // Removed userId filter
    
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { url: { $regex: q, $options: 'i' } }
      ];
    }
    
    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    console.error("Get Bookmarks Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.createBookmark = async (req, res) => {
  try {
    let { url, title } = req.body;
    
    // Auto-fetch title logic
    if (!title || title.trim() === "") {
      try {
        const { data } = await axios.get(url, { timeout: 3000 });
        const root = parse(data);
        title = root.querySelector('title')?.text || url;
      } catch (err) {
        title = url; // Fallback to URL if fetch fails
      }
    }

    const newBookmark = new Bookmark({ 
      url, 
      title: title.trim(),
      // userId: req.user?.id // Commented out for testing
    });

    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (err) {
    console.error("Create Bookmark Error:", err);
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};