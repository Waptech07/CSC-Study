import axios from "axios";

const baseUrl = "https://csc-study-api.vercel.app/api/auth/";

const ApiService = {
  async login(username_or_email, password) {
    const apiUrl = `${baseUrl}login/`;
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.post(
        apiUrl,
        { username_or_email, password },
        { headers, timeout: 10000 }
      );
      return response.status >= 200 && response.status < 300
        ? { success: true, data: response.data }
        : { success: false, error: response.data };
    } catch (error) {
      console.error("Network error:", error);
      return {
        success: false,
        error: error.response?.data || "Network error",
      };
    }
  },

  async register(
    name,
    username,
    email,
    password,
    confirmPassword,
    isInstructor,
    gender
  ) {
    const apiUrl = `${baseUrl}register/`;
    const headers = { "Content-Type": "application/json" };
    const body = {
      name,
      username,
      email,
      password,
      password2: confirmPassword,
      is_instructor: isInstructor,
      gender,
    };

    try {
      const response = await axios.post(apiUrl, body, {
        headers,
        timeout: 10000,
      });
      return response.status >= 200 && response.status < 300
        ? { success: true, data: response.data }
        : { success: false, error: response.data };
    } catch (error) {
      console.error("Network error:", error);
      return { success: false, error: error.response?.data || "Network error" };
    }
  },

  async verifyEmail(uid, token) {
    const apiUrl = `${baseUrl}verify-email/${uid}/${token}/`;
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.get(apiUrl, {}, { headers, timeout: 10000 });
      return response.status >= 200 && response.status < 300
        ? { success: true, data: response.data }
        : { success: false, error: response.data };
    } catch (error) {
      console.error("Network error:", error);
      return { success: false, error: error.response?.data || "Network error" };
    }
  },

  async getUserDetails() {
    const apiUrl = `${baseUrl}user/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    try {
      const response = await axios.get(apiUrl, { headers, timeout: 10000 });
      return response.status >= 200 && response.status < 300
        ? { success: true, data: response.data }
        : { success: false, error: response.data.message };
    } catch (error) {
      console.error("Network error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Network error",
      };
    }
  },

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  async updateProfile(profileData) {
    const apiUrl = `${baseUrl}update-profile/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    try {
      const response = await axios.put(apiUrl, profileData, {
        headers,
        timeout: 10000,
      });
      return response.status >= 200 && response.status < 300
        ? { success: true, data: response.data }
        : { success: false, error: response.data };
    } catch (error) {
      console.error("Network error:", error);
      return {
        success: false,
        error: error.response?.data || "Network error",
      };
    }
  },

  async changePassword(oldPassword, newPassword, newPassword2) {
    const apiUrl = `${baseUrl}change-password/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    const body = {
      old_password: oldPassword,
      new_password: newPassword,
      new_password2: newPassword2,
    };

    try {
      const response = await axios.post(apiUrl, body, {
        headers,
        timeout: 10000,
      });
      return response.status >= 200 && response.status < 300
        ? { success: true, data: response.data }
        : { success: false, error: response.data };
    } catch (error) {
      console.error("Network error:", error);
      return { success: false, error: error.response?.data || "Network error" };
    }
  },

  async deleteProfile() {
    const apiUrl = `${baseUrl}delete-profile/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    try {
      const response = await axios.delete(apiUrl, { headers, timeout: 10000 });
      return response.status >= 200 && response.status < 300
        ? { success: true, data: response.data }
        : { success: false, error: response.data };
    } catch (error) {
      console.error("Network error:", error);
      return { success: false, error: error.response?.data || "Network error" };
    }
  },

  async updateProfileImage(imageData) {
    const apiUrl = `${baseUrl}update-profile-image/`;
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    try {
      const response = await axios.put(apiUrl, imageData, {
        headers,
        timeout: 10000,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Network error",
      };
    }
  },

  async forgotPassword(email) {
    const apiUrl = `${baseUrl}forgot-password/`;
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.post(
        apiUrl,
        { email },
        { headers, timeout: 10000 }
      );
      return response.status >= 200 && response.status < 300
        ? { success: true, data: response.data }
        : { success: false, error: response.data };
    } catch (error) {
      console.error("Network error:", error);
      return { success: false, error: error.response?.data || "Network error" };
    }
  },

  async resetPassword(uid, token, newPassword) {
    const apiUrl = `${baseUrl}reset-password/${uid}/${token}/`;
    const headers = { "Content-Type": "application/json" };
    const body = {
      uid,
      token,
      new_password: newPassword,
      new_password2: newPassword,
    };

    try {
      const response = await axios.post(apiUrl, body, {
        headers,
        timeout: 10000,
      });
      return response.status >= 200 && response.status < 300
        ? { success: true, data: response.data }
        : { success: false, error: response.data };
    } catch (error) {
      console.error("Network error:", error);
      return { success: false, error: error.response?.data || "Network error" };
    }
  },
};

export default ApiService;
