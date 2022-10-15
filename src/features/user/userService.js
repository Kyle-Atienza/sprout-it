import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/users/`;

const getUsers = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}${id}`);

  return response.data;
};

const register = async (user) => {
  const response = await axios.post(`${API_URL}register`, user);

  if (response.data) {
    localStorage.setItem("sproutItUser", JSON.stringify(response.data));
  }

  return response.data;
};

const registerWithInvite = async (user) => {
  const response = await axios.post(
    `${API_URL}register/${user.inviteToken}`,
    user
  );

  if (response.data) {
    localStorage.setItem("sproutItUser", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${API_URL}login`, user);

  if (response.data) {
    localStorage.setItem("sproutItUser", JSON.stringify(response.data));
  }

  return response.data;
};

const updateUser = async (payload) => {
  const response = await axios.put(`${API_URL}/${payload.id}`, payload.data);

  if (response.data) {
    localStorage.setItem("sproutItUser", JSON.stringify(response.data));
  }

  return response.data;
};

const invite = async (invitedUser) => {
  const response = await axios.post(`${API_URL}invite`, invitedUser);

  return response.data;
};

const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}forgot-password`, email);

  return response.data;
};

const resetPassword = async (payload) => {
  const response = await axios.post(`${API_URL}reset-password`, payload);

  return response.data;
};

const getUsers = async (payload) => {
  const response = await axios.get(`${API_URL}all`, payload);

  return response.data;
};

const userService = {
  register,
  registerWithInvite,
  login,
  updateUser,
  invite,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
};

export default userService;
