import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getBatches = async (token) => {
  const response = await axios.get(`${API_URL}batch/`, config(token));

  return response.data;
};

const getBatch = async (id, token) => {
  const response = await axios.get(`${API_URL}batch/${id}`, config(token));

  return response.data;
};

const createBatch = async (batchData, token) => {
  const response = await axios.post(
    `${API_URL}batch/`,
    batchData,
    config(token)
  );

  return response.data;
};

const updateBatch = async ({ id, payload }, token) => {
  const response = await axios.put(
    `${`${API_URL}batch/`}${id}`,
    payload,
    config(token)
  );

  console.log(response);
  return response.data;
};

const deleteBatch = async (id, token) => {
  const response = await axios.delete(
    `${`${API_URL}batch/`}${id}`,
    config(token)
  );

  return response.data;
};

const getTasks = async (token) => {
  const response = await axios.get(`${API_URL}task/`, config(token));

  return response.data;
};

const createTask = async (taskData, token) => {
  const response = await axios.post(`${API_URL}task/`, taskData, config(token));

  return response.data;
};

const batchService = {
  getBatches,
  getBatch,
  createBatch,
  updateBatch,
  deleteBatch,
  getTasks,
  createTask,
};

export default batchService;
