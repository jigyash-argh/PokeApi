<div align="center">

# 🌟 Pokédex & Tactical Arena Explorer

**A high-performance, modern web application bridging nostalgic gaming with industrial-standard frontend architecture.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](#)

</div>

---

## 🚀 Overview

Welcome to my Pokémon Explorer and Tactical Arena! 

While many developers build a Pokédex, this project was engineered to serve as a comprehensive demonstration of **modern frontend capabilities**. It goes beyond simple data fetching to showcase complex API orchestration, responsive glassmorphic UI design, custom CSS animations, and clean, scalable code architecture.

Whether you are here to check out the seamless transition animations, the deep-lore evolution trees, or the code structure behind it all, this project reflects my dedication to shipping polished, production-ready software.

---

## ✨ Key Features

### 🔍 Deep Search & API Orchestration
*   **Sequential Data Resolution:** Bypasses the limitations of standard API endpoints by orchestrating multiple relational calls (Base Data → Species Data → Evolution Chains) to construct a highly detailed, unified UI component.
*   **Recursive Evolution Parsing:** Implements recursive algorithms to traverse highly nested JSON objects, dynamically rendering complex, branched evolution trees.

### ⚔️ Tactical Matchup Arena
*   **Algorithmic Combat Prediction:** A custom, math-driven engine that pits two Pokémon against each other. It analyzes Base Stat Totals (BST), Speed metrics, and move pools to calculate and predict the victor without relying on external AI dependencies.
*   **Dual-Lock System:** Allows users to stage combatants in a sleek, side-by-side interface before executing the analysis sequence.

### 🎨 Premium UI/UX & Glassmorphism
*   **Dynamic Theming:** Features heavily stylized, retro-modern environments tailored to specific routes (e.g., vibrant, sunny layouts for the global search, and deep, dark glassmorphic themes for the tactical arena).
*   **Zero-Margin Layouts:** Strict adherence to modern CSS layout principles, relying entirely on Flexbox/Grid `gap` and `padding` for flawless, predictable responsiveness across all device sizes.
*   **Custom Keyframes:** Implements hardware-accelerated CSS animations, including floating sprites, CRT scanline effects, and ambient glowing backgrounds.

---

## 🏗️ Architecture & Code Quality

This repository is structured with scalability and team collaboration in mind:
*   **Service Layer Isolation:** All API logic is abstracted into dedicated service files (e.g., `pokemonapi.ts`), keeping React components clean and focused purely on the presentation layer.
*   **Reusable Components:** Modular design philosophy. UI elements like `PokemonCard`, `SearchedPokemonCard`, and utility badges are entirely decoupled and reusable.
*   **Strict Typing:** Built with TypeScript to ensure type safety, self-documenting code, and fewer runtime errors.

---

## 🛠️ Tech Stack

*   **Core:** React 18, TypeScript, Vite
*   **Styling:** Tailwind CSS, Custom CSS Keyframes
*   **Networking:** Axios
*   **Icons:** Lucide-React
*   **Routing:** React Router DOM

---

## 💻 Local Installation

Want to run the application locally? Follow these steps:

1. **Clone the repository:**
```bash
   git clone https://github.com/jigyash-argh/PokeApi
   cd pokeapi-projectInstall dependencies:

Bash
   npm install
Start the development server:

Bash
   npm run dev
Open your browser: Navigate to http://localhost:5173
