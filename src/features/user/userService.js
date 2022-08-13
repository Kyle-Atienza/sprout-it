import axios from "axios";

const API_URL = "api/users/";

const register = async (user) => {
  const response = await axios.post(API_URL, user);

  if (response.data) {
    localStorage.setItem("sproutItUser", JSON.stringify(response.data));
  }

  return response.data;
};

const userService = {
  register,
};

export default userService;
