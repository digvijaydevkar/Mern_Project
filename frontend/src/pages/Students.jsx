import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService, courseService } from '../api/services';
import { useToast } from '../context/ToastContext';
import Table from '../components/Table';
import Loader from '../components/Loader';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();
  const { error: showError } = useToast();

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, [selectedCourseId]);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getAll();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      showError('Failed to load courses');
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAll(
        selectedCourseId || null
      );
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      showError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    // Navigate to student videos page - use email or reg_no
    navigate(`/students/${student.email || student.reg_no}/videos`);
  };

  const columns = [
    { header: 'Reg No', accessor: 'reg_no' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Mobile', accessor: 'mobile_no' },
    { header: 'Course ID', accessor: 'course_id' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRowClick(row);
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          View Videos
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Students</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Filter by Course
        </label>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.course_name} ({course.course_id})
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader size="lg" className="my-8" />
      ) : (
        <>
          <Table
            columns={columns}
            data={students}
            onRowClick={handleRowClick}
          />
          <p className="mt-4 text-gray-600">
            Total students: {students.length}
          </p>
        </>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full m-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Student Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Reg No:</span> {selectedStudent.reg_no}
              </p>
              <p>
                <span className="font-medium">Name:</span> {selectedStudent.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {selectedStudent.email}
              </p>
              <p>
                <span className="font-medium">Mobile:</span> {selectedStudent.mobile_no}
              </p>
              <p>
                <span className="font-medium">Course ID:</span> {selectedStudent.course_id}
              </p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => handleRowClick(selectedStudent)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Videos
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 border rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;

