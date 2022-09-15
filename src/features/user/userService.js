import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/users/`;

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

const userService = {
  register,
  registerWithInvite,
  login,
  invite,
  forgotPassword,
  resetPassword,
};

export default userService;
