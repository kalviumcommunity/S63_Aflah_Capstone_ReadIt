import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Your personalized Reddit-like community</h1>
      <p className="text-gray-600 mb-6">
        Join Reddish to discover, share, and engage with content that matters to you.
      </p>
      <div className="space-x-4">
        <Link to="/signup" className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800">
          Get Started
        </Link>
        <Link to="/login" className="border border-purple-700 text-purple-700 px-6 py-2 rounded hover:bg-purple-50">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Landing;
