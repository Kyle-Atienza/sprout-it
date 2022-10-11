import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/notif/`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getNotifications = async (token) => {
  const response = await axios.get(API_URL, config(token));

  return response.data;
};

const deleteNotification = async (id, token) => {
  const response = await axios.delete(`${API_URL}${id}`, config(token));

  return response.data;
};

const notificationService = {
  getNotifications,
  deleteNotification,
};

export default notificationService;
