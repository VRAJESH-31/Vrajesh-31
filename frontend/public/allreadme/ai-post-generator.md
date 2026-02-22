# ✨ AI Post Generator

## Overview

A full-stack MERN application that uses **Google Gemini AI** to generate smart social media captions and **Google Veo** to create AI-powered videos from your images.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=flat-square)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue?style=flat-square&logo=tailwindcss)

### 🚀 Features

- **📷 Image Upload** – Upload images to generate content
- **💬 Smart Captions** – AI generates 3 unique captions (Witty, Professional, Emotional) with relevant hashtags
- **🎬 Video Magic** – Transform static images into AI-generated videos using Google Veo
- **🔐 User Authentication** – Secure JWT-based login and registration
- **📱 Responsive UI** – Modern, clean interface built with React & Tailwind CSS

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, Vite, TailwindCSS, Axios  |
| Backend    | Node.js, Express 5, Mongoose        |
| Database   | MongoDB                             |
| AI/ML      | Google Gemini AI, Google Veo 2.0    |
| Auth       | JWT, bcryptjs                       |

---

## Architecture

### 📁 Project Directory Structure

```
AI_GEN/
├── backend/
│   └── src/
│       ├── config/         # Database configuration
│       ├── controllers/    # Auth, Caption, Video, Upload logic
│       ├── middleware/     # JWT authentication middleware
│       ├── models/         # Mongoose schemas (User, Upload, Caption, VideoJob)
│       ├── routes/         # API route definitions
│       └── server.js       # Express server entry point
├── frontend/
│   └── src/
│       ├── api/            # Axios API client
│       ├── components/     # Reusable UI components
│       ├── context/        # Auth context provider
│       ├── pages/          # Dashboard, Login, Register, History
│       └── App.jsx         # Main application component
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** (local or cloud)
- **Google AI API Key** ([Get one here](https://aistudio.google.com/app/apikey))

### 1. Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/YOUR_USERNAME/AI_GEN.git

# Or fork the repo first, then clone your fork
git clone https://github.com/YOUR_USERNAME/AI_GEN.git
```

```bash
cd AI_GEN
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai_social_content_generator
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

---

## Workflow

### 🔌 API Endpoints & Data Flow

| Method | Endpoint                    | Description                     |
|--------|-----------------------------|---------------------------------|
| POST   | `/api/auth/register`        | Register a new user             |
| POST   | `/api/auth/login`           | Login and get JWT token         |
| POST   | `/api/upload`               | Upload an image                 |
| POST   | `/api/caption`              | Generate AI captions            |
| GET    | `/api/caption/:uploadId`    | Get captions for an upload      |
| POST   | `/api/video`                | Generate AI video               |
| GET    | `/api/video/status/:jobId`  | Check video generation status   |
| GET    | `/api/video/all`            | Get all video jobs              |

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">
Made with ❤️ using MERN Stack & Google AI
</p>
