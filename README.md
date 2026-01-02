# 🧩 Codewars Task Generator

A web application built with Node.js and Express that automatically generates and stores your Codewars kata solutions as individual files.  
Organize your progress effortlessly — with a hint of magic. 💫

---

## ✨ Features

- ⚙️ Automatically saves each solution in a clean, named `.js` file
- 📂 Organizes solutions by difficulty (e.g. `8-kyu/`, `7-kyu/`)
- 🧾 Stores metadata in `solutions.json`
- 🎨 Simple, intuitive web interface with smooth animations
- 📊 Interactive archive with collapsible task list and total solution count
- 💾 Built-in Save Button – update and persist solution changes directly from the preview window

## 🗃️ Solutions Archive

Create a visual archive of your saved Codewars solutions:

- 🛠️ Automatically parses and displays your saved solutions from `solutions.json`
- 🎯 Groups tasks by difficulty level (e.g., 8kyu–1kyu)
- 🏷️ Shows title, rank, direct link, and task description
- 🔍 Allows interactive browsing and filtering by level
- 🖥️ Opens solution code in a custom-styled preview window
- ✍️ Edit and Save – modify solution code and save changes in-place with a single click

## 🛠️ Tech Stack

- Node.js + Express
- Vanilla JS + HTML/CSS
- JSON for persistent storage

Made with 🧠 logic and 🧪 curiosity.

## 🚀 Getting Started

```bash
npm install
npm start
```

The application will be available at `http://localhost:3000`

- 📝 Generator: `http://localhost:3000/`
- 🗃️ Archive: `http://localhost:3000/archive`
<p align="center">
  <sub>🔮 Crafted with care, magic, and arcane flair by <strong>Witch of Code</strong> 🪄</sub>
</p>