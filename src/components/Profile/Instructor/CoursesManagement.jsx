import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import {
  addCourse,
  addLesson,
  deleteCourse,
  deleteLesson,
  getCourseLessons,
  getCategories,
  getInstructorDetailsByUserId,
  updateCourse,
  updateLesson,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizList,
} from "../../../services/coursesApi";
import CourseForm from "./courses_management/CourseForm";
import LessonForm from "./courses_management/LessonForm";
import CourseList from "./courses_management/CourseList";
import LessonList from "./courses_management/LessonList";
import EditCourseDialog from "./courses_management/EditCourseDialog";
import EditLessonDialog from "./courses_management/EditLessonDialog";
import QuizList from "./courses_management/QuizList";

const CoursesManagement = ({ user }) => {
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState(initialCourseState);
  const [categories, setCategories] = useState([]);
  const [newLesson, setNewLesson] = useState(initialLessonState);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [editLesson, setEditLesson] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchCourses();
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
    try {
      const formData = new FormData();
      formData.append("title", newCourse.title);
      formData.append("short_desc", newCourse.short_desc);
      formData.append("description", newCourse.description);
      formData.append("duration", newCourse.duration);
      formData.append("category", newCourse.category);
      formData.append("price", newCourse.price);
      formData.append("image", newCourse.image);
      formData.append("instructor", instructor);

      const response = await addCourse(formData);
      setCourses((prevCourses) => [...prevCourses, response]);
      setNewCourse(initialCourseState);
    } catch (error) {
      console.error("Error adding course:", error.response.data);
    }
  };

  const handleImageChange = (e) => {
    setNewCourse({
      ...newCourse,
      image: e.target.files[0],
    });
  };

  const handleAddLesson = async (courseId) => {
    const formData = new FormData();
    Object.keys(newLesson).forEach((key) => {
      if (Array.isArray(newLesson[key])) {
        newLesson[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, newLesson[key]);
      }
    });

    try {
      await addLesson(courseId, formData);
      toast.success("Lesson added successfully");
      setNewLesson(initialLessonState);
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
      const course = courses.find((course) => course.id === courseId);
      setSelectedCourse(course);
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

  const handleUpdateCourse = async () => {
    const formData = new FormData();
    Object.keys(editCourse).forEach((key) => {
      formData.append(key, editCourse[key]);
    });

    try {
      await updateCourse(editCourse.id, formData);
      toast.success("Course updated successfully");
      setEditCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error.response?.data);
      toast.error("Error updating course");
    }
  };

  const handleUpdateLesson = async () => {
    const formData = new FormData();
    Object.keys(editLesson).forEach((key) => {
      if (Array.isArray(editLesson[key])) {
        editLesson[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, editLesson[key]);
      }
    });

    try {
      await updateLesson(selectedCourse.id, editLesson.id, formData);
      toast.success("Lesson updated successfully");
      setEditLesson(null);
      fetchCourseLessons(selectedCourse.id);
    } catch (error) {
      console.error("Error updating lesson:", error.response?.data);
      toast.error("Error updating lesson");
    }
  };

  const openEditCourseDialog = (course) => {
    setEditCourse(course);
  };

  const openEditLessonDialog = (lesson) => {
    setEditLesson(lesson);
  };

  const handleAddQuiz = async (lessonId, quizData) => {
    try {
      const response = await addQuiz(lessonId, quizData);
      setQuizzes((prevQuizzes) => [...prevQuizzes, response]);
      toast.success("Quiz added successfully");
    } catch (error) {
      console.error("Error adding quiz:", error);
      toast.error("Error adding quiz");
    }
  };

  const handleUpdateQuiz = async (lessonId, quizSlug, quizData) => {
    try {
      await updateQuiz(lessonId, quizSlug, quizData);
      toast.success("Quiz updated successfully");
    } catch (error) {
      console.error("Error updating quiz:", error);
      toast.error("Error updating quiz");
    }
  };

  const handleDeleteQuiz = async (lessonId, quizSlug) => {
    try {
      await deleteQuiz(lessonId, quizSlug);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.slug !== quizSlug)
      );
      toast.success("Quiz deleted successfully");
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Error deleting quiz");
    }
  };

  useEffect(() => {
    if (lessons && lessons.length > 0) {
      fetchQuizList(lessons[0].id);
    }
  }, [lessons]);

  const fetchQuizList = async (lessonId) => {
    try {
      const quizzesData = await getQuizList(lessonId);
      setQuizzes(quizzesData);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      toast.error("Error fetching quizzes");
    }
  };

  return (
    <div className="bg-white p-5 sm:p-10 rounded-md flex flex-col gap-5">
      <Typography variant="h5" component="h1" gutterBottom>
        Manage Courses
      </Typography>
      <CourseForm
        newCourse={newCourse}
        categories={categories}
        handleCourseInputChange={handleCourseInputChange}
        handleImageChange={handleImageChange}
        handleAddCourse={handleAddCourse}
      />
      <Typography variant="h5" className="my-5">
        Courses List
      </Typography>
      <CourseList
        courses={courses}
        fetchCourseLessons={fetchCourseLessons}
        handleDeleteCourse={handleDeleteCourse}
        openEditCourseDialog={openEditCourseDialog}
      />
      {selectedCourse && (
        <>
          <LessonForm
            newLesson={newLesson}
            handleLessonInputChange={handleLessonInputChange}
            handleFileChange={handleFileChange}
            handleAddLesson={handleAddLesson}
            selectedCourse={selectedCourse}
          />
          <LessonList
            lessons={lessons}
            selectedCourse={selectedCourse}
            handleDeleteLesson={handleDeleteLesson}
            openEditLessonDialog={openEditLessonDialog}
          />
          {lessons && lessons.length > 0 && (
            <QuizList
              lessonId={lessons[0].id}
              quizzes={quizzes}
              handleAddQuiz={handleAddQuiz}
              handleUpdateQuiz={handleUpdateQuiz}
              handleDeleteQuiz={handleDeleteQuiz}
            />
          )}
        </>
      )}
      <EditCourseDialog
        editCourse={editCourse}
        setEditCourse={setEditCourse}
        handleUpdateCourse={handleUpdateCourse}
        categories={categories}
      />
      <EditLessonDialog
        editLesson={editLesson}
        setEditLesson={setEditLesson}
        handleUpdateLesson={handleUpdateLesson}
      />
    </div>
  );
};

const initialCourseState = {
  title: "",
  short_desc: "",
  description: "",
  category: "",
  price: "",
  duration: "",
  image: null,
};

const initialLessonState = {
  title: "",
  content: "",
  video: [],
  images: [],
  files: [],
  documents: [],
};

export default CoursesManagement;
