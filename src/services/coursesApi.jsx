import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/courses';

export const getCourses = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

export const getCourseDetails = async (courseId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${courseId}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course details:", error);
        throw error;
    }
};

export const getInstructorDetails = async (instructorId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/instructors/${instructorId}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching instructor details:", error);
        throw error;
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

export const getCoursesByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/courses/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses by category:", error);
        throw error;
    }
};
