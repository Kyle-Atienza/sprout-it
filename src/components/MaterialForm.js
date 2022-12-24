import { React, useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { PrimaryButton, TextField } from ".";
import { useDispatch, useSelector } from "react-redux";
import {
  getMaterials,
  postMaterial,
  putMaterial,
} from "../features/inventory/inventorySlice";

export const MaterialForm = ({ material, closeModal }) => {
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

  const { id, name, altName, unit } = materialData;

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

  const onSubmitNewMaterial = () => {
    console.log("create");

    dispatch(
      postMaterial({
        name: name,
        altName: altName,
        unit: unit,
      })
    );
    closeModal();
  };

  const onUpdateMaterial = () => {
    dispatch(
      putMaterial({
        id: material._id,
        payload: {
          ...materialData,
        },
      })
    );
  };

  return (
    <form onSubmit={onSubmitNewMaterial}>
      <div className="mb-4">
        <label className="block open-button" htmlFor="item-name">
          Item name <span className="text-red-600">*</span>
        </label>
        <TextField
          className="w-full open-paragraph-sm"
          id="material-name"
          type="text"
          name="name"
          defaultValue={material.name}
          onChange={onChange}
          placeholder="Name of new material"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block open-button" htmlFor="item-name">
          Alternative Item Name
        </label>
        <TextField
          className="w-full open-paragraph-sm"
          id="material-altName"
          type="text"
          name="altName"
          defaultValue={material.altName}
          onChange={(e) => onChange(e)}
          placeholder="Alternative name (optional)"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block open-button" htmlFor="username">
          Unit <span className="text-red-600">*</span>
        </label>
        <select
          id="material-unit"
          className="w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
          onChange={onChange}
          defaultValue={material.unit}
          name="unit"
          required
        >
          <option hidden defaultValue>
            Select unit
          </option>
          <option value="kg">kilogram (kg)</option>
          <option value="l">liter (l)</option>
        </select>
      </div>
      <div className="flex justify-end">
        {material.name ? (
          <PrimaryButton
            name="Update Material"
            className="mt-4"
            onClick={onUpdateMaterial}
          >
            <input type="submit" value="Submit" />
          </PrimaryButton>
        ) : (
          <PrimaryButton
            name="Add to Inventory"
            className="mt-4"
            onClick={onSubmitNewMaterial}
          >
            <input type="submit" value="Submit" />
          </PrimaryButton>
        )}
      </div>
    </form>
  );
};
