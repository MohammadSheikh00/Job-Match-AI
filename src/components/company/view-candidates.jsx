import React from 'react';
import { useParams } from 'react-router';

const ViewCandidates = ({ jobs }) => {
    const { jobId } = useParams(); // التقاط معرف الوظيفة من الرابط
    const job = jobs?.find((j, i) => i.toString() === jobId); // البحث عن الوظيفة

    if (!job) {
        return <p className="text-center mt-5">Job not found.</p>;
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">👥 Candidates for "{job.title}"</h3>

            {job.candidates && job.candidates.length > 0 ? (
                <div className="row">
                    {job.candidates.map((candidate, index) => (
                        <div key={index} className="col-md-6 mb-4">
                            <div className="p-4 shadow-sm rounded bg-white border-start border-5 border-info">
                                <h5 className="fw-bold mb-2">📄 {candidate.name}</h5>
                                <p className="mb-1"><strong>🎯 Match Rate:</strong> {candidate.matchRate}%</p>
                                <p className="mb-2"><strong>📎 CV:</strong> <a href={candidate.cvUrl} target="_blank" rel="noopener noreferrer">View CV</a></p>
                                <button className="btn btn-sm btn-outline-primary">📬 Contact</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No candidates have applied for this job yet.</p>
            )}
        </div>
    );
};

export default ViewCandidates;
