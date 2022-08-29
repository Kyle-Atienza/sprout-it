import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getTasks = async (token) => {
  const response = await axios.get(`${API_URL}task/`, config(token));

  return response.data;
};

const createTask = async (taskData, token) => {
  const response = await axios.post(`${API_URL}task/`, taskData, config(token));

  return response.data;
};

const updateTask = async ({ id, payload }, token) => {
  const response = await axios.put(
    `${API_URL}task/${id}`,
    payload,
    config(token)
  );

  return response.data;
};

const taskService = { getTasks, createTask, updateTask };

export default taskService;
