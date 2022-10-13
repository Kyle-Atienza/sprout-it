import React from "react";
import { PrimaryButton } from "../components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSupplier } from "../features/supplier/supplierSlice";

export const SupplierForm = ({ closeForm }) => {
  const dispatch = useDispatch();

  const [supplierData, setSupplierData] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const { name, address, contact } = supplierData;

  const onCreateSupplier = () => {
    dispatch(
      createSupplier({
        name: name,
        address: address,
        contact: contact,
      })
    );
    closeForm();
  };

  const onChange = (e) => {
    setSupplierData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="mb-4">
        <label className="block open-button" htmlFor="username">
          Supplier
        </label>
        <div className="flex justify-center items-center">
          <input
            className="w-full p-3 mr-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
            name="name"
            type="text"
            required
            onChange={onChange}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block open-button" htmlFor="username">
          Address
        </label>
        <div className="flex justify-center items-center">
          <input
            className="w-full p-3 mr-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
            name="address"
            type="text"
            required
            onChange={onChange}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block open-button" htmlFor="username">
          Contact
        </label>
        <div className="flex justify-center items-center">
          <input
            className="w-full p-3 mr-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
            name="contact"
            type="text"
            required
            onChange={onChange}
          />
        </div>
      </div>
      <PrimaryButton onClick={onCreateSupplier} name="Create Supplier" />
    </>
  );
};
