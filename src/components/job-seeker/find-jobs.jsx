import React, { useState } from 'react';
import { Howl } from 'howler';
import { FaClipboardList, FaBriefcase, FaArrowCircleRight } from 'react-icons/fa';
import { useApplications } from "./applications-context";
import './find-jobs.css';

const FindJobs = () => {
  const [category, setCategory] = useState('');
  const [jobPosts, setJobPosts] = useState([]);
  const [matchPercentage, setMatchPercentage] = useState(null);
  const [missingSkills, setMissingSkills] = useState([]);

  const clickSound = new Howl({ src: ['/click.mp3'], volume: 0.3 });
  const { addApplication } = useApplications();

  const analyzeResume = () => {
    clickSound.play();
    const percentage = Math.random() * 100;
    setMatchPercentage(percentage);
    setMissingSkills(['JavaScript', 'React']);
    const jobs = [
      {
        title: 'Frontend Developer',
        company: 'ABC Corp',
        location: 'Remote',
        description: 'Develop the frontend of our web app',
      },
      {
        title: 'Backend Developer',
        company: 'XYZ Inc',
        location: 'New York',
        description: 'Build backend APIs',
      },
    ];
    setJobPosts(jobs);
  };

  return (
    <div className="container py-4 animate__animated animate__fadeIn">
      <div
        className="p-4 shadow-lg rounded-4"
        style={{
          background: '#f0f0f3',
          boxShadow: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        }}
      >
        <h2 className="text-center mb-4 text-dark fw-bold">
          <FaBriefcase className="me-2 text-primary" />
          Find Jobs
        </h2>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            <FaClipboardList className="me-2 text-info" />
            Select a Category
          </label>
          <select
            className="form-select rounded-pill"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a category</option>
            {['Software Development', 'Marketing', 'Design', 'Sales'].map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          onClick={analyzeResume}
          className="btn btn-primary mt-3 px-4 py-2 rounded-pill"
        >
          <FaArrowCircleRight className="me-2" />
          Analyze
        </button>

        {matchPercentage !== null && (
          <div className="animate__animated animate__fadeInUp mt-4">
            <h4 className="text-center fw-bold text-success mb-3">
              Match Percentage: {matchPercentage.toFixed(2)}%
            </h4>
            <div
              className="progress-circle mx-auto mb-4"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `conic-gradient(#28a745 ${matchPercentage}%, #ddd 0%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: '#333',
              }}
            >
              {matchPercentage.toFixed(0)}%
            </div>

            <div className="bg-white p-3 rounded-4 mb-4 shadow-sm">
              <h5>Missing Skills:</h5>
              <ul>
                {missingSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {jobPosts.length > 0 && (
          <div className="animate__animated animate__fadeInUp">
            <h4 className="text-dark mb-3">Job Listings for {category}</h4>
            {jobPosts.map((job, index) => (
              <div
                key={index}
                className="bg-white p-3 mb-3 rounded-4 shadow-sm border"
              >
                <h5 className="fw-bold">{job.title}</h5>
                <p className="text-muted">{job.company} | {job.location}</p>
                <p>{job.description}</p>
                <button className="btn btn-success" onClick={() => addApplication(job)}>
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJobs;
