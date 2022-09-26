import axios, { AxiosError } from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/purchase/`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getPurchases = async (token) => {
  const response = await axios.get(API_URL, config(token));

  return response.data;
};

const createPurchase = async (token) => {};

const updatePurchase = async (token) => {};

const deletePurchase = async (token) => {};

const financialService = {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
};

export default financialService;
