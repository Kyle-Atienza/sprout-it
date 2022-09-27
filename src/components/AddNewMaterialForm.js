import { React, useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { PrimaryButton, TextField } from ".";
import { useDispatch, useSelector } from "react-redux";
import {
  getMaterials,
  postMaterial,
  putMaterial,
} from "../features/inventory/inventorySlice";

export const AddNewMaterialForm = () => {
  const dispatch = useDispatch();

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  const { materials } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getMaterials());
  }, [user, isSuccess, isLoading, isError, message, dispatch]);

  const [selectedMaterial, setSelectedMaterial] = useState({});
  const [materialData, setMaterialData] = useState({});

  const { id, name, altName, unit, quantity, price } = materialData;

  const onChange = (e) => {
    if (e.target.name === "material") {
      setSelectedMaterial(
        materials.find((material) => material.name === e.target.value)
      );
    } else {
      setMaterialData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmitNewMaterial = (e) => {
    e.preventDefault();
    dispatch(
      postMaterial({
        name: name,
        altName: altName,
        unit: unit,
        quantity: quantity,
        price: price,
      })
    );
    dispatch(getMaterials);
    window.location.reload();
  };

  return (
    <form onSubmit={onSubmitNewMaterial}>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='item-name'>
          Item name <span className='text-red-600'>*</span>
        </label>
        <TextField
          className='w-full open-paragraph-sm'
          id='material-name'
          type='text'
          name='name'
          value={materialData.name}
          onChange={onChange}
          placeholder='Name of new material'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='item-name'>
          Alternative Item Name
        </label>
        <TextField
          className='w-full open-paragraph-sm'
          id='material-altName'
          type='text'
          name='altName'
          value={materialData.altName}
          onChange={onChange}
          placeholder='Alternative name (optional)'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='username'>
          Unit <span className='text-red-600'>*</span>
        </label>
        <select
          id='material-unit'
          className='w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
          onChange={onChange}
          name='unit'
          required
        >
          <option hidden defaultValue>
            Select unit
          </option>
          <option value='kg'>kilogram (kg)</option>
          <option value='l'>liter (l)</option>
        </select>
      </div>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='username'>
          Quantity <span className='text-red-600'>*</span>
        </label>
        <TextField
          className='w-full open-paragraph-sm my-0'
          id='material-quantity'
          type='text'
          name='quantity'
          value={materialData.quantity}
          onChange={onChange}
          placeholder='0'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='username'>
          Price per unit <span className='text-red-600'>*</span>
        </label>
        <div className='flex justify-center items-center'>
          <p className='open-paragraph'>₱</p>
          <input
            className='w-full p-3 ml-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
            id='material-price'
            name='price'
            type='number'
            onChange={onChange}
            value={materialData.price}
            required
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <PrimaryButton
          name='Add to Inventory'
          className='mt-4'
          onClick={onSubmitNewMaterial}
        >
          <input type='submit' value='Submit' />
        </PrimaryButton>
      </div>
    </form>
  );
};
