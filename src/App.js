import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import InstanceForm from './components/InstanceForm';
import InstanceList from './components/InstanceList';
import CourseDetail from './components/CourseDetail';
import InstanceDetail from './components/InstanceDetail';
import AllCoursePage from './components/AllCoursePage';
import NavBar from './components/NavBar';
import Modal from './components/Modal';
import AllInstancePage from './components/AllInstancePage';

function App() {
  const [refreshCourses, setRefreshCourses] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showInstanceModal, setShowInstanceModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [refreshInstances, setRefreshInstances] = useState(false);

  // Apply dark class to <html> for global tailwind dark support
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
        <NavBar onAddCourseClick={() => setShowCourseModal(true)} />
        <div className="px-4 md:px-6 max-w-6xl mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-10">
                  {/* Hero Section */}
                  <div className="text-center py-12 bg-white dark:bg-gray-800 shadow rounded transition">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Manage Your Courses Efficiently
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      Welcome to Course Management
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => setShowCourseModal(true)}
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-semibold text-sm"
                      >
                        + Create Course
                      </button>
                      <button
                        onClick={() => setShowInstanceModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-semibold text-sm"
                      >
                        + Create Instance
                      </button>
                      <Link
                        to="/courses"
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold text-sm"
                      >
                        View All Courses
                      </Link>
                    </div>
                  </div>

                  {/* Lists */}
                  <CourseList refresh={refreshCourses} />
                  <InstanceList refresh={refreshInstances} />

                  {/* Modals */}
                  <Modal isOpen={showCourseModal} onClose={() => setShowCourseModal(false)}>
                    <CourseForm
                      onSuccess={() => {
                        setRefreshCourses(prev => !prev);
                        setShowCourseModal(false);
                      }}
                    />
                  </Modal>

                  <Modal isOpen={showInstanceModal} onClose={() => setShowInstanceModal(false)}>
                    <InstanceForm
                      onSuccess={() => {
                        setRefreshInstances(prev => !prev);  //  trigger refresh
                        setShowInstanceModal(false);
                      }}
                    />
                  </Modal>
                </div>
              }
            />
            <Route path="/courses" element={<AllCoursePage />} />
            <Route path="/instances" element={<AllInstancePage />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/instances/:year/:semester/:id" element={<InstanceDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
