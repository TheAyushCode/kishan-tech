# 🌾 Kishan · Tech — Smart Season-wise Indian Crop & Agri-Guide

![Kishan Tech Banner](https://img.shields.io/badge/Architecture-Single_Page_App_(SPA)-2d5a27?style=for-the-badge)

![Status](https://img.shields.io/badge/Deployment-Live-brightgreen?style=for-the-badge)

**Kishan · Tech** ek modern full-stack web application hai jo Indian Agriculture, Farmers, aur Agri-Students ke liye ek integrated digital platform pradan karta hai. Iska mukhy uddeshya kisano ko mausam aur mitti ke anusar sahi fasal chunne, live weather forecasting, daily mandi rates check karne, aur farmer community forum mein charcha karne ki suvidha ek hi jagah dena hai.

---

## 🚀 Live Demo & Deployment

* **Frontend (Vercel):** [https://your-vercel-app-url.vercel.app](https://your-vercel-app-url.vercel.app)
* **Backend API (Render):** [https://kishan-tech.onrender.com](https://kishan-tech.onrender.com)
* **Database:** TiDB Cloud (Serverless MySQL)..


---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies / APIs | Description / Usage |
| :--- | :--- | :--- |
| **Front-End** | HTML5, CSS3, JavaScript  | Responsive UI, Dynamic DOM Manipulation, SPA Routing |
| **APIs** | Open-Meteo REST API | Real-time City Geocoding & Weather Forecast | Google transleter
| **Back-End** | Node.js, Express.js | RESTful APIs, Session Handling, CORS, Mysql2 Pool |
| **Database** |  MySQL | Cloud Data Persistence, User Auth, Encrypted Passwords |
| **Security** | dotenv | Password Hashing & Environment Variable Management |

---

## ✨ Key Features & Modules

- **🔒 Secure Authentication:** Dynamic Sign Up / Sign In verification using Node.js, bcryptjs password hashing, and MySQL/TiDB database integration.
- **🌱 Smart Crop Finder Engine:** Season (*Kharif, Rabi, Zaid*) aur Soil Type (*Loamy, Sandy, Clay, Black Cotton*) select karne par automated intelligent crop recommendations.
- **🌦️ Live Weather Widget:** Open-Meteo API integrated search engine jo kisi bhi city ka real-time Temperature (°C), Humidity (%), aur Weather conditions show karta hai.
- **📊 Daily Mandi Prices Table:** Major crops (*Wheat, Rice, Mustard, Potato, etc.*) ke Min, Max, aur Modal Prices (₹/Qtl) ki live filtering table.
- **❤️ Favorites & Saved Crops:** LocalStorage powered personal bookmarking collection.
- **💬 Farmer Discussion Forum:** Real-time experience sharing and community discussion platform for crops.
- **🗺️ Interactive Crop Map & Festivals:** Region-wise crop growing zones and harvest festivals of India (*Pongal, Baisakhi, Onam, Bihu*).
- **⚙️ Admin Dashboard (CRUD):** Protected panel (`admin123`) jahan se new crops add ya delete ki ja sakti hain.

---

## 📂 Project Directory Structure

```text
kishan-tech-website/
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   └── server.js
├── css/
│   └── style.css
├── js/
│   ├── login.js
│   ├── register.js
│   └── app.js
├── pages/
│   ├── login.html
│   └── register.html
├── README.md
└── index.html
