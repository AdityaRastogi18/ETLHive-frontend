import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL;

const Api = {
  login: async (data) => {
    const url = `${BASE_URL}/login`;
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  signup: async (data) => {
    console.log("data", data);
    const url = `${BASE_URL}/signup`;
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  getLeads: async (token, page, pageLimit, sortOrder, query) => {
    const url = `${BASE_URL}/leads?limit=${pageLimit}&page=${page}&search=${query}&sort=${sortOrder}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  editLeadEntry: async (token, id, data) => {
    const url = `${BASE_URL}/leads/${id}`;
    try {
      const response = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  deleteLeadEntry: async (token, id) => {
    const url = `${BASE_URL}/leads/${id}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.message);
      throw error;
    }
  },

  createLead: async (token, lead) => {
    const url = `${BASE_URL}/leads`;
    try {
      const response = await axios.post(url, lead, {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  updateUser: async (token, data) => {
    const url = BASE_URL;
    try {
      const response = await axios.patch(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  forgotPassword: async (data) => {
    const url = `${BASE_URL}/forgotPassword`;
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success(response.data.msg);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.msg);
      throw error;
    }
  },
};

export default Api;
