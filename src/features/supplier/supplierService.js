import axios from "axios";

const API_URL = `${process.env.REACT_APP_PROXY}api/supplier/`;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getSuppliers = async (token) => {
  const response = await axios.get(API_URL, config(token));

  return response.data;
};

const createSupplier = async (supplierData, token) => {
  const response = await axios.post(`${API_URL}`, supplierData, config(token));

  return response.data;
};

const updateSupplier = async ({ id, payload }, token) => {
  const response = await axios.put(`${API_URL}${id}`, payload, config(token));

  return response.data;
};

const deleteSupplier = async (id, token) => {
  const response = await axios.delete(`${API_URL}${id}`, config(token));

  return response.data;
};

const supplierService = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};

export default supplierService;
