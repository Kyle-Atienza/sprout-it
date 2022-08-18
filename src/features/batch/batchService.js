import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/batch/`;

const getBatches = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const createBatch = async (batchData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, batchData, config);

  return response.data;
};

const batchService = { getBatches, createBatch };

export default batchService;
