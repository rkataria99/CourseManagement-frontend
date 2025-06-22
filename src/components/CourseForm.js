import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CourseForm({ onSuccess }) {
  const [form, setForm] = useState({ title: '', courseId: '', description: '', prerequisites: [] });
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => setAllCourses(res.data))
      .catch(() => console.error("Failed to load courses"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/courses', form)
      .then(() => {
        alert(" Course added successfully");
        setForm({ title: '', courseId: '', description: '', prerequisites: [] });
        onSuccess();
      })
      .catch(err => {
        alert(" " + (err.response?.data?.message || "Error creating course"));
      });
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 sm:p-6 mb-10 w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">➕ Create a Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
        <input
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2"
          placeholder="Course Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2"
          placeholder="Course ID"
          value={form.courseId}
          onChange={e => setForm({ ...form, courseId: e.target.value })}
          required
        />
        <textarea
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
          rows={4}
        />
        <select
          multiple
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 h-32"
          value={form.prerequisites}
          onChange={e => {
            const selected = Array.from(e.target.selectedOptions, o => o.value);
            setForm({ ...form, prerequisites: selected });
          }}
        >
          {allCourses.map(course => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseId}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
