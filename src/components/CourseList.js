import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

function CourseList({ refresh }) {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const percentage = maxScrollLeft === 0 ? 0 : (scrollLeft / maxScrollLeft) * 100;
    setScrollProgress(percentage);
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    scrollEl.addEventListener('scroll', handleScroll);
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    axios
      .get('https://coursemanagement-backend.onrender.com/api/courses')
      .then(res => setCourses(res.data))
      .catch(() => alert('Failed to fetch courses'));
  }, [refresh]);

  const handleDelete = (id) => {
    axios
      .delete(`https://coursemanagement-backend.onrender.com/api/courses/${id}`)
      .then(() => setCourses(prev => prev.filter(c => c.courseId !== id)))
      .catch(err =>
        alert(" " + (err.response?.data?.message || "Error deleting course"))
      );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (Math.ceil(container.scrollLeft) >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="my-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">📚 All Courses</h2>

      {isHome ? (
        <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-6">
          {courses.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300 py-10 text-lg">
              No courses available yet
            </p>
          ) : (
            <>
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
              >
                {courses.map(course => (
                  <div
                    key={course.courseId}
                    className="min-w-[260px] max-w-xs bg-white dark:bg-gray-900 snap-start shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition relative"
                  >
                    <div>
                      <Link to={`/courses/${course.courseId}`} className="block mb-3">
                        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          <span className="font-medium">ID:</span> {course.courseId}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          <span className="font-medium">Prerequisites:</span>{' '}
                          {course.prerequisites.length > 0
                            ? course.prerequisites.join(', ')
                            : 'None'}
                        </p>
                      </Link>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleDelete(course.courseId);
                        }}
                        className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="absolute top-1/2 left-[-10px] sm:left-[-20px] transform -translate-y-1/2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-full p-2 shadow hover:bg-gray-100 dark:hover:bg-gray-600 text-xl z-10"
                onClick={scrollLeft}
              >
                <FaAngleDoubleLeft />
              </button>
              <button
                className="absolute top-1/2 right-[-10px] sm:right-[-20px] transform -translate-y-1/2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-full p-2 shadow hover:bg-gray-100 dark:hover:bg-gray-600 text-xl z-10"
                onClick={scrollRight}
              >
                <FaAngleDoubleRight />
              </button>

              <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full mt-4 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-red-500 rounded-full transition-all duration-200"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              <div className="mt-4 text-center">
                <Link to="/courses" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  View All Courses →
                </Link>
              </div>
            </>
          )}
        </div>
      ) : (
        courses.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 py-10 text-lg">
            No course available yet
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => (
              <div
                key={course.courseId}
                className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  <span className="font-medium">ID:</span> {course.courseId}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  <span className="font-medium">Prerequisites:</span>{' '}
                  {course.prerequisites.length > 0
                    ? course.prerequisites.join(', ')
                    : 'None'}
                </p>
                <button
                  onClick={() => handleDelete(course.courseId)}
                  className="mt-4 text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default CourseList;
