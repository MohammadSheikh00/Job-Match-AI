import React, { useRef } from 'react';
import LoginForm from '../../components/auth-form/auth-form';
import './home.css';
import clickSound from "../../assets/click.mp3";
import Header from "../../components/header/header";

// ✅ استيراد الصور بشكل صحيح
import jobseekerImage from '../../assets/jobsekeer.jpg';
import companyImage from '../../assets/company.jpg';

function HomePage() {
  const authRef = useRef(null);
  const audioRef = useRef(new Audio(clickSound));
  const featuresRef = useRef(null);
  const footerRef = useRef(null);

  const playClick = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const handleStartClick = () => {
    playClick();
    if (authRef.current) {
      authRef.current.switchToSignUp();
    }
  };

  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="home-container">
        <Header scrollToFeatures={scrollToFeatures} scrollToFooter={scrollToFooter} />
        <div className="slogan">
          <p className="slogan-text">
            <span className="one">Your path to the perfect job</span>
            <span>
              <a className="two" onClick={handleStartClick} style={{ cursor: 'pointer' }}>
                Starts Here!
              </a>
            </span>
          </p>
        </div>
        <LoginForm ref={authRef} />
      </div>

      <section className="features" ref={featuresRef}>
        <h1 className="features-title">Explore What We Offer</h1>

        <div className="feature-block">
          <div className="feature-text">
            <h2>For Job Seekers</h2>
            <ul>
              <li>Improve your resume with personalized suggestions.</li>
              <li>Match with jobs based on your skills and experience.</li>
              <li>Get recommendations to learn missing skills.</li>
              <li>Speed up your job search and find the best opportunities.</li>
            </ul>
          </div>
          <div className="feature-image">
            <img src={jobseekerImage} alt="Job Seekers" />
          </div>
        </div>

        <div className="feature-block reverse">
          <div className="feature-text">
            <h2>For Companies</h2>
            <ul>
              <li>Filter applicants based on skill matching.</li>
              <li>Save time and resources in the hiring process.</li>
              <li>Make smart hiring decisions using accurate data.</li>
              <li>Accelerate recruitment by focusing on top-fit candidates.</li>
            </ul>
          </div>
          <div className="feature-image">
            <img src={companyImage} alt="Companies" />
          </div>
        </div>
      </section>

      <footer className="footer" ref={footerRef}>
        <h3>JobMatchAI © 2025</h3>
        <p>All rights reserved. | Privacy Policy | Terms of Service</p>
        <p>Email: info@jobmatchai.com | Phone: +1 234 567 890</p>
      </footer>
    </>
  );
}

export default HomePage;
