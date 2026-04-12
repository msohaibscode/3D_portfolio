import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import Home from './pages/frontend/Home';
import About from './pages/frontend/About';
import Portfolio from './pages/frontend/Portfolio';
import Contact from './pages/frontend/Contact';
import Services from './pages/frontend/Services';
import Navbar from './components/Navbar';
import MenuNavbar from './components/MenuNavbar';

function App() {
  useEffect(() => {
    // Hidden voice assistant greeting
    const greet = () => {
      const msg = new SpeechSynthesisUtterance("Hi Sir, how can I help you?");
      window.speechSynthesis.speak(msg);
    };

    // Only greet once per session
    if (!sessionStorage.getItem('greeted')) {
      setTimeout(greet, 2000); // Small delay for better UX
      sessionStorage.setItem('greeted', 'true');
    }
  }, []);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="app-container">
        <Navbar />
        <MenuNavbar />
        <Suspense fallback={
          <div className="loader-container">
            <div className="loader-content">
              <h1>Muhammad Sohaib</h1>
              <div className="loader-line"></div>
              <p>INITIALIZING EXPERIENCE</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
