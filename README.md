
# Pixel Stitch
A full‑stack web application for designing, managing, and generating tapestry crochet patterns. Users can create pixel‑based tapestry grids, view color usage, generate row‑by‑row instructions, and manage their crochet projects in a clean, intuitive interface.
This project blends creativity with engineering — offering a tool that feels playful, powerful, and practical for makers of all levels.

## ✨ Features
### 🎨 Pixel‑Based Tapestry Designer
- Interactive grid editor
- Click‑and‑drag painting
- Integrated color picker
- Real‑time color name lookup
- Inline color swatches in instructions
### 🧵 Smart Crochet Instruction Generator
- Generates row‑by‑row tapestry instructions
- Handles front‑side and back‑side rows
- Includes color changes, stitch counts, and turn instructions
- Inline color blocks for visual clarity
### 📦 Project Management
- Create and save tapestry projects
- Local storage support for guest mode
- Database persistence for logged‑in users
### 📊 Color Usage Breakdown
- Automatic color counting
- Displays hex, name, and total stitches

## 🛠️ Tech Stack
### Frontend
- React (Vite)
- TypeScript
- CSS Modules / custom styling
- React Router
### Backend
- Node.js + Express
- REST API
- Supabase
### Utilities
- Custom color‑name lookup
- Yarn usage + stitch math
- Instruction generation engine

## 🚧 Remaining Work
These are the final pieces needed before the project is feature‑complete:
### 1. Project List View
- Display all user projects
- Include thumbnails, titles, and quick actions
- Sorting + filtering (optional)
### 2. Profile View
- User info
- Saved projects
- Account settings
### 3. Update Project Flow
- Edit project metadata
- Update grid
- Save changes to database
### 4. Frontend Integration + Styling
- Final CSS pass
- Responsive layout
- Consistent UI components
- Polished color palette + spacing

## ▶️ Getting Started
Install dependencies
npm install


Run the client
```bash
npm run dev
```

Run the server
```bash
npm run dev
```


Environment Variables
```txt
Create a .env file in /server:
PORT=5000
DATABASE_URL=...
JWT_SECRET=...
```


### 💡 Vision
Pixel Stitch aims to be the most intuitive, maker‑friendly tapestry crochet tool on the web — blending technical precision with creative freedom. Whether you're designing a simple motif or a full graphghan, this tool helps you bring your ideas to life stitch by stitch.
