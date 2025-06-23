import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function InstanceDetail() {
  const { year, semester, id } = useParams();
  const [instance, setInstance] = useState(null);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`https://coursemanagement-backend.onrender.com/api/instances/${year}/${semester}/${id}`)
      .then(res => {
        setInstance(res.data);
        return axios.get(`https://coursemanagement-backend.onrender.com/api/courses/${id}`);
      })
      .then(res => {
        setCourse(res.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [year, semester, id]);

  if (error) {
    return <p className="text-center text-red-600 dark:text-red-400 mt-10 px-4"> Error loading instance or course.</p>;
  }

  if (!instance || !course) {
    return <p className="text-center text-gray-500 dark:text-gray-300 mt-10 px-4">Loading instance details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">📘 Instance Details</h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          {course.title} ({instance.courseId})
        </h3>
        <div className="space-y-2 text-sm sm:text-base">
          <p className="text-gray-600 dark:text-gray-300">
            <b>Year:</b> {instance.year}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <b>Semester:</b> {instance.semester}
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            <b>Course Description:</b> {course.description || "N/A"}
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            <b>Prerequisites:</b>{" "}
            {course.prerequisites.length > 0
              ? course.prerequisites.join(", ")
              : "None"}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Link
          to="/instances"
          className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base"
        >
          ← Back to All Instances
        </Link>
        <Link
          to="/"
          className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default InstanceDetail;
