import React, { useState } from 'react';
import './Profile.css';
import defaultProfilePic from '../../assets/profile-pic.jpeg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';

const JobSeekerProfile = () => {
  const userName = "John Doe";
  const [formData, setFormData] = useState({
    name: userName,
    email: '',
    phone: '',
    location: '',
    bio: ''
  });

  const [imageURL, setImageURL] = useState(defaultProfilePic);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageURL(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saved data:', formData);
    alert('Profile updated!');
  };

  return (
    <div className="profile-container animate__animated animate__fadeIn">
      <div className="profile-content">
        <h2 className="mb-4"><i className="bi bi-person-circle me-2"></i>Job Seeker Profile</h2>

        <div className="image-wrapper">
          <div className="profile-image-container">
            <img src={imageURL} alt="Profile" className="profile-image" />
            <label htmlFor="upload-photo" className="upload-btn">+</label>
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              className="upload-input"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="animate__animated animate__fadeInUp animate__delay-1s">
          <div className="form-row">
            <div className="form-group">
              <label><i className="bi bi-person-fill me-2"></i>Full Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label><i className="bi bi-envelope-fill me-2"></i>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><i className="bi bi-telephone-fill me-2"></i>Phone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label><i className="bi bi-geo-alt-fill me-2"></i>Location:</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label><i className="bi bi-card-text me-2"></i>Bio:</label>
            <textarea name="bio" rows="4" value={formData.bio} onChange={handleChange} />
          </div>

          <div className="button-group d-flex gap-3">
            <button type="submit" className="save-btn">
              <i className="bi bi-save me-1"></i>Save Changes
            </button>
            <button
              type="button"
              className="change-password-btn"
              onClick={() => alert('Redirect to change password')}
            >
              <i className="bi bi-lock-fill me-1"></i>Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
