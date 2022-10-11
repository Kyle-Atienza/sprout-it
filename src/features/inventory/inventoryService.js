import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/material/`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getMaterials = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const postMaterial = async (materialData, token) => {
  const response = await axios.post(`${API_URL}`, materialData, config(token));

  return response.data;
};

const putMaterial = async ({ id, payload }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${`${API_URL}`}${id}`, payload, config);

  return response.data;
};

const deleteMaterial = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${`${API_URL}`}${id}`, config);

  return response.data;
};

const inventoryService = {
  getMaterials,
  postMaterial,
  putMaterial,
  deleteMaterial,
};

export default inventoryService;
