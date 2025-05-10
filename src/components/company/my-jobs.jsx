import React, { useState } from 'react';
import './my-jobs.css';

const dummyCandidates = [
  {
    id: 1,
    name: 'Ali Hasan',
    match: '92%',
    email: 'ali.hasan@example.com',
    phone: '0799999999',
    experience: '3 years',
    skills: 'React, Node.js, MongoDB',
  },
  {
    id: 2,
    name: 'Sara Khalid',
    match: '88%',
    email: 'sara.k@example.com',
    phone: '0788888888',
    experience: '2 years',
    skills: 'Vue.js, Laravel, MySQL',
  },
];

const MyJobs = ({ jobs, setJobs, onDeleteJob }) => {
  const [editingJob, setEditingJob] = useState(null);
  const [editedJob, setEditedJob] = useState({});
  const [jobToDeleteIndex, setJobToDeleteIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showCandidatesForIndex, setShowCandidatesForIndex] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleEditJob = (job, index) => {
    setEditingJob(index);
    setEditedJob({ ...job });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    const updatedJobs = jobs.map((job, index) =>
      index === editingJob ? editedJob : job
    );
    setJobs(updatedJobs);
    setEditingJob(null);
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
            <div key={index} className="col-md-6 mb-4">
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
                      onClick={() => setJobToDeleteIndex(index)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>

                {/* 👇 تفاصيل الوظيفة عند الضغط على View */}
                {expandedIndex === index && (
                  <>
                    <p className="mb-1"><strong>📝 Description:</strong> {job.description}</p>
                    <p className="mb-1"><strong>📍 Location:</strong> {job.location}</p>
                    <p className="mb-1"><strong>📅 Deadline:</strong> {job.applicationdeadline}</p>
                    <p className="mb-1"><strong>🛠 Skills:</strong> {job.skills}</p>
                    <p className="mb-2"><strong>👥 Positions:</strong> {job.numberofpositions}</p>

                    <button
                      className="btn btn-outline-secondary btn-sm mb-2"
                      onClick={() =>
                        setShowCandidatesForIndex(
                          showCandidatesForIndex === index ? null : index
                        )
                      }
                    >
                      {showCandidatesForIndex === index ? 'Hide Candidates' : 'Show Candidates'}
                    </button>

                    {/* 👇 المرشحين */}
                    {showCandidatesForIndex === index && (
                      <div className="candidates-list">
                        <ul className="list-group">
                          {dummyCandidates.map((candidate) => (
                            <li
                              key={candidate.id}
                              className="list-group-item d-flex justify-content-between align-items-center"
                              onClick={() => setSelectedCandidate(candidate)}
                              style={{ cursor: 'pointer' }}
                            >
                              {candidate.name}
                              <span className="badge bg-primary rounded-pill">
                                {candidate.match}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* 👇 معلومات المرشح المختار */}
                        {selectedCandidate && (
                          <div className="mt-3 border p-2 rounded bg-light">
                            <h6 className="text-primary">{selectedCandidate.name}</h6>
                            <p><strong>Email:</strong> {selectedCandidate.email}</p>
                            <p><strong>Phone:</strong> {selectedCandidate.phone}</p>
                            <p><strong>Experience:</strong> {selectedCandidate.experience}</p>
                            <p><strong>Skills:</strong> {selectedCandidate.skills}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs posted yet.</p>
      )}

      {/* نافذة التعديل */}
      {editingJob !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Edit Job</h4>
            <div className="form-group mb-3">
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={editedJob.title}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={editedJob.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={editedJob.location}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="skills">Skills</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={editedJob.skills}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="numberofpositions">Number of Positions</label>
              <input
                type="number"
                id="numberofpositions"
                name="numberofpositions"
                value={editedJob.numberofpositions}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <button className="btn btn-success" onClick={handleSaveEdit}>
                Save Changes
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => setEditingJob(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تأكيد الحذف */}
      {jobToDeleteIndex !== null && (
        <div className="modal-overlay">
          <div className="modal-content neumorphic-confirm">
            <h5 className="mb-3 text-center">Are you sure you want to delete this job?</h5>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-danger me-3"
                onClick={() => {
                  onDeleteJob(jobToDeleteIndex);
                  setJobToDeleteIndex(null);
                }}
              >
                Yes, Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setJobToDeleteIndex(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
