import React, { useState } from 'react';
import clickSound from '../../assets/click.mp3';
import { useApplications } from "./applications-context";

const MyApplications = () => {
  const [filter, setFilter] = useState('All');
  const { applications } = useApplications();
  const clickAudio = new Audio(clickSound);

  const playSound = () => clickAudio.play();

  const filteredApplications =
    filter === 'All'
      ? applications
      : applications.filter((app) => app.status === filter);

  return (
    <div className="p-4">
      <h2 className="text-center mb-4 animate__animated animate__fadeInDown">My Job Applications</h2>

      <div className="d-flex justify-content-center gap-3 mb-4">
        {['All', 'Pending', 'Accepted', 'Rejected'].map((status, index) => (
          <button
            key={index}
            className={`btn btn-outline-${filter === status ? 'primary' : 'secondary'} px-3 rounded-pill animate__animated animate__fadeIn`}
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => {
              playSound();
              setFilter(status);
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {filteredApplications.length === 0 ? (
          <div className="text-center text-muted">No applications found.</div>
        ) : (
          filteredApplications.map((app, i) => (
            <div
              key={app.id}
              className="col-md-6 col-lg-4 animate__animated animate__fadeInUp"
              style={{ animationDelay: `${i * 0.2}s`, animationFillMode: 'both' }}
            >
              <div
                className="p-4 shadow-sm h-100"
                style={{
                  borderRadius: '20px',
                  background: '#f0f0f3',
                  boxShadow: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
                  transition: 'transform 0.3s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <h5 className="fw-bold text-dark">{app.jobTitle}</h5>
                <p className="mb-1 text-muted">Company: {app.company}</p>
                <p className="mb-1 text-muted">Date: {app.date}</p>
                <p className={`fw-semibold ${
                  app.status === 'Accepted'
                    ? 'text-success'
                    : app.status === 'Rejected'
                    ? 'text-danger'
                    : 'text-warning'
                }`}>
                  Status: {app.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyApplications;
