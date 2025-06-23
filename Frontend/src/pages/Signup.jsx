import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const validateForm = () => {
    if (form.username.trim().length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Please enter a valid email address');
    }
    if (form.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      validateForm();

      console.log('Sending registration request...');
      const res = await axios.post('http://localhost:8000/api/auth/register', {
        username: form.username.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password
      });

      console.log('Registration successful:', res.data);
      
      // Show success message and redirect to login
      setError('');
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
              minLength={3}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Username must be at least 3 characters long</p>
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
              disabled={loading}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
          </div>
          <button 
            type="submit" 
            className={`w-full py-2 rounded text-white font-medium ${
              loading 
                ? 'bg-violet-400 cursor-not-allowed' 
                : 'bg-violet-700 hover:bg-violet-800'
            }`}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-violet-700 font-semibold hover:text-violet-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
