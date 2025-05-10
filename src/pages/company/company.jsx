import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import Header from '../../components/company/header';
import Sidebar from '../../components/company/sidebar'; // ✅ الاسم الصحيح للمكون
import CompanyProfile from '../../components/company/profile';
import AddJob from '../../components/Company/add-job';
import MyJobs from '../../components/Company/my-jobs';

const companyName = JSON.parse(localStorage.getItem('companyData'))?.name || 'Company';

const CompanyDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('welcome');
  const [postedJobs, setPostedJobs] = useState([]);

  const handleDeleteJob = (index) => {
    const updatedJobs = postedJobs.filter((_, i) => i !== index);
    setPostedJobs(updatedJobs);
  };

  const handleViewCandidates = (job, index) => {
    console.log('View candidates for job:', job);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return <CompanyProfile />;
      case 'createJob':
        return <AddJob setPostedJobs={setPostedJobs} />;
      case 'candidates':
        return (
          <MyJobs
            jobs={postedJobs}
            setJobs={setPostedJobs}
            onViewCandidates={handleViewCandidates}
            onEditJob={() => {}}
            onDeleteJob={handleDeleteJob}
          />
        );
      case 'welcome':
      default:
        return (
          <section
            className="text-white position-relative d-flex flex-column justify-content-center align-items-center px-4"
            style={{
              minHeight: '80vh',
              background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <h1 className="display-4 fw-bold z-1 mb-3 animate__animated animate__fadeInDown">
              Welcome back, <span className="text-info">{companyName}</span>!
            </h1>
            <p className="lead z-1 mb-4 animate__animated animate__fadeInUp">
              Your command center for managing job postings, candidates, and company profile all in one place.
            </p>

            <div className="row z-1 w-100 justify-content-center gap-3 mb-4">
              {[
                {
                  icon: 'bi-briefcase-fill',
                  title: 'Post New Jobs',
                  desc: 'Easily create and publish new job opportunities to attract top talent.',
                  color: 'text-primary',
                  action: 'createJob',
                },
                {
                  icon: 'bi-people-fill',
                  title: 'Track Candidates',
                  desc: 'Easily manage applicants and hiring steps.',
                  color: 'text-success',
                  action: 'candidates',
                },
                {
                  icon: 'bi-person-badge-fill',
                  title: 'Edit Company Profile',
                  desc: 'Keep your company profile updated and polished.',
                  color: 'text-warning',
                  action: 'profile',
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="col-md-3 animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${i * 0.3}s`, animationFillMode: 'both' }}
                >
                  <div
                    className="custom-card text-center p-4 shadow-sm h-100"
                    style={{
                      borderRadius: '25px',
                      background: '#f0f0f3',
                      boxShadow: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
                      transition: 'all 0.3s ease-in-out',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedSection(card.action)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                      e.currentTarget.style.boxShadow = '2px 2px 8px #d1d9e6, -2px -2px 8px #ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff';
                    }}
                  >
                    <i className={`bi ${card.icon} fs-2 mb-3 ${card.color}`}></i>
                    <h5 className="fw-bold text-dark">{card.title}</h5>
                    <p className="text-muted small mb-0">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedSection('profile')}
              className="btn btn-outline-light px-4 py-2 rounded-pill animate__animated animate__fadeInUp animate__delay-1s"
            >
              Go to Profile
            </button>
          </section>
        );
    }
  };

  return (
    <div className="dashboard-container d-flex vh-100">
      <Sidebar onSelect={setSelectedSection} /> {/* ✅ استخدام الاسم الصحيح */}
      <div className="flex-grow-1 d-flex flex-column">
        <Header />
        <main className="p-4 bg-light overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default CompanyDashboard;
