import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  addCourse,
  addLesson,
  deleteCourse,
  deleteLesson,
  getCourseLessons,
  getCategories,
  getInstructorDetailsByUserId,
} from "../../../services/coursesApi";

const CoursesManagement = ({ user }) => {
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    short_desc: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [newLesson, setNewLesson] = useState({
    title: "",
    content: "",
    video: [],
    images: [],
    files: [],
    documents: [],
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      const fetchedInstructor = await getInstructorDetailsByUserId(user.id);
      setInstructor(fetchedInstructor);
      setCourses(fetchedInstructor?.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Error fetching courses");
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
    }
  };

  const handleAddCourse = async () => {
    const formData = new FormData();
    formData.append("title", newCourse.title);
    formData.append("short_desc", newCourse.short_desc);
    formData.append("description", newCourse.description);
    formData.append("category", newCourse.category);
    formData.append("price", newCourse.price);
    formData.append("duration", newCourse.duration);
    formData.append("image", newCourse.image);
    formData.append("instructor", instructor.id);

    try {
      await addCourse(formData);
      toast.success("Course added successfully");
      setNewCourse({
        title: "",
        short_desc: "",
        description: "",
        category: "",
        price: "",
        duration: "",
        image: null,
      });
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error.response?.data);
      toast.error("Error adding course");
    }
  };

  const handleAddLesson = async (courseId) => {
    const formData = new FormData();
    formData.append("title", newLesson.title);
    formData.append("content", newLesson.content);
    // formData.append("video", newLesson.video);
    newLesson.video.forEach((video) => formData.append("video", video));
    newLesson.images.forEach((image) => formData.append("images", image));
    newLesson.files.forEach((file) => formData.append("files", file));
    newLesson.documents.forEach((document) =>
      formData.append("documents", document)
    );

    try {
      await addLesson(courseId, formData);
      toast.success("Lesson added successfully");
      setNewLesson({
        title: "",
        content: "",
        video: [],
        images: [],
        files: [],
        documents: [],
      });
      fetchCourseLessons(courseId);
    } catch (error) {
      console.error("Error adding lesson:", error.response?.data);
      toast.error("Error adding lesson");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error.response?.data);
      toast.error("Error deleting course");
    }
  };

  const handleDeleteLesson = async (lessonId, courseId) => {
    try {
      await deleteLesson(courseId, lessonId);
      toast.success("Lesson deleted successfully");
      fetchCourseLessons(courseId);
    } catch (error) {
      console.error("Error deleting lesson:", error.response?.data);
      toast.error("Error deleting lesson");
    }
  };

  const fetchCourseLessons = async (courseId) => {
    try {
      const lessonsData = await getCourseLessons(courseId);
      setLessons(lessonsData);
      setSelectedCourse(courseId);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      toast.error("Error fetching lessons");
    }
  };

  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleLessonInputChange = (e) => {
    const { name, value } = e.target;
    setNewLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    setNewLesson((prev) => ({ ...prev, [type]: files }));
  };

  return (
    <div className="bg-white p-5 sm:p-10 rounded-md flex flex-col gap-5">
      <Typography variant="h5" className="mb-5">
        Manage Courses
      </Typography>
      <Box component="form" noValidate autoComplete="off" className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextField
            label="Course Title"
            name="title"
            value={newCourse.title}
            onChange={handleCourseInputChange}
            fullWidth
          />
          <TextField
            label="Short Description"
            name="short_desc"
            value={newCourse.short_desc}
            onChange={handleCourseInputChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={newCourse.description}
            onChange={handleCourseInputChange}
            fullWidth
            multiline
            maxRows={4}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newCourse.category}
              onChange={handleCourseInputChange}
              input={<OutlinedInput label="Category" />}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Price"
            name="price"
            value={newCourse.price}
            onChange={handleCourseInputChange}
            fullWidth
          />
          <TextField
            label="Duration"
            name="duration"
            value={newCourse.duration}
            onChange={handleCourseInputChange}
            placeholder="1:00:00"
            fullWidth
          />
          <Button
            variant="contained"
            component="label"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Upload Image
            <input
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={(e) =>
                setNewCourse((prev) => ({ ...prev, image: e.target.files[0] }))
              }
            />
          </Button>
        </div>
        <Button
          variant="contained"
          className="bg-green-500 hover:bg-green-600 text-white"
          onClick={handleAddCourse}
        >
          Add Course
        </Button>
      </Box>
      <Typography variant="h5" className="my-5">
        Courses List
      </Typography>
      {courses.map((course) => (
        <div
          key={course.id}
          className="mb-5 p-5 border border-gray-200 rounded-md"
        >
          <Typography variant="h6" className="mb-2">
            {course.title}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="contained"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => handleDeleteCourse(course.id)}
            >
              Delete Course
            </Button>
            <Button
              variant="contained"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => fetchCourseLessons(course.id)}
            >
              View Lessons
            </Button>
          </div>
          {selectedCourse === course.id && (
            <div className="mt-5">
              <Box
                component="form"
                noValidate
                autoComplete="off"
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <TextField
                    label="Lesson Title"
                    name="title"
                    value={newLesson.title}
                    onChange={handleLessonInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Content"
                    name="content"
                    value={newLesson.content}
                    onChange={handleLessonInputChange}
                    fullWidth
                    multiline
                    maxRows={4}
                  />
                  <Button
                    variant="contained"
                    component="label"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Upload Video
                    <input
                      type="file"
                      name="video"
                      accept="video/*"
                      hidden
                      onChange={(e) => handleFileChange(e, "video")}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    component="label"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Upload Images
                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={(e) => handleFileChange(e, "images")}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    component="label"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Upload Files
                    <input
                      type="file"
                      name="files"
                      multiple
                      hidden
                      onChange={(e) => handleFileChange(e, "files")}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    component="label"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Upload Documents
                    <input
                      type="file"
                      name="documents"
                      multiple
                      hidden
                      onChange={(e) => handleFileChange(e, "documents")}
                    />
                  </Button>
                </div>
                <Button
                  variant="contained"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleAddLesson(course.id)}
                >
                  Add Lesson
                </Button>
              </Box>
              <Typography variant="h6" className="mt-5">
                Lessons List
              </Typography>
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="mb-3 p-3 border border-gray-200 rounded-md"
                >
                  <Typography variant="body1" className="mb-2">
                    {lesson.title}
                  </Typography>
                  <Button
                    variant="contained"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleDeleteLesson(lesson.id, course.id)}
                  >
                    Delete Lesson
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CoursesManagement;
