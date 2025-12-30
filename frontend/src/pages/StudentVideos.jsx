import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videoService, studentService } from '../api/services';
import { useToast } from '../context/ToastContext';
import Table from '../components/Table';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import Loader from '../components/Loader';

const StudentVideos = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [formData, setFormData] = useState({
    course_id: '',
    title: '',
    description: '',
    youtube_url: '',
  });
  const { success: showSuccess, error: showError } = useToast();

  useEffect(() => {
    fetchData();
  }, [studentId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all videos (backend doesn't filter by studentId yet)
      // We'll filter client-side based on student's course
      const [videosData, studentsData] = await Promise.all([
        videoService.getAll(),
        studentService.getAll(),
      ]);

      // Find the student - match by email or reg_no
      const foundStudent = Array.isArray(studentsData)
        ? studentsData.find(
            (s) => s.email === studentId || s.reg_no?.toString() === studentId
          )
        : null;

      if (foundStudent) {
        setStudent(foundStudent);
        // Filter videos by student's course_id
        const filteredVideos = Array.isArray(videosData)
          ? videosData.filter((v) => v.course_id === foundStudent.course_id)
          : [];
        setVideos(filteredVideos);
      } else {
        // If student not found, show all videos
        setVideos(Array.isArray(videosData) ? videosData : []);
      }

      // Note: If you need to fetch courses for a dropdown, use courseService.getAll()
      // For now, course_id is set from the student's enrolled course
    } catch (error) {
      showError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    if (student) {
      setFormData({
        course_id: student.course_id || '',
        title: '',
        description: '',
        youtube_url: '',
      });
    } else {
      setFormData({
        course_id: '',
        title: '',
        description: '',
        youtube_url: '',
      });
    }
    setIsAddModalOpen(true);
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setFormData({
      course_id: video.course_id || '',
      title: video.title || '',
      description: video.description || '',
      youtube_url: video.youtube_url || '',
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (video) => {
    setSelectedVideo(video);
    setIsDeleteDialogOpen(true);
  };

  const handlePreview = (video) => {
    setPreviewVideo(video);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAddModalOpen) {
        await videoService.add(formData);
        showSuccess('Video added successfully');
      } else {
        await videoService.update(selectedVideo.video_id, formData);
        showSuccess('Video updated successfully');
      }
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      fetchData();
    } catch (error) {
      showError(error.message || 'Failed to save video');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await videoService.delete(selectedVideo.video_id);
      showSuccess('Video deleted successfully');
      setIsDeleteDialogOpen(false);
      fetchData();
    } catch (error) {
      showError(error.message || 'Failed to delete video');
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const columns = [
    { header: 'Video ID', accessor: 'video_id' },
    { header: 'Title', accessor: 'title' },
    { header: 'Description', accessor: 'description' },
    { header: 'Course ID', accessor: 'course_id' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePreview(row);
            }}
            className="text-green-600 hover:text-green-800"
          >
            Preview
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button
            onClick={() => navigate('/students')}
            className="text-blue-600 hover:text-blue-800 mb-2"
          >
            ← Back to Students
          </button>
          <h1 className="text-3xl font-bold">
            Videos {student && `- ${student.name}`}
          </h1>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Video
        </button>
      </div>

      {loading ? (
        <Loader size="lg" className="my-8" />
      ) : (
        <>
          <Table columns={columns} data={videos} />
          <p className="mt-4 text-gray-600">Total videos: {videos.length}</p>
        </>
      )}

      {/* Add Video Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Video"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Course ID</label>
            <input
              type="text"
              value={formData.course_id}
              onChange={(e) =>
                setFormData({ ...formData, course_id: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              YouTube URL
            </label>
            <input
              type="url"
              value={formData.youtube_url}
              onChange={(e) =>
                setFormData({ ...formData, youtube_url: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Video
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Video Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Video"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Course ID</label>
            <input
              type="text"
              value={formData.course_id}
              onChange={(e) =>
                setFormData({ ...formData, course_id: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              YouTube URL
            </label>
            <input
              type="url"
              value={formData.youtube_url}
              onChange={(e) =>
                setFormData({ ...formData, youtube_url: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update Video
            </button>
          </div>
        </form>
      </Modal>

      {/* Video Preview Modal */}
      {previewVideo && (
        <Modal
          isOpen={!!previewVideo}
          onClose={() => setPreviewVideo(null)}
          title={previewVideo.title}
          size="xl"
        >
          <div className="space-y-4">
            <p className="text-gray-600">{previewVideo.description}</p>
            {getYouTubeEmbedUrl(previewVideo.youtube_url) ? (
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(previewVideo.youtube_url)}
                  title={previewVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded"
                ></iframe>
              </div>
            ) : (
              <div className="p-4 bg-gray-100 rounded text-center">
                <p className="text-gray-600">
                  Invalid YouTube URL or URL not available
                </p>
                <a
                  href={previewVideo.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Open in new tab
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Video"
        message={`Are you sure you want to delete "${selectedVideo?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default StudentVideos;

