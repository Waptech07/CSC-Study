import axios from "axios";

const API_BASE_URL = "https://csc-study-api.vercel.app/api/courses";

export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseDetails = async (courseSlug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/course/${courseSlug}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

export const getCourseReviews = async (courseId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/course/${courseId}/reviews/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching course reviews:", error);
    throw error;
  }
};

export const addCourseReview = async (courseId, reviewData) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/course/${courseId}/reviews/`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding course review:", error);
    throw error;
  }
};

export const initiatePayment = async (courseId) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/course/${courseId}/initiate-payment/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
};

export const verifyPayment = async (reference) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/verify-payment/${reference}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

export const checkEnrollment = async (courseId) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${courseId}/check-enrollment/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchCourses = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search/?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching courses:", error);
  }
};

export const getCourseLessons = async (courseId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${courseId}/lessons/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course lessons:", error);
    throw error;
  }
};

export const getLessonDetails = async (courseSlug, lessonSlug) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${courseSlug}/lesson/${lessonSlug}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching lesson details:", error);
    throw error;
  }
};

export const getInstructors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/instructors/`);
    return response.data;
  } catch (error) {
    console.error("Error getting instructors:", error);
    throw error;
  }
};

export const getInstructorDetails = async (instructorSlug) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/instructor/${instructorSlug}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching instructor details:", error);
    throw error;
  }
};

export const getInstructorDetailsByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/instructor/user/${userId}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching instructor details by user ID:", error);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCoursesByCategory = async (categorySlug) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/category/${categorySlug}/courses/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    throw error;
  }
};

export const addCourse = async (courseData) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(`${API_BASE_URL}/create/`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error.response.data);
    throw error;
  }
};

export const updateCourse = async (courseId, courseData) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${courseId}/update/`,
      courseData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error.response.data);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  const token = localStorage.getItem("access_token");

  const response = await axios.delete(`${API_BASE_URL}/${courseId}/delete/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addLesson = async (courseId, lessonData) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.post(
      `${API_BASE_URL}/${courseId}/lesson/create/`,
      lessonData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding lesson:", error.response.data);
    throw error;
  }
};

export const updateLesson = async (courseId, lessonId, lessonData) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.put(
      `${API_BASE_URL}/${courseId}/lesson/${lessonId}/update/`,
      lessonData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating lesson:", error.response.data);
    throw error;
  }
};

export const deleteLesson = async (courseId, lessonId) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.delete(
    `${API_BASE_URL}/${courseId}/lesson/${lessonId}/delete/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const getToken = () => localStorage.getItem("access_token");

export const getUserEnrollments = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/enrollments/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user enrollments:", error);
    throw error;
  }
};

export const getActiveCourses = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/active-courses/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting active courses:", error);
    throw error;
  }
};

export const getCompletedCourses = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/completed-courses/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting completed courses:", error);
    throw error;
  }
};

export const getPurchaseHistory = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/purchase-history/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting purchase history:", error);
    throw error;
  }
};

export const completeLesson = async (courseId, lessonId) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${courseId}/lesson/${lessonId}/complete/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error completing lesson:", error);
    throw error;
  }
};

export const addQuiz = async (lessonId, quizData) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/lesson/${lessonId}/quiz/`,
      quizData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding quiz:", error);
    throw error;
  }
};

export const updateQuiz = async (lessonId, quizSlug, quizData) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.put(
      `${API_BASE_URL}/lesson/${lessonId}/quiz/${quizSlug}/`,
      quizData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const deleteQuiz = async (lessonId, quizSlug) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/lesson/${lessonId}/quiz/${quizSlug}/delete/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

export const fetchQuizDetails = async (lessonId, quizSlug) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/lesson/${lessonId}/quiz/${quizSlug}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz details:", error);
    throw error;
  }
};

export const submitQuiz = async (lessonId, quizSlug, answers) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/lesson/${lessonId}/quiz/${quizSlug}/submit/`,
      { answers },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting quiz:", error);
    throw error;
  }
};


export const getQuizList = async (lessonId) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(
      `${API_BASE_URL}/lesson/${lessonId}/quizzes/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz details:", error);
    throw error;
  }
};

export const submitQuizAnswers = async (lessonId, quizSlug, answers) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/lesson/${lessonId}/quiz/${quizSlug}/`,
      { user_answers: answers }, // Ensure 'answers' is sent under the correct key
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting quiz answers:", error);
    throw error;
  }
};
