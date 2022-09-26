import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSuppliers } from "../features/supplier/SupplierSlice";
import { getMaterials } from "../features/inventory/inventorySlice";
import { createPurchase } from "../features/financial/financialSlice";

import { PrimaryButton } from "../components";

export const PurchaseForm = () => {
  const dispatch = useDispatch();

  const { suppliers } = useSelector((state) => state.supplier);
  const { materials } = useSelector((state) => state.inventory);

  const [purchaseData, setPurchaseData] = useState({});

  useEffect(() => {
    dispatch(getSuppliers());
    dispatch(getMaterials());
  }, []);

  const onChange = (e) => {
    setPurchaseData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
      <select
        id="supplier"
        className="w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
        name="supplier"
        onChange={onChange}
        required
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
      </select>
      <select
        id="material"
        className="w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
        name="material"
        onChange={onChange}
        required
      >
        <option hidden defaultValue>
          Select Material
        </option>
        {materials.map((material, index) => {
          return (
            <option value={material._id} key={index}>
              {material.name}
            </option>
          );
        })}
      </select>
      <input
        onChange={onChange}
        name="quantity"
        placeholder="quantity"
        type="number"
      />
      <input
        onChange={onChange}
        name="price"
        placeholder="price"
        type="number"
      />
      <PrimaryButton onClick={submitPurchase} name="Submit Purchase" />
    </>
  );
};
