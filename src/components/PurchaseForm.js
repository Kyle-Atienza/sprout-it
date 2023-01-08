import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSuppliers } from "../features/supplier/supplierSlice";
import { getMaterials } from "../features/inventory/inventorySlice";
import { createPurchase } from "../features/financial/financialSlice";

import { PrimaryButton } from "../components";

export const PurchaseForm = ({ openSupplierModal }) => {
  const dispatch = useDispatch();

  const { suppliers } = useSelector((state) => state.supplier);
  const { materials } = useSelector((state) => state.inventory);

  const [purchaseData, setPurchaseData] = useState({
    supplier: null,
    material: null,
    quantity: null,
    price: null,
  });
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [selectedMaterial, setSelectedMaterial] = useState();

  const selectSupplierRef = useRef();

  useEffect(() => {
    dispatch(getSuppliers());
    dispatch(getMaterials());
  }, []);

  useEffect(() => {
    if (purchaseData.supplier) {
      setSelectedSupplier(
        suppliers.find((supplier) => supplier._id === purchaseData.supplier)
      );
    }

    if (purchaseData.material) {
      setSelectedMaterial(
        selectedSupplier.products.find(({ product }) => {
          return product._id === purchaseData.material;
        })
      );
    }
  }, [purchaseData]);

  useEffect(() => {
    console.log(selectedMaterial);
    if (selectedMaterial)
      setPurchaseData((prevState) => ({
        ...prevState,
        price: selectedMaterial.price,
      }));
  }, [selectedMaterial]);

  const onChange = (e) => {
    if (e.target.name === "supplier") {
      setPurchaseData((prevState) => ({
        ...prevState,
        price: null,
      }));
    }

    if (e.target.name === "supplier" && e.target.value === "add") {
      openSupplierModal();
      selectSupplierRef.current.value = "";
    } else {
      setPurchaseData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitPurchase = () => {
    dispatch(
      createPurchase({
        materialId: purchaseData.material,
        supplierId: purchaseData.supplier,
        quantity: purchaseData.quantity,
        price: purchaseData.price,
      })
    );
  };

  return (
    <>
      <div className="mb-4">
        <label className="block open-button" htmlFor="username">
          Supplier
          <span className="text-red-600">*</span>
        </label>
        <select
          id="supplier"
          className="w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
          name="supplier"
          onChange={onChange}
          required
          ref={selectSupplierRef}
        >
          <option hidden defaultValue>
            Select Supplier
          </option>
          {suppliers.map((supplier, index) => {
            return (
              <option value={supplier._id} key={index}>
                {supplier.name}
              </option>
            );
          })}
          <option value="add">Add new Supplier</option>
        </select>
      </div>
      {selectedSupplier ? (
        <div className="mb-4">
          <label className="block open-button" htmlFor="username">
            Material
            <span className="text-red-600">*</span>
          </label>
          <select
            id="material"
            className="w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
            name="material"
            onChange={onChange}
            value={purchaseData.material}
            required
          >
            <option hidden defaultValue>
              Select Material
            </option>
            {selectedSupplier.products.map(({ product }, index) => {
              return (
                <option value={product._id} key={index}>
                  {product.name}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}
      {selectedSupplier ? (
        <div className="mb-4">
          <label className="block open-button" htmlFor="username">
            Price per unit <span className="text-red-600">*</span>
          </label>
          <div className="flex justify-center items-center">
            <p className="open-paragraph">₱</p>
            <input
              className="w-full p-3 ml-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
              name="price"
              type="number"
              required
              value={parseFloat(
                purchaseData.price ? purchaseData.price : 0
              ).toFixed(2)}
            />
          </div>
        </div>
      ) : null}
      <div className="mb-4">
        <label className="block open-button" htmlFor="username">
          Quantity <span className="text-red-600">*</span>
        </label>
        <div className="flex justify-center items-center">
          <input
            className="w-full p-3 mr-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
            name="quantity"
            type="number"
            onChange={onChange}
            required
          />
          <p className="open-paragraph">kg</p>
        </div>
      </div>

      <PrimaryButton onClick={submitPurchase} name="Submit Purchase" />
    </>
  );
};
