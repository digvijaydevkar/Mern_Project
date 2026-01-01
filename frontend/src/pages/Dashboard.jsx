import { useEffect, useState } from 'react';
import { courseService, studentService } from '../api/services';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    loading: true,
  });
  const { error: showError } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courses, students] = await Promise.all([
          courseService.getAll(),
          studentService.getAll(),
        ]);

        setStats({
          totalCourses: Array.isArray(courses) ? courses.length : 0,
          totalStudents: Array.isArray(students) ? students.length : 0,
          loading: false,
        });
      } catch (error) {
        showError('Failed to load dashboard statistics');
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, [showError]);

  if (stats.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Courses
          </h2>
          <p className="text-4xl font-bold text-blue-600">
            {stats.totalCourses}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Students
          </h2>
          <p className="text-4xl font-bold text-green-600">
            {stats.totalStudents}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

