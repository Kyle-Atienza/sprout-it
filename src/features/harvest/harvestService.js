import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/harvest/`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const createHarvest = async (payload, token) => {
  const response = await axios.post(API_URL, payload, config(token));

  return response.data;
};

const harvestService = {
  createHarvest,
};

export default harvestService;
