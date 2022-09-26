import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/harvest/`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getHarvests = async (id, token) => {
  const response = await axios.get(`${API_URL}/${id}`, config(token));

  return response.data;
};

const createHarvest = async ({ id, payload }, token) => {
  const response = await axios.post(`${API_URL}/${id}`, payload, config(token));

  return response.data;
};

const updateHarvest = async ({ id, payload }, token) => {
  const response = await axios.put(`${API_URL}/${id}`, payload, config(token));

  return response.data;
};

const harvestService = {
  getHarvests,
  createHarvest,
  updateHarvest,
};

export default harvestService;
