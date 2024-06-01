import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/auth/";

const ApiService = {
  async login(email, password) {
    const apiUrl = `${baseUrl}login/`;
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.post(apiUrl, { email, password }, { headers, timeout: 10000 });
      return response.status >= 200 && response.status < 300
        ? { success: true, data: response.data }
        : { success: false, error: response.data.message };
    } catch (error) {
      console.error("Network error:", error);
      return { success: false, error: error.response?.data?.error || "Network error" };
    }
  },

  async register(name, email, password, confirmPassword) {
    const apiUrl = `${baseUrl}register/`;
    const headers = { "Content-Type": "application/json" };
    const body = { name, email, password, password2: confirmPassword };

    try {
      const response = await axios.post(apiUrl, body, { headers, timeout: 10000 });
      return response.status >= 200 && response.status < 300
        ? { success: true, data: response.data }
        : { success: false, error: response.data.message || response.data.non_field_errors };
    } catch (error) {
      console.error("Network error:", error);
      return { success: false, error: error.response?.data?.error || error.response?.data?.email || error.response?.data?.password || "Network error" };
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
      return { success: false, error: error.response?.data?.message || "Network error" };
    }
  },

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

export default ApiService;
