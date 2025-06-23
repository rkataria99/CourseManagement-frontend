import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

function InstanceList({ refresh }) {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [instances, setInstances] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const fetchInstances = () => {
    if (!year || !semester) {
      return alert("Please enter both year and semester");
    }

    axios
      .get(`https://coursemanagement-backend.onrender.com//instances/${year}/${semester}`)
      .then(res => {
        const data = res.data;
        if (data.length === 0) {
          setNotFound(true);
          setInstances([]);
        } else {
          setNotFound(false);
          setInstances(data);
        }
      })
      .catch(() => alert(" Failed to fetch data from server"));
  };

  const handleDelete = (courseId) => {
    axios
      .delete(`https://coursemanagement-backend.onrender.com//instances/${year}/${semester}/${courseId}`)
      .then(fetchInstances)
      .catch(() => alert("Failed to delete instance"));
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const percentage = maxScrollLeft === 0 ? 0 : (scrollLeft / maxScrollLeft) * 100;
      setScrollProgress(percentage);
    };

    container.addEventListener('scroll', handleScroll);
    setTimeout(() => handleScroll(), 100);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [instances]);

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

  useEffect(() => {
    if (year && semester) {
      fetchInstances();
    }
  }, [refresh]);


  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">🎓 Course Instances</h2>

      {/* Responsive input group */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
        {/* Year Input */}
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Year <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., 2025"
            value={year}
            onChange={e => {
              setYear(e.target.value);
              setNotFound(false);
              setInstances([]);
            }}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded px-3 py-2 w-full sm:w-48"
          />
        </div>

        {/* Semester Input */}
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Semester <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., 1"
            value={semester}
            onChange={e => {
              setSemester(e.target.value);
              setNotFound(false);
              setInstances([]);
            }}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded px-3 py-2 w-full sm:w-48"
          />
        </div>

        {/* Button */}
        <div className="w-full sm:w-auto">
          <button
            onClick={fetchInstances}
            className="bg-blue-600 text-white font-medium px-5 py-2 rounded hover:bg-blue-700 w-1/2 sm:w-auto"
          >
            View Instances
          </button>
        </div>
      </div>


      {notFound ? (
        <p className="text-yellow-700 dark:text-yellow-400 font-semibold">
          ⚠️ No instances found for Year {year} and Semester {semester}.
        </p>
      ) : (
        instances.length > 0 && (
          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-6">
            {/* Cards with scroll */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            >
              {instances.map(i => (
                <div
                  key={i._id}
                  className="min-w-[260px] snap-start bg-white dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg p-4 shadow-sm relative"
                >
                  <Link
                    to={`/instances/${i.year}/${i.semester}/${i.courseId}`}
                    className="block mb-3"
                  >
                    <p className="text-red-600 font-semibold text-lg">{i.courseId}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Year: {i.year}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Semester: {i.semester}</p>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleDelete(i.courseId);
                    }}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}

            </div>

            {/* Navigation Arrows */}
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white dark:bg-gray-600 border dark:border-gray-500 rounded-full p-2 shadow hover:bg-gray-100 dark:hover:bg-gray-500 text-xl z-10"
              onClick={scrollLeft}
            >
              <FaAngleDoubleLeft />
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white dark:bg-gray-600 border dark:border-gray-500 rounded-full p-2 shadow hover:bg-gray-100 dark:hover:bg-gray-500 text-xl z-10"
              onClick={scrollRight}
            >
              <FaAngleDoubleRight />
            </button>

            {/* Scroll Indicator */}
            <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full mt-4 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-red-500 rounded-full transition-all duration-200"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* View all */}
            <div className="mt-4 text-center">
              <Link
                to="/instances"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                View All Instances →
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default InstanceList;
