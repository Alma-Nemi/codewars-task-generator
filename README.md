# 🧩 Codewars Task Generator GUI

A minimalistic Electron-based desktop app that automatically generates and stores your Codewars kata solutions as individual files.  
Organize your progress effortlessly — with a hint of magic. 💫

---

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');

body {
  font-family: 'Fira Code', monospace;
  background: radial-gradient(circle at top, #0f0f0f 0%, #0a0a0a 100%);
  color: #8FFFA7;
  padding: 2rem 3rem;
  line-height: 1.6;
  font-size: 1rem;
  overflow-x: hidden;
  box-sizing: border-box;
}

h1 {
  font-size: 2.4rem;
  text-align: center;
  color: #8FFFA7;
  text-shadow: 0 0 8px rgba(143, 255, 167, 0.5), 0 0 16px rgba(143, 255, 167, 0.3);
  margin-bottom: 0.3rem;
  animation: glowPulse 3s infinite ease-in-out;
}

.subtitle {
  text-align: center;
  font-size: 1rem;
  color: #A1FFCE;
  opacity: 0.8;
  font-style: italic;
  margin-bottom: 2rem;
  animation: flicker 4s infinite alternate;
}

footer {
  margin-top: 3rem;
  text-align: center;
  font-size: 0.9rem;
  color: #6EE7B7;
  font-style: italic;
  font-family: 'Fira Code', monospace;
  text-shadow: 0 0 6px rgba(110, 231, 183, 0.6), 0 0 10px rgba(110, 231, 183, 0.3);
  user-select: none;
}

footer .magic {
  margin-left: 0.3rem;
  animation: sparkle 3s ease-in-out infinite alternate;
  display: inline-block;
  transform-origin: center bottom;
  color: #A78BFA;
  text-shadow: 0 0 12px #A78BFA;
}

@keyframes glowPulse {
  0%, 100% {
    text-shadow: 0 0 6px rgba(143, 255, 167, 0.4);
  }
  50% {
    text-shadow: 0 0 16px rgba(143, 255, 167, 0.8), 0 0 8px rgba(143, 255, 167, 0.5);
  }
}

@keyframes flicker {
  0% { opacity: 1; }
  45% { opacity: 0.8; }
  60% { opacity: 0.6; }
  80% { opacity: 0.9; }
  100% { opacity: 1; }
}

@keyframes sparkle {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.3) rotate(15deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.7;
  }
}
</style>

## ✨ Features

- ⚙️ Automatically saves each solution in a clean, named `.js` file
- 📂 Organizes solutions by difficulty (e.g. `8-kyu/`, `7-kyu/`)
- 🧾 Stores metadata in `solutions.json`
- 🎨 Simple, intuitive GUI with smooth animations
- 📊 Interactive archive with collapsible task list and total solution count

## 🗃️ Solutions Archive

Create a visual archive of your saved Codewars solutions:

- 🛠️ Automatically parses and displays your saved solutions from `solutions.json`
- 🎯 Groups tasks by difficulty level (e.g., 8kyu–1kyu)
- 🏷️ Shows title, rank, direct link, and task description
- 🔍 Allows interactive browsing and filtering by level
- 🖥️ Opens solution code in a custom-styled preview window

## 🛠️ Tech Stack

- Electron + Node.js
- Vanilla JS + HTML/CSS
- JSON for persistent storage

Made with 🧠 logic and 🧪 curiosity.

## 🚀 Getting Started

```bash
npm install
npm start
```
<footer>Crafted with care and a touch of magic<span class="magic">🪄</span></footer>