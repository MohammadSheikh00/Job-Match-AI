import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { CloudUpload, FileText, InfoCircle } from 'react-bootstrap-icons';

const UploadResume = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="container py-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center align-items-start">
        {/* Form Section */}
        <div className="col-lg-6 mb-4">
          <div className="border rounded p-4 shadow-sm bg-white">
            <h3 className="mb-4 text-primary"><CloudUpload className="me-2" /> Upload Your Resume</h3>
            <p className="text-muted">Accepted formats: PDF, DOCX, TXT</p>
            <div className="mb-3">
              <label htmlFor="resume" className="form-label">Choose your CV file:</label>
              <input type="file" className="form-control" id="resume" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
            </div>
            {fileName && (
              <div className="alert alert-success d-flex align-items-center" role="alert">
                <FileText className="me-2" />
                <div>Uploaded: <strong>{fileName}</strong></div>
              </div>
            )}
            <button className="btn btn-primary w-100 mt-3">
              Submit Resume
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="col-lg-6">
          <div className="bg-light p-4 rounded shadow-sm border">
            <h5 className="mb-3 text-dark"><InfoCircle className="me-2 text-primary" /> CV Tips</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">✅ Keep it short and focused (1-2 pages max).</li>
              <li className="mb-2">✅ Use a professional, clean layout.</li>
              <li className="mb-2">✅ Highlight key achievements, not just duties.</li>
              <li className="mb-2">✅ Tailor your CV for each job application.</li>
              <li className="mb-2">✅ Include relevant keywords for ATS systems.</li>
              <li className="mb-2">✅ Proofread carefully – grammar matters!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
