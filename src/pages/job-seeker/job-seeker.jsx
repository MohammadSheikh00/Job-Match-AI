import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import Header from '../../components/job-seeker/header';
import Sidebar from '../../components/job-seeker/sidebar';
import JobSeekerProfile from '../../components/job-seeker/profile';
import JobApplications from '../../components/job-seeker/upload-resume';
import MyApplications from '../../components/job-seeker/applications-tracker';
import InterviewCoaching from '../../components/job-seeker/interview-coach';
import FindJobs from '../../components/job-seeker/find-jobs';

import { ApplicationsProvider } from '../../components/job-seeker/applications-context'; // ✅ تم الاستيراد

const JobSeekerDashboard = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userName = userData?.name || 'Job Seeker';
  const [selectedSection, setSelectedSection] = useState('home');

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return <JobSeekerProfile />;
      case 'uploadResume':
        return <JobApplications />;
      case 'applications':
        return <MyApplications />;
      case 'interviewCoach':
        return <InterviewCoaching />;
      case 'findJobs':
        return <FindJobs />;
      case 'home':
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
            <img
              src="https://pics.craiyon.com/2023-11-27/OmoFwfmPQ3iujuGmjuA4gg.webp"
              alt="Job Seeker"
              style={{
                width: '150px',
                opacity: 0.07,
                position: 'absolute',
                top: '30px',
                left: '30px',
              }}
            />
            <h1 className="display-4 fw-bold z-1 mb-3 animate__animated animate__fadeInDown">
              Welcome back, <span className="text-info">{userName}</span>!
            </h1>
            <p className="lead z-1 mb-4 animate__animated animate__fadeInUp">
              Your dashboard to explore jobs, track your applications, and build your professional profile.
            </p>
            <div className="row z-1 w-100 justify-content-center gap-3 mb-4">
              {[
                {
                  icon: 'bi-search',
                  title: 'Find Jobs',
                  desc: 'Browse and apply to the latest job opportunities.',
                  color: 'text-primary',
                  action: 'findJobs',
                },
                {
                  icon: 'bi-clipboard-check-fill',
                  title: 'My Applications',
                  desc: 'Track your application status in real-time.',
                  color: 'text-success',
                  action: 'applications',
                },
                {
                  icon: 'bi-person-fill',
                  title: 'Update Profile',
                  desc: 'Make sure your profile is always up to date.',
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
    <ApplicationsProvider> {/* ✅ حل المشكلة هنا */}
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Sidebar onSelect={setSelectedSection} activeSection={selectedSection} />
        <div className="flex-grow-1 d-flex flex-column">
          <Header />
          <main className="p-4 bg-light overflow-auto">{renderContent()}</main>
        </div>
      </div>
    </ApplicationsProvider>
  );
};

export default JobSeekerDashboard;
