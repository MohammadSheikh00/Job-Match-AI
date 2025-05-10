import React, { useRef } from 'react';
import './header.css';
import clickSound from '../../assets/click.mp3';

function header({ scrollToFeatures, scrollToFooter }) {
  const audioRef = useRef(new Audio(clickSound));

  const handleClick = (scrollAction) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    if (scrollAction) scrollAction();
  };

  return (
    <header className="header">
      <div className="logo">JobMatchAI</div>
      <nav className="nav">
        <button className="Headernav-link" onClick={() => handleClick(scrollToFeatures)}>About Us</button>
        <button className="Headernav-link" onClick={() => handleClick(scrollToFooter)}>Contact Us</button>
      </nav>
    </header>
  );
}

export default header;
