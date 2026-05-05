# 3D Professional Portfolio - Muhammad Sohaib

A stunning, interactive 3D professional portfolio built with **React**, **Three.js**, and **Framer Motion**. This project features a full-stack architecture with a Node.js/Express backend, MongoDB integration, and AI-powered components.

## 🚀 Live Demo
*(Add your live link here, e.g., https://sohaib-portfolio.vercel.app)*

## ✨ Features

-   **Interactive 3D Scene**: Immersive 3D environment built using `@react-three/fiber` and `@react-three/drei`.
-   **Modern UI/UX**: Responsive design with sleek animations powered by **Framer Motion** and **Ant Design**.
-   **AI Integration**: Integrated with **Google Gemini AI** and **OpenAI** for intelligent interactions.
-   **Contact System**: Fully functional contact form with backend validation and storage in **MongoDB**.
-   **Performance Optimized**: Fast loading and smooth transitions using **Vite**.
-   **Dynamic Content**: Portfolio and services sections are easily customizable.

## 🛠️ Tech Stack

### Frontend
-   **React.js** (Vite)
-   **Three.js** (3D Rendering)
-   **Framer Motion** (Animations)
-   **Ant Design** & **Bootstrap** (UI Components)
-   **Sass** (Styling)
-   **Axios** (API Requests)

### Backend
-   **Node.js** & **Express.js**
-   **MongoDB** (Database)
-   **Mongoose** (ODM)
-   **Google Generative AI** (Gemini)
-   **Helmet** & **Cors** (Security)

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/sohaib-portfolio.git
cd sohaib-portfolio
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Start the frontend:
```bash
npm run dev
```

## 📂 Project Structure

```text
sohaib-portfolio/
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # Reusable components (3D, Nav, etc.)
│   │   ├── pages/        # Main page views (Home, About, Portfolio)
│   │   └── styles/       # CSS/Sass files
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── routes/       # API endpoints
│   │   └── controllers/  # Business logic
│   └── server.js         # Entry point
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

---
Developed with ❤️ by [Muhammad Sohaib](https://github.com/yourusername)
