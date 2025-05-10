import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import './auth-form.css';
import clickSound from '../../assets/click.mp3';

const AuthForm = forwardRef((props, ref) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [Type, setType] = useState('jobSeeker');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetPasswordCode, setResetPasswordCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const audioRef = useRef(new Audio(clickSound));

  const playClick = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const toggleForm = () => {
    playClick();
    setIsSignUp(!isSignUp);
    setType('jobSeeker');
    setMessage('');
    setIsForgotPassword(false);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    switchToSignUp: () => {
      setIsSignUp(true);
      setType('jobSeeker');
    },
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setLoading(true);
    setMessage('');

    const endpoint = isSignUp ? '/auth/signUp' : '/auth/login';
    const baseURL = 'https://jobmatch-8lum.onrender.com';

    const payload = isSignUp
      ? {
          fullName,
          email,
          password,
          type: Type,
          ...(Type === 'company' && { companyName }),
        }
      : { email, password };

    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Something went wrong!');
      } else {
        setMessage(isSignUp ? 'Account created successfully!' : 'Logged in successfully!');

        if (!isSignUp) {
          const userType = data.type;
          localStorage.setItem('userType', userType);
          localStorage.setItem(userType === 'company' ? 'companyData' : 'userData', JSON.stringify(data));
        
          if (userType === 'company') {
            window.location.hash = '#/company'; // ✅ مهم جدًا وجود الـ /
          } else if (userType === 'jobSeeker') {
            window.location.hash = '#/job-seeker'; // ✅ مهم جدًا وجود الـ /
          }
        }
        
      }
    } catch (error) {
      setMessage('Network error or server is down.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ باقي الكود كما هو
  const handleForgotPassword = async () => {
    playClick();
    setLoading(true);
    setMessage('');
    const baseURL = 'https://jobmatch-8lum.onrender.com';
    const endpoint = '/auth/forgotPassword';

    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Something went wrong!');
      } else {
        setMessage('Password reset email sent!');
        setIsForgotPassword(true);
      }
    } catch (error) {
      setMessage('Network error or server is down.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    playClick();
    setLoading(true);
    setMessage('');
    const baseURL = 'https://jobmatch-8lum.onrender.com';
    const endpoint = '/auth/resetPassword';

    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resetPasswordCode, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Something went wrong!');
      } else {
        setMessage('Password has been reset successfully!');
        setIsForgotPassword(false);
        setEmail('');
        setResetPasswordCode('');
        setNewPassword('');
      }
    } catch (error) {
      setMessage('Network error or server is down.');
    } finally {
      setLoading(false);
    }
  };

  const containerClass = `auth-container ${isSignUp ? 'is-signup' : ''} ${Type === 'company' ? 'company-mode' : ''}`;

  return (
    <div className={`${containerClass} ${message ? 'shrink' : ''}`}>
      <div className="auth-right">
        <h2 className="form-title">
          {isSignUp ? "Let's Create Your Account" : isForgotPassword ? 'Reset Your Password' : 'Login'}
        </h2>
        <form onSubmit={isForgotPassword ? handleResetPassword : handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label>FULL NAME</label>
              <input type="text" placeholder="Your Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
          )}

          <div className="form-group">
            <label>EMAIL</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>PASSWORD</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {isSignUp && (
            <>
              <div className="form-group">
                <label>ACCOUNT TYPE</label>
                <select value={Type} onChange={handleTypeChange} required>
                  <option value="jobSeeker">jobseeker</option>
                  <option value="company">company</option>
                </select>
              </div>

              {Type === 'company' && (
                <div className="form-group">
                  <label>COMPANY NAME</label>
                  <input type="text" placeholder="Your Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                </div>
              )}
            </>
          )}

          {!isSignUp && !isForgotPassword && (
            <div className="forgot-password">
              <a href="#" className="forgot-link" onClick={handleForgotPassword}>Forgot your password?</a>
            </div>
          )}

          {isForgotPassword && (
            <>
              <div className="form-group">
                <label>RESET CODE</label>
                <input type="text" placeholder="Enter the reset code" value={resetPasswordCode} onChange={(e) => setResetPasswordCode(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>NEW PASSWORD</label>
                <input type="password" placeholder="Enter your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
            </>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : isForgotPassword ? 'Reset Password' : isSignUp ? 'Sign Up' : 'Login'}
          </button>

          {message && <p className="form-message">{message}</p>}
        </form>

        <p className="toggle-text">
          {isSignUp || isForgotPassword ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={toggleForm} className="toggle-link">
            {isSignUp || isForgotPassword ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
});

export default AuthForm;
