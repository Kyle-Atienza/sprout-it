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
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}batch/`, config);

  return response.data;
};

const createBatch = async (batchData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}batch/`, batchData, config);

  return response.data;
};

const updateBatch = async ({ id, payload }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${`${API_URL}batch/`}/${id}`,
    payload,
    config
  );

  return response.data;
};

const createTask = async (taskData, token) => {
  const response = await axios.post(`${API_URL}task/`, taskData, config(token));

  console.log(response.data);
  // return response.data;
};

const batchService = { getBatches, createBatch, updateBatch, createTask };

export default batchService;
