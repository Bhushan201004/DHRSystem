import { useRef } from "react";
import { Routes, useNavigate , Route } from "react-router-dom";
import Navbar from "./navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./index.css";

export default function App() {
  const homeRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();


  const scrollToSection = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollHandlers = {
    home: () => scrollToSection(homeRef),
    services: () => scrollToSection(servicesRef),
    about: () => scrollToSection(aboutRef),
    contact: () => scrollToSection(contactRef),
  };

  return (
    <>
      <Navbar scrollHandlers={scrollHandlers} />
      <Routes>
        <Route
          path="/"
          element={
            <>
      <section ref={homeRef} className="section home">
        <div className="home-container">
          <div className="homeimg-cont">
            <img src="/images/Homepage.png" />
          </div>
          <div className="home-txt-cont">
            <h1 className="home-heading"><span>Check Your Symptoms,</span> Find Specialist</h1>
            <p>Our system helps you securely store and manage your medical records using blockchain technology. You can easily find the right doctor and access trusted healthcare services anytime.</p>
           <button className="home-btn" onClick={() => navigate("/dashboard")}>Book Appointment</button>

          </div>
        </div>
      </section>

      <section ref={servicesRef} className="section service" id="service">
        <div className="services-container">
          <div className="services-cont">
            <h2>Our Services</h2>
            <p className="service-subtitle">
              Meet the talented people who help build our company.
            </p>

            <div className="doctor-card">
              <div className="patient-grid">
                <div className="patient-card">
                  <img src="/images/MaleDoctor.jpg" alt="patient" />
                  <h4>Dr. Arjun Kumar</h4>
                  <p>Dermatologist</p>
                </div>
                <div className="patient-card">
                  <img src="/images/MaleDoctor.jpg" alt="patient" />
                  <h4>Dr. Rahul Kumar</h4>
                  <p>Neurologist</p>
                </div>
                <div className="patient-card">
                  <img src="/images/FemaleDoctor.jpg" alt="patient" />
                  <h4>Dr. Priya </h4>
                  <p>Pediatrician</p>
                </div>
                <div className="patient-card">
                  <img src="/images/MaleDoctor.jpg" alt="patient" />
                  <h4>Dr. Vikram Kumar</h4>
                  <p>Dentist</p>
                </div>
                <div className="patient-card">
                  <img src="/images/MaleDoctor.jpg" alt="patient" />
                  <h4>Dr. Karan Kumar</h4>
                  <p>Gastroenterologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </section>

      <section ref={aboutRef} className="section about">
        <div className="about-container">
          <div className="about-image">
            <img src="/images/Aboutpage.jpg"/>
          </div>
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              This platform ensures your health records stay protected, private, and always under your control. With smart access and quick doctor recommendations, managing your health becomes easier.
            </p>
            <p>
              We provide a safe and decentralized way to share your health data only with people you trust. AI also guides you with the best doctor and treatment suggestions.
            </p>
            <button className="about-btn">Learn More</button>
          </div>
        </div>
      </section>

      <section ref={contactRef} className="section contact">
        <h2>Contact Us</h2>
        <div className="contact-main">
          <div className="contact-wrapper">
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Message..." required />
            <button type="submit" className="home-btn">Send Message</button>
          </form>

          <div className="map-container">
            <iframe
              title="Office Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.201002717085!2d72.82152351490192!3d19.113643955244928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce8651322ffb%3A0x7993c6d7f88dfb0c!2sMumbai!5e0!3m2!1sen!2sin!4v1707056120000">
            </iframe>
          </div>
        </div>
        </div>
      </section>
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
