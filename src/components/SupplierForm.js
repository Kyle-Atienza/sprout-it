import React, { useEffect } from "react";
import { PrimaryButton } from "../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSupplier,
  updateSupplier,
} from "../features/supplier/supplierSlice";

import { SupplierProductsTableRow } from "./SupplierProductsTableRow";

export const SupplierForm = ({ closeForm, supplierId }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { materials } = useSelector((state) => state.inventory);
  const { suppliers } = useSelector((state) => state.supplier);
  const [supplier, setSupplier] = useState({});
  const [editRow, setEditRow] = useState(null); //index of currently edited row

  /* const supplier = () => {
    return suppliers.find((supplier) => supplier._id === supplierId);
  }; */

  useEffect(() => {
    console.log(supplierId);

    setSupplier(suppliers.find((supplier) => supplier._id === supplierId));

    return () => {
      setSupplier({});
    };
  }, []);

  const [supplierData, setSupplierData] = useState({
    name: "",
    address: "",
    contact: "",
    products: [],
  });
  const [product, setProduct] = useState({
    product: "",
    price: "",
  });

  const { name, address, contact } = supplierData;

  const onCreateSupplier = () => {
    if (user.role === "owner") {
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
    } else {
      alert("Restricted to Owner Only");
    }
  };

  const onUpdateSupplier = () => {
    if (user.role === "owner") {
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
    } else {
      alert("Restricted to Owner Only");
    }
  };

  const onAddProduct = () => {
    console.log({
      id: supplier._id,
      payload: {
        products: [
          ...supplier.products.map((supplierProduct) => {
            return {
              product: supplierProduct.product._id,
              price: supplierProduct.price,
            };
          }),
          product,
        ],
      },
    });
    if (user.role === "owner") {
      dispatch(
        updateSupplier({
          id: supplier._id,
          payload: {
            products: [
              ...supplier.products.map((supplierProduct) => {
                return {
                  product: supplierProduct.product._id,
                  price: supplierProduct.price,
                };
              }),
              product,
            ],
          },
        })
      );
    } else {
      alert("Restricted to Owner Only");
    }
  };

  const onChange = (e) => {
    setSupplierData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSetProduct = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "price"
          ? parseFloat(e.target.value).toFixed(2)
          : e.target.value,
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
  }, [supplier]);

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
      <div className="mb-4">
        <label className="block open-button" htmlFor="username">
          Products
        </label>
        <table className="w-full text-sm text-left">
          <thead className=" poppins-paragraph ">
            <tr>
              <th scope="col" className="py-2">
                Product
              </th>
              <th scope="col" className="py-2">
                Price
              </th>
              <th scope="col" className="py-2">
                Edit
              </th>
              <th scope="col" className="py-2">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {supplier && supplier.products
              ? supplier.products.map((product, index) => {
                  return (
                    <SupplierProductsTableRow
                      supplier={supplier}
                      setEditRow={(rowIndex) => setEditRow(rowIndex)}
                      editRow={editRow}
                      row={index}
                      product={product}
                      key={index}
                    />
                  );
                })
              : null}
          </tbody>
        </table>
        <div className="flex gap-5">
          <select
            id="product"
            className="w-3/5 p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
            name="product"
            onChange={onSetProduct}
            required
          >
            <option hidden defaultValue>
              Select Material
            </option>
            {materials
              .filter((material) => !material.isHidden)
              .filter((material) => {
                if (supplier && supplier.products) {
                  const existingProductsSet = new Set(
                    supplier.products.map(({ product }) => product._id)
                  );
                  return !existingProductsSet.has(material._id);
                }
                return true;
              })
              .map((material, index) => {
                return (
                  <option value={material._id} key={index}>
                    {material.name}
                  </option>
                );
              })}
          </select>
          <div className="flex w-2/5 items-center gap-2">
            <p>₱</p>
            <input
              defaultValue="0"
              className=" w-full p-3 mr-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
              name="price"
              type="text"
              required
              onChange={onSetProduct}
            />
          </div>
        </div>
        {name ? (
          <PrimaryButton
            onClick={onAddProduct}
            className="w-full"
            name={`Add ${name}'s Product`}
          />
        ) : null}
      </div>
      <PrimaryButton
        onClick={supplierId ? onUpdateSupplier : onCreateSupplier}
        name={supplierId ? "Update Supplier" : "Create Supplier"}
      />
    </>
  );
};
