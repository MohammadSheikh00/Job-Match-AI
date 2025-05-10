import React, { useState, useEffect } from 'react';
import './my-jobs.css';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [editedJob, setEditedJob] = useState({});
  const [jobToDeleteId, setJobToDeleteId] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showCandidatesForIndex, setShowCandidatesForIndex] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem('userData'))?.token;

  const fetchJobs = async () => {
    try {
      const response = await fetch('https://jobmatch-8lum.onrender.com/company/jobs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setJobs(data.jobs || []);
      } else {
        console.error('Failed to fetch jobs:', data.message);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEditJob = (job, index) => {
    setEditingJob(index);
    setEditedJob({ ...job });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`https://jobmatch-8lum.onrender.com/company/updateJob/${editedJob._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editedJob),
      });

      const data = await response.json();

      if (response.ok) {
        setEditingJob(null);
        fetchJobs();
      } else {
        alert('Error updating job: ' + data.message);
      }
    } catch (err) {
      console.error('Error updating job:', err);
    }
  };

  const handleDeleteJob = async () => {
    try {
      const response = await fetch(`https://jobmatch-8lum.onrender.com/company/deleteJob/${jobToDeleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setJobToDeleteId(null);
        fetchJobs();
      } else {
        console.error('Error deleting job');
      }
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const toggleView = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
    setShowCandidatesForIndex(null);
    setSelectedCandidate(null);
  };

  return (
    <div className="container">
      <h3 className="mb-4 text-center title">📋 My Posted Jobs</h3>

      {Array.isArray(jobs) && jobs.length > 0 ? (
        <div className="row">
          {jobs.map((job, index) => (
            <div key={job._id} className="col-md-6 mb-4">
              <div className="job-card shadow-sm rounded bg-white position-relative custom-card">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold text-dark job-title">{job.title}</h5>
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-success custom-button"
                      onClick={() => toggleView(index)}
                    >
                      {expandedIndex === index ? '🔽 Hide' : '🔍 View'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary custom-button"
                      onClick={() => handleEditJob(job, index)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger custom-button"
                      onClick={() => setJobToDeleteId(job._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>

                {expandedIndex === index && (
                  <>
                    <p><strong>📝 Description:</strong> {job.description}</p>
                    <p><strong>📍 Location:</strong> {job.location}</p>
                    <p><strong>📅 Deadline:</strong> {job.applicationdeadline}</p>
                    <p><strong>🛠 Skills:</strong> {job.skills}</p>
                    <p><strong>👥 Positions:</strong> {job.numberofpositions}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>🔄 Loading or no jobs posted yet.</p>
      )}

      {/* Modal for editing */}
      {editingJob !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Edit Job</h4>
            <div className="form-group mb-3">
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={editedJob.title}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                name="description"
                value={editedJob.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={editedJob.location}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Skills</label>
              <input
                type="text"
                name="skills"
                value={editedJob.skills}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Number of Positions</label>
              <input
                type="number"
                name="numberofpositions"
                value={editedJob.numberofpositions}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-success" onClick={handleSaveEdit}>Save Changes</button>
              <button className="btn btn-secondary ms-2" onClick={() => setEditingJob(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for delete confirm */}
      {jobToDeleteId && (
        <div className="modal-overlay">
          <div className="modal-content neumorphic-confirm">
            <h5 className="mb-3 text-center">Are you sure you want to delete this job?</h5>
            <div className="d-flex justify-content-center">
              <button className="btn btn-danger me-3" onClick={handleDeleteJob}>Yes, Delete</button>
              <button className="btn btn-secondary" onClick={() => setJobToDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
