import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/material/`;

const getMaterials = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const materialService = {
  getMaterials,
};

export default materialService;
