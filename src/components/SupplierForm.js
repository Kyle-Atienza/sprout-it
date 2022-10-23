import React, { useEffect } from "react";
import { PrimaryButton } from "../components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSupplier,
  updateSupplier,
} from "../features/supplier/supplierSlice";

export const SupplierForm = ({ closeForm, supplier }) => {
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
    setSupplierData({
      name: "",
      address: "",
      contact: "",
    });
  };

  const onUpdateSupplier = () => {
    dispatch(
      updateSupplier({
        id: supplier._id,
        payload: {
          name: name,
          address: address,
          contact: contact,
        },
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

  useEffect(() => {
    if (supplier) {
      setSupplierData({
        name: supplier.name,
        address: supplier.address,
        contact: supplier.contact,
      });
    }
  }, []);

  return (
    <>
      <div className="mb-4">
        <label className="block open-button" htmlFor="username">
          Supplier
        </label>
        <div className="flex justify-center items-center">
          <input
            defaultValue={name}
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
            defaultValue={address}
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
            defaultValue={contact}
            className="w-full p-3 mr-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
            name="contact"
            type="text"
            required
            onChange={onChange}
          />
        </div>
      </div>
      <PrimaryButton
        onClick={
          Object.keys(supplier).length ? onUpdateSupplier : onCreateSupplier
        }
        name="Create Supplier"
      />
    </>
  );
};
