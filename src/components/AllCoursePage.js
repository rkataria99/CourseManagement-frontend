import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllCoursePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get("https://coursemanagement-backend.onrender.com//courses")
      .then(res => setCourses(res.data))
      .catch(() => alert(" Error fetching courses"));
  };

  const handleDelete = (courseId) => {
    if (!window.confirm(`Are you sure you want to delete course ${courseId}?`)) return;
    axios
      .delete(`https://coursemanagement-backend.onrender.com//courses/${courseId}`)
      .then(() => {
        setCourses(prev => prev.filter(c => c.courseId !== courseId));
      })
      .catch(err => {
        const message =
          err.response?.data?.message ||
          " Cannot delete course. Please try again.";
        alert(" " + message);
      });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        📋 All Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No courses found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course.courseId}
              className="bg-white dark:bg-[#1f2937] shadow dark:shadow-md rounded p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <b>ID:</b> {course.courseId}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <b>Prerequisites:</b>{' '}
                {course.prerequisites.length > 0
                  ? course.prerequisites.join(', ')
                  : "None"}
              </p>
              <div className="flex justify-between items-center gap-2">
                <Link
                  to={`/courses/${course.courseId}`}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-semibold text-sm"
                >
                  View Details →
                </Link>
                <button
                  onClick={() => handleDelete(course.courseId)}
                  className="text-sm bg-gray-200 dark:bg-gray-700 dark:text-red-400 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link
          to="/"
          className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-semibold"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default AllCoursePage;
