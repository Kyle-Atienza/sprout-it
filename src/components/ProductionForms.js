import { React, useEffect } from "react";
import { PrimaryButton, TextField } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { createBatch } from "../features/batch/batchSlice";
import { useState } from "react";

export const PreProductionForm = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const { materials } = useSelector((state) => state.inventory);
  const { isError, isLoading, message } = useSelector((state) => state.batch);

  useEffect(() => {
    if (isError && !isLoading) {
      alert(message.response);
    }
  }, [isLoading, isError, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.role === "owner") {
      dispatch(
        createBatch({
          materials: Object.keys(formData).map((materialInput) => {
            return {
              material: materials.find((materialItem) => {
                return materialItem.name === materialInput;
              })._id,
              weight: formData[materialInput],
            };
          }),
        })
      );
    } else {
      alert("Restricted to Owner Only");
    }
  };

  return (
    <div>
      <h3 className="poppins-heading-6">Pre-Production</h3>
      <form className="flex flex-col mt-8">
        {materials.map((material) => {
          return (
            <div
              className="w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center"
              key={material.name}
            >
              <p className="open-paragraph font-semibold w-full md:w-1/3">
                {material.name} ({material.unit})
              </p>
              <TextField
                value={formData[material.id]}
                type="number"
                name={material.name}
                id="dayami-kg"
                placeholder="0"
                className="w-full md:w-2/3"
                onChange={onChange}
              />
            </div>
          );
        })}
        <PrimaryButton
          disabled={Object.keys(formData).length === 0}
          className="mt-8"
          name="Start Production"
          onClick={onSubmit}
        >
          <input type="submit" value="Submit" />
        </PrimaryButton>
      </form>
    </div>
  );
};
