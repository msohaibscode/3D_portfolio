import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Services.scss';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Mobile App Developement',
      desc: 'My focus is to develop efficient mobile applications using React Native',
      highlight: 'React Native'
    },
    {
      title: 'Full Stack Developement',
      desc: 'I specialize in building robust full stack solutions with MERN Stack',
      highlight: 'MERN Stack'
    },
    {
      title: 'Backend Developement',
      desc: "I'm focused to develop scalable backend solutions using different architectures.",
      highlight: ''
    },
    {
      title: 'Agentic AI Developement',
      desc: 'My focus is to develop innovative solutions and applications using Agentic AI.',
      highlight: 'Agentic AI'
    }
  ];

  return (
    <div className="services-page bg-white text-dark min-vh-100 p-4 p-md-5 position-relative">
      <div className="container py-5">
        <div className="mb-5 pb-4">
          <h1 className="display-4 fw-bold tracking-tighter mb-2">Services</h1>
          <div style={{ width: '40px', height: '3px', background: '#333' }}></div>
        </div>

        <div className="row g-0 border-start border-top mt-5">
          {services.map((service, index) => (
            <div key={index} className="col-md-6 border-end border-bottom overflow-hidden position-relative">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-5 d-flex flex-column justify-content-between position-relative service-card-v2"
                style={{ height: '340px', cursor: 'pointer' }}
              >
                {/* Expanding hover line at the bottom */}
                <div className="hover-line"></div>

                <div className="content-wrap">
                  <h2 className="h4 fw-bold mb-4 tracking-tight">{service.title}</h2>
                  <p className="text-secondary opacity-75 fs-5 lh-base" style={{ maxWidth: '90%' }}>
                    {service.desc.split(service.highlight).map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="fw-bold text-dark">{service.highlight}</span>}
                      </React.Fragment>
                    ))}
                  </p>
                </div>

                <div className="d-flex justify-content-end">
                  <div className="arrow-icon-wrapper d-flex align-items-center justify-content-center">
                    <ArrowRight className="service-arrow" size={20} />
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Services;
