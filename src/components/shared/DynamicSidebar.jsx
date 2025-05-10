import React, { useState } from 'react';
import './DynamicSidebar.css';

const DynamicSidebar = ({ type, onSelect, activeSection }) => {
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

  // روابط الباحث عن عمل
  const jobSeekerLinks = [
    { key: 'home', label: '🏠 Home' },
    { key: 'profile', label: '👤 Profile' },
    { key: 'uploadResume', label: '📄 Upload Resume' },
    { key: 'findJobs', label: '🕵️‍♂️ Find Jobs' },
    { key: 'applications', label: '💼 My Applications' },
    { key: 'interviewCoach', label: '🧠 AI Interview Coach' },
  ];

  // روابط الشركة
  const companyLinks = [
    { key: 'home', label: '🏠 Home' },
    { key: 'profile', label: '👤 Profile' },
    { key: 'createJob', label: '➕ Add Job' },
    { key: 'candidates', label: '📋 My Jobs' },
  ];

  const links = type === 'company' ? companyLinks : jobSeekerLinks;
  const aiTextClass = type === 'company' ? 'ai-text' : 'gray-text';
  const asideColor = type === 'company' ? 'rgb(32, 58, 67)' : '#284E5D';

  return (
    <aside className="text-white p-4" style={{ width: '250px', backgroundColor: asideColor }}>
      <h4 className="sidebar-title mb-4">
        JobMatch<span className={aiTextClass}>AI</span>
      </h4>
      <ul className="nav flex-column">
        {links.map((link) => (
          <li className="nav-item" key={link.key}>
            <button
              className={`btn ${getButtonClass(link.key)} text-start w-100`}
              onClick={() => handleSelect(link.key)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DynamicSidebar;
