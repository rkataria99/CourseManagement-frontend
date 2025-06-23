import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InstanceForm({ onSuccess }) {
  const [instance, setInstance] = useState({ year: '', semester: '', courseId: '' });
  const [validCourseIds, setValidCourseIds] = useState([]);

  useEffect(() => {
    axios.get('https://coursemanagement-backend.onrender.com//courses')
      .then(res => setValidCourseIds(res.data.map(c => c.courseId)))
      .catch(() => alert(" Failed to fetch course list"));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (!validCourseIds.includes(instance.courseId)) {
      return alert(" Invalid Course ID! Please enter a valid, existing Course ID.");
    }

    axios.post('https://coursemanagement-backend.onrender.com//instances', instance)
      .then(() => {
        alert(" Instance created");
        setInstance({ year: '', semester: '', courseId: '' });
        if (onSuccess) onSuccess();
      })
      .catch(() => alert(" Failed to create instance"));
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">🗓️ Create Course Instance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-4 py-2"
          placeholder="Year"
          value={instance.year}
          onChange={e => setInstance({ ...instance, year: e.target.value })}
          required
        />
        <input
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-4 py-2"
          placeholder="Semester"
          value={instance.semester}
          onChange={e => setInstance({ ...instance, semester: e.target.value })}
          required
        />
        <input
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-4 py-2"
          placeholder="Course ID"
          value={instance.courseId}
          onChange={e => setInstance({ ...instance, courseId: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
        >
          Create Instance
        </button>
      </form>
    </div>
  );
}

export default InstanceForm;
