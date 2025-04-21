import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 border-b">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-purple-700 rounded-md"></div>
        <span className="text-xl font-semibold text-purple-700">Readit</span>
      </Link>

      {/* Auth buttons */}
      <div className="space-x-4">
        <Link
          to="/login"
          className="border border-purple-700 text-purple-700 px-4 py-1 rounded-md hover:bg-purple-50"
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="bg-purple-700 text-white px-4 py-1 rounded-md hover:bg-purple-800"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
