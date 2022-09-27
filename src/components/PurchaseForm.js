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
      <div className='mb-4'>
        <label className='block open-button' htmlFor='username'>
          Supplier
          <span className='text-red-600'>*</span>
        </label>
        <select
          id='supplier'
          className='w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
          name='supplier'
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
      </div>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='username'>
          Material
          <span className='text-red-600'>*</span>
        </label>
        <select
          id='material'
          className='w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
          name='material'
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
      </div>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='username'>
          Quantity <span className='text-red-600'>*</span>
        </label>
        <div className='flex justify-center items-center'>
          <input
            className='w-full p-3 mr-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
            name='quantity'
            type='number'
            onChange={onChange}
            required
          />
          <p className='open-paragraph'>kg/l</p>
        </div>
      </div>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='username'>
          Price per unit <span className='text-red-600'>*</span>
        </label>
        <div className='flex justify-center items-center'>
          <p className='open-paragraph'>₱</p>
          <input
            className='w-full p-3 ml-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
            name='price'
            type='number'
            onChange={onChange}
            required
          />
        </div>
      </div>
      <PrimaryButton onClick={submitPurchase} name='Submit Purchase' />
    </>
  );
};
