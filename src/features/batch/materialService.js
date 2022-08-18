import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/material/`;

const setMaterials = async (materialData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, materialData, config);
  console.log(materialData);

  return response.data;
};

const materialService = { setMaterials };

export default materialService;
