import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMusic, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Dummy signup - navigate to login
    const { confirmPassword: _confirmPassword, ...signupData } = formData;
    console.log('Signup data:', signupData);
    alert('Account created successfully! (Dummy action)');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1db954] via-[#121212] to-[#000000] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-3">
            <FaMusic className="text-[#1db954] text-4xl" />
            <h1 className="text-4xl font-bold text-white">Musify</h1>
          </div>
          <p className="text-[#b3b3b3] text-base">Create your account and start listening</p>
        </div>

        {/* Signup Form */}
        <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-[#282828]">
          <h2 className="text-2xl font-bold text-white mb-5 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-white mb-2">
                  First Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#b3b3b3] text-xs pointer-events-none" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="John"
                    className="w-full bg-[#242424] text-white pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:bg-[#2a2a2a] border border-[#3a3a3a] placeholder-[#7a7a7a] transition-all text-sm font-normal"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-white mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#b3b3b3] text-xs pointer-events-none" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Doe"
                    className="w-full bg-[#242424] text-white pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:bg-[#2a2a2a] border border-[#3a3a3a] placeholder-[#7a7a7a] transition-all text-sm font-normal"
                  />
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b3b3b3] text-sm pointer-events-none" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john.doe@example.com"
                  className="w-full bg-[#242424] text-white pl-11 pr-4 py-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:bg-[#2a2a2a] border border-[#3a3a3a] placeholder-[#7a7a7a] transition-all text-sm font-normal"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b3b3b3] text-sm pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#242424] text-white pl-11 pr-12 py-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:bg-[#2a2a2a] border border-[#3a3a3a] placeholder-[#7a7a7a] transition-all text-sm font-normal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#b3b3b3] hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b3b3b3] text-sm pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter your password"
                  className="w-full bg-[#242424] text-white pl-11 pr-4 py-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:bg-[#2a2a2a] border border-[#3a3a3a] placeholder-[#7a7a7a] transition-all text-sm font-normal"
                />
              </div>
            </div>

            {/* Hidden Role Field - Default to 'user' */}
            <input type="hidden" name="role" value="user" />

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 accent-[#1db954] cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-[#b3b3b3]">
                I agree to the{' '}
                <a href="#" className="text-[#1db954] hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#1db954] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1db954] hover:bg-[#1ed760] text-black font-bold py-3.5 rounded-full transition-all hover:scale-105 shadow-lg text-base mt-2"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 border-t border-[#282828]"></div>
            <span className="text-[#b3b3b3] text-sm">OR</span>
            <div className="flex-1 border-t border-[#282828]"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-[#b3b3b3] text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#1db954] hover:underline font-semibold"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[#6a6a6a] text-xs mt-6">
          © 2025 Musify. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Signup;
