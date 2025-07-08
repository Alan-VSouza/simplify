import React, { useEffect } from "react";
import Home from "./Home";
import About from "./About";
import HowWorks from "./HowWorks";
import Contact from "./Contact";
import "../styles/landingpage.css";
import Footer from "./Footer";

const LandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="landing-root">
      <section id="hero-section">
        <Home />
      </section>
      <section id="about-section">
        <About />
      </section>
      <section id="howworks-section">
        <HowWorks />
      </section>
      <section id="contact-section">
        <Contact />
      </section>
        <Footer />
    </div>
  );
};

export default LandingPage;
