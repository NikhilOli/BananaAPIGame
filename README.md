# 🍌 Banana Game – Web-Based Quiz Application

This is a small web-based game built as part of the **Software for Enterprise** unit.  
Players answer image-based questions fetched from an external Banana API, earn points, and track their progress through profiles and a leaderboard.

This project demonstrates the following four core concepts:

- ✅ Version Control  
- ✅ Event-Driven Programming  
- ✅ Interoperability  
- ✅ Virtual Identity  

---

## ✅ Features

- 🔐 **User Authentication**
  - Email & password login using Firebase Authentication
  - Guest login supported

- 🎮 **Game Play**
  - Fetches image-based quiz questions from the Banana Game API
  - Single input answer system
  - Instant feedback with color animation & toast messages
  - Session score system with Firestore saving

- 👤 **Profile Page**
  - Displays name, email, total score, games played
  - Shows last active time and recent score history

- 🏆 **Leaderboard**
  - Top 10 players ranked by totalScore
  - Highlights the currently logged-in user

- 📱 **Responsive Design**
  - Mobile-friendly navbar with hamburger menu
  - Works on desktop, tablet, and mobile screens

---

## 🧰 Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript

### Backend / Services
- Firebase Authentication
- Firebase Firestore Database

### Server
- Node.js
- Express.js (for API proxy)

### External API
- Banana Game API (image-based questions)

---

## 📁 Folder / File Structure

```text
/
├─ index.html          # Home page
├─ login.html          # Login page
├─ register.html       # Register page
├─ play.html           # Main game page
├─ profile.html        # User profile
├─ leaderboard.html   # Leaderboard
│
├─ css/
│   ├─ styles.css      # Global dark theme & shared styles
│   ├─ play.css        # Light theme for game page
│
├─ navbar.js           # Responsive navbar + auth-aware buttons
├─ server.js           # Node/Express proxy + static server
├─ package.json
├─ package-lock.json
├─ .gitignore
└─ firebase-config.js  # Local only (NOT in GitHub)
