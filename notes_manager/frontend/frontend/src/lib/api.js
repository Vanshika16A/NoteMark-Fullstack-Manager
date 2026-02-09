import axios from 'axios';

const API = axios.create({ 
  baseURL: 'http://localhost:10000/api' 
});

// Helper functions for the UI
export const fetchNotes = (q = '') => API.get(`/notes?q=${q}`);
export const fetchBookmarks = (q = '') => API.get(`/bookmarks?q=${q}`);
export const createNote = (data) => API.post('/notes', data);
export const createBookmark = (data) => API.post('/bookmarks', data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);
export const deleteBookmark = (id) => API.delete(`/bookmarks/${id}`);

export default API;