import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function NavBar({ onAddCourseClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");

  // Apply dark mode class on load and toggle
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow">
      <div className="flex justify-between items-center">
        {/* Left: Logo */}
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-blue-400 text-2xl">📘</span> CourseApp
        </h1>

        {/* Mobile Hamburger Toggle */}
        {/* Mobile Right Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button
            className="text-white text-2xl"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 font-medium">
            <li><Link to="/" className="hover:text-red-400">Home</Link></li>
            <li><Link to="/courses" className="hover:text-red-400">Courses</Link></li>
            <li><Link to="/instances" className="hover:text-red-400">Instances</Link></li>
          </ul>

          <button
            onClick={onAddCourseClick}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-semibold"
          >
            + Add Course
          </button>

          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            className="ml-2 px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <ul className="flex flex-col gap-3 font-medium">
            <li><Link to="/" className="hover:text-red-400" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/courses" className="hover:text-red-400" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link></li>
            <li><Link to="/instances" className="hover:text-red-400" onClick={() => setIsMobileMenuOpen(false)}>Instances</Link></li>
          </ul>

          <button
            onClick={() => {
              onAddCourseClick();
              setIsMobileMenuOpen(false);
            }}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 text-sm rounded font-semibold w-fit mx-auto"
          >
            + Add Course
          </button>


        </div>
      )}
    </nav>
  );
}
