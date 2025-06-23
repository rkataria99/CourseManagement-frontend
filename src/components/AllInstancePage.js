import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllInstancePage() {
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    fetchInstances();
  }, []);

  const fetchInstances = () => {
    axios
      .get('https://coursemanagement-backend.onrender.com/instances')
      .then(res => setInstances(res.data))
      .catch(() => alert(" Error fetching instances"));
  };

  const handleDelete = (year, semester, courseId) => {
    axios
      .delete(`https://coursemanagement-backend.onrender.com/instances/${year}/${semester}/${courseId}`)
      .then(fetchInstances)
      .catch(() => alert(" Failed to delete instance"));
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        📋 All Course Instances
      </h2>

      {instances.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No course instances found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instances.map(instance => (
            <div
              key={instance._id}
              className="bg-white dark:bg-[#1f2937] shadow dark:shadow-md rounded p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {instance.courseId}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <b>Year:</b> {instance.year}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                <b>Semester:</b> {instance.semester}
              </p>
              <div className="flex justify-between items-center gap-2">
                <Link
                  to={`/instances/${instance.year}/${instance.semester}/${instance.courseId}`}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-semibold text-sm"
                >
                  View Instance →
                </Link>
                <button
                  onClick={() => handleDelete(instance.year, instance.semester, instance.courseId)}
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

export default AllInstancePage;
