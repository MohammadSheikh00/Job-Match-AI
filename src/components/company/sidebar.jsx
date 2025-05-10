import React, { useState } from 'react';
import './Sidebar.css';

const CompanySidebar = ({ onSelect, activeSection }) => {
  const [activeButton, setActiveButton] = useState(activeSection);

  const handleSelect = (section) => {
    setActiveButton(section);
    onSelect(section);
  };

  const getButtonClass = (section) => {
    return activeButton === section
      ? 'btn-active text-white bg-gradient-orange active'
      : 'btn-inactive text-white';
  };

  return (
    <aside className="bg-dark text-white p-4" style={{ width: '250px' }}>
      <h4 className="sidebar-title mb-4">
        JobMatch<span className="ai-text">AI</span>
      </h4>
      <ul className="nav ">
        <li className="nav-item mb-2">
          <button
            className={`btn ${getButtonClass('home')} d-flex align-items-center gap-2 px-2 py-2 w-100`}
            onClick={() => handleSelect('home')}
          >
            <span>🏠</span>
            <span>Home</span>
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className={`btn ${getButtonClass('profile')} d-flex align-items-center gap-2 px-2 py-2 w-100`}
            onClick={() => handleSelect('profile')}
          >
            <span>👤</span>
            <span>Profile</span>
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className={`btn ${getButtonClass('createJob')} d-flex align-items-center gap-2 px-2 py-2 w-100`}
            onClick={() => handleSelect('createJob')}
          >
            <span>➕</span>
            <span>Add Job</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`btn ${getButtonClass('candidates')} d-flex align-items-center gap-2 px-2 py-2 w-100`}
            onClick={() => handleSelect('candidates')}
          >
            <span>📋</span>
            <span>My Jobs</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default CompanySidebar;
