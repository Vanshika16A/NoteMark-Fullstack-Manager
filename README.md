# 📝 NoteMark Manager
**Personal Notes & Bookmark Manager**

A sleek, high-performance full-stack application built to organize thoughts and web resources. Featuring a modern **Black & Blue** high-contrast UI, automated metadata fetching, and cloud-synchronized storage.

---

## 🚀 Tech Stack & Versions
| Component | Technology | Version |
| :--- | :--- | :--- |
| **Frontend** | Next.js (App Router) | v15.1.6 |
| **Styling** | Tailwind CSS | v4.0.0 |
| **Icons** | Lucide React | v0.474.0 |
| **Backend** | Node.js | v22.20.0 |
| **Framework** | Express.js | v4.21.2 |
| **Database** | MongoDB Atlas | Cloud Cluster |
| **Parser** | node-html-parser | v7.0.1 (For Auto-title fetch) |

---

## ✨ Key Features
- **Notes Management:** Create, search, and categorize notes with dynamic tags.
- **Smart Bookmarks:** Save URLs with **automated title fetching** (Bonus Feature). The backend scrapes the target website's metadata so you don't have to type titles manually.
- **Global Search:** Real-time filtering for both notes and bookmarks using MongoDB `$regex` indexing.
- **Developer-Centric UI:** A responsive, dark-themed interface using deep navy (`#020617`) and electric blue (`#3b82f6`) hues.
- **Cloud Persistence:** Data is stored securely in the cloud, ensuring accessibility across different environments.

---

## ☁️ Why MongoDB Atlas? (Deployment Note)
During development on **Ubuntu 25.04 (Plucky Puffin)**, we encountered a specific system limitation:
- **The Issue:** Ubuntu 25.04 is a "non-LTS" cutting-edge release. As of early 2025, the official MongoDB repositories (`mongodb-org`) do not yet have a release candidate for "Plucky," leading to `404 Not Found` errors during `apt-get` installation.
- **The Solution:** We migrated the database layer to **MongoDB Atlas**. 
- **Benefit:** This makes the application **platform-independent**. It bypasses local OS compatibility issues and ensures that the database is managed, scalable, and accessible via a secure connection string regardless of the host machine's configuration.

---

## 🧪 Verified Test Cases
The following functional tests were successfully performed to ensure project requirements were met:

1.  **CRUD Operations (Notes):** Created notes with titles, content, and multiple tags. Verified that data saves to the cloud and displays instantly.
2.  **Search Filtering:** Verified that typing a keyword in the search bar filters the UI in real-time. Tested search against both "Title" and "Tags" fields.
3.  **Delete Functionality:** Verified that clicking the trash icon removes the record from both the UI and the MongoDB Atlas collection.
4.  **Bookmark Auto-Fetch (Bonus):** Tested by entering a URL (e.g., `https://github.com`) without a title. Confirmed the backend successfully scraped and returned the site's official title.
5.  **Data Persistence:** Performed a hard browser refresh and server restart. Verified that all notes and bookmarks remained intact via the Atlas cloud connection.

---

## 🛠️ Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```
Start the server:
```bash
npx nodemon index.js
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Start the development server:
```bash
npm run dev
```

---

## 📡 API Documentation

### Notes API
- `GET /api/notes?q=searchTerm` - Fetch all notes (optional search)
- `POST /api/notes` - Create a new note
- `DELETE /api/notes/:id` - Remove a note

### Bookmarks API
- `GET /api/bookmarks?q=searchTerm` - Fetch all bookmarks
- `POST /api/bookmarks` - Create a bookmark (fetches title if missing)
- `DELETE /api/bookmarks/:id` - Remove a bookmark

---

## 🎨 UI Preview
- **Primary Background:** `#020617`
- **Surface Cards:** `#0f172a`
- **Accent Blue:** `#3b82f6`
- **Text:** Slate-50 for high readability.

---
*Developed as part of the Personal Notes & Bookmark Manager project.*
