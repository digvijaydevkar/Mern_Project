import api from './axios';

// Auth services
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Course services
export const courseService = {
  getAll: async () => {
    const response = await api.get('/courses/all-courses');
    return response.data;
  },
  
  add: async (courseData) => {
    const response = await api.post('/courses/add', courseData);
    return response.data;
  },
  
  update: async (courseId, courseData) => {
    const response = await api.put(`/courses/${courseId}`, courseData);
    return response.data;
  },
  
  delete: async (courseId) => {
    const response = await api.delete(`/courses/${courseId}`);
    return response.data;
  },
};

// Student services
export const studentService = {
  // Get all enrolled students (optionally filtered by course_id)
  getAll: async (courseId = null) => {
    const params = courseId ? { course_id: courseId } : {};
    const response = await api.get('/admin/enrolled-students', { params });
    return response.data;
  },
  
  // Register student to course
  register: async (studentData) => {
    const response = await api.post('/student/register-to-course', studentData);
    return response.data;
  },
};

// Video services
export const videoService = {
  getAll: async (studentId = null) => {
    // Note: Backend doesn't have studentId filter yet, but we can add query param
    // For now, get all videos and filter client-side if needed
    const params = studentId ? { studentId } : {};
    const response = await api.get('/videos/all-videos', { params });
    return response.data;
  },
  
  add: async (videoData) => {
    const response = await api.post('/videos/add', videoData);
    return response.data;
  },
  
  update: async (videoId, videoData) => {
    const response = await api.put(`/videos/${videoId}`, videoData);
    return response.data;
  },
  
  delete: async (videoId) => {
    const response = await api.delete(`/videos/${videoId}`);
    return response.data;
  },
};

