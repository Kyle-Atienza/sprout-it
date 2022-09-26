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

const createSupplier = async ({ id, payload }, token) => {};

const updateSupplier = async ({ id, payload }, token) => {};

const deleteSupplier = async ({ id, payload }, token) => {};

const supplierService = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};

export default supplierService;
