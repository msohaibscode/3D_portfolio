import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Contact.scss';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skype: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-premium bg-light-gray min-vh-100 position-relative d-flex align-items-center">
      {/* 3D Geometric Background Accents */}
      <div className="geo-bg position-fixed w-100 h-100 top-0 start-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div className="geo-shape shape-1"></div>
        <div className="geo-shape shape-2"></div>
      </div>

      {/* Vertical Sidebar Label */}
      <div className="contact-sidebar-label position-fixed start-0 h-100 d-flex align-items-center justify-content-center border-end">
        <span className="vertical-text small fw-bold tracking-widest opacity-25">CONTACT ME</span>
      </div>

      <div className="container position-relative z-1 py-5" style={{ marginLeft: '80px', maxWidth: '1200px' }}>
        <div className="row align-items-center g-5">
          {/* Left Side: Title & Info */}
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="display-3 fw-bold mb-3 tracking-tighter">Get In Touch</h1>
              <div className="mb-4" style={{ width: '60px', height: '3px', backgroundColor: '#333' }}></div>
              <p className="fs-5 text-secondary opacity-75" style={{ maxWidth: '400px', lineHeight: '1.6' }}>
                Need to get in touch with me? Fill the form below and I'll get back to you shortly.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Form Card */}
          <div className="col-lg-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="contact-card bg-white p-5 rounded-0 shadow-lg"
            >
              <form className="row g-4" onSubmit={(e) => { e.preventDefault(); alert('Message Sent!'); }}>
                <div className="col-md-6">
                  <label className="form-label fw-bold mb-3 d-block">Name*</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control-minimal" placeholder="e.g: John Doe" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold mb-3 d-block">Email*</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control-minimal" placeholder="e.g: info@panagigs.com" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold mb-3 d-block">Skype</label>
                  <input type="text" name="skype" value={formData.skype} onChange={handleChange} className="form-control-minimal" placeholder="live:johndoe" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold mb-3 d-block">Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control-minimal" placeholder="e.g: +1123-456-789" />
                </div>
                
                <div className="col-12 mt-4">
                  <label className="form-label fw-bold mb-3 d-block">How We Can Help You?*</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control-minimal" 
                    rows="4" 
                    placeholder="Give me some details about your project (max 1000 characters)."
                    required
                  ></textarea>
                </div>

                <div className="col-12 mt-5 d-flex justify-content-end">
                  <button type="submit" className="btn-send rounded-pill d-flex align-items-center gap-3 px-5 py-3 fw-bold">
                    Send <ArrowRight size={20} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
