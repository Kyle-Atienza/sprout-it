import { React, useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { PrimaryButton, TextField } from ".";
import { useDispatch, useSelector } from "react-redux";
import {
  getMaterials,
  postMaterial,
  putMaterial,
} from "../features/inventory/inventorySlice";

export const AddExistingMaterialForm = () => {
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

  const onSubmitExistingMaterial = (e) => {
    e.preventDefault();
    // console.log(selectedMaterial._id);
    dispatch(
      putMaterial({
        id: selectedMaterial._id,
        data: {
          ...materialData,
        },
      })
    );
    dispatch(getMaterials);
    window.location.reload();
  };

  return (
    <form onSubmit={onSubmitExistingMaterial}>
      <div className="mb-4">
        <label className="block open-button" htmlFor="username">
          Material name
          <span className="text-red-600">*</span>
        </label>
        <select
          id="material"
          className="w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
          onChange={onChange}
          name="material"
          required
        >
          <option hidden defaultValue>
            Select material
          </option>
          {materials
            .filter((material) => !material.isHidden)
            .map((material, index) => {
              return (
                <option value={material._id} key={index}>
                  {material.name}
                </option>
              );
            })}
        </select>
      </div>
      {/* <div className='mb-4'>
              <label className='block open-button' htmlFor='username'>
                Unit
              </label>
              <TextField // Show unit from existing material here
                className='w-full open-paragraph-sm my-0'
                id='unit'
                type='text'
                name='name'
                //ref={scope => { this.target.value = scope.unit; }}
                value={materialData.unit}
                onChange={(e) => setMaterialData(e.target.value)}
              />
            </div> */}
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
          <p className="open-paragraph">kg/l</p>
        </div>
      </div>
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
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <PrimaryButton
          name="Add to Inventory"
          className="mt-4"
          onClick={onSubmitExistingMaterial}
        >
          <input type="submit" value="Submit" />
        </PrimaryButton>
      </div>
    </form>
  );
};
