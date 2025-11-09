import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data in required format
    const registerData = {
      email: formData.email,
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName
      },
      password: formData.password,
      role: formData.role
    };

    console.log('Register with:', registerData);
    // Handle registration logic here
  };

  const handleGoogleSignup = () => {
    console.log('Sign up with Google');
    // Handle Google signup logic here
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-logo">
          <div className="brand">
            <span className="icon"></span>
            <h1>Music</h1>
          </div>
        </div>
        
        <h2 className="register-title">Sign up for free to start listening</h2>
        
        <button className="google-btn" onClick={handleGoogleSignup}>
          <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign up with Google
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@domain.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          

          <div className="form-group">
            <div className="role-selector">
              <label className={`role-option ${formData.role === 'user' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleChange}
                />
                <div className="role-card">
                  <svg className="role-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <span className="role-name">Listener</span>
                  <span className="role-desc">Enjoy unlimited music</span>
                </div>
              </label>

              <label className={`role-option ${formData.role === 'artist' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="artist"
                  checked={formData.role === 'artist'}
                  onChange={handleChange}
                />
                <div className="role-card">
                  <svg className="role-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                  <span className="role-name">Artist</span>
                  <span className="role-desc">Upload & share music</span>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="register-btn">
            Sign Up
          </button>
        </form>

        

        <div className="login-link">
          <span>Already have an account? </span>
          <a href="/login">Log in here</a>
        </div>
      </div>
    </div>
  );
};

export default Register;