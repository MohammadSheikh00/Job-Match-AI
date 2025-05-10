import React, { useState } from 'react';
import './Profile.css';
import defaultProfilePic from '../../assets/profile-pic.jpeg';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CompanyProfile = () => {
  const companyName = "CompanyName.";

  const [formData, setFormData] = useState({
    companyName: companyName,
    email: '',
    phone: '',
    location: '',
    bio: ''
  });

  const [imageURL, setImageURL] = useState(defaultProfilePic);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('userData'))?.token;

    try {
      const response = await fetch('https://jobmatch-8lum.onrender.com/company/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Profile updated successfully!');
      } else {
        alert('❌ Failed to update profile: ' + data.message);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('❌ Error occurred. Check console.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    const token = JSON.parse(localStorage.getItem('userData'))?.token;

    try {
      const response = await fetch('https://jobmatch-8lum.onrender.com/company/changePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Password changed successfully!');
        setPasswordData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordError('');
        setShowPasswordForm(false);
      } else {
        setPasswordError('❌ ' + data.message);
      }
    } catch (err) {
      console.error('Error changing password:', err);
      setPasswordError('❌ Error occurred. Check console.');
    }
  };

  const handlePasswordInputChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Company Profile</h2>

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

        {!showPasswordForm ? (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Company Name:</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Bio:</label>
              <textarea
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <div className="button-group">
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="change-password-btn" onClick={() => setShowPasswordForm(true)}>Change Password</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Old Password:</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordInputChange}
              />
            </div>

            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
              />
            </div>

            {passwordError && <p className="error-message">{passwordError}</p>}

            <div className="button-group">
              <button type="submit" className="save-btn">Save Password</button>
              <button type="button" className="change-password-btn" onClick={() => setShowPasswordForm(false)}>Back</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
