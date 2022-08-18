import { React } from "react";
import { PrimaryButton, TextField } from "../components";
import { batch, useDispatch, useSelector } from "react-redux";
import {
  createBatch,
  getBatches,
  setMaterials,
} from "../features/batch/batchSlice";
import { useState } from "react";
import { useEffect } from "react";

export const PreProductionForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    dayami: "",
    kusot: "",
    darakMixed: "",
    darakPino: "",
    asukal: "",
    tubig: "",
    apog: "",
  });

  const { dayami, kusot, darakMixed, darakPino, asukal, tubig, apog } =
    formData;
  const { initialBatches, isSuccess } = useSelector((state) => state.batch);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    dispatch(createBatch({}));
    window.location.reload();

    /* 

    console.log(batch.id); */

    /* const mappedMaterials = Object.keys(formData).filter()

    mappedMaterials.forEach((material) => {
      console.log({
        batchId: batch.id,
        ...material,
      });
      dispatch(
        setMaterials({
          batchId: "62f8e0f3a5fb29eb7f5a2372",
          ...material,
        })
      );
    });

    dispatch(getBatches()); */

    /* 

    
    console.log(mappedMaterials); */

    // if form has data
    // get id of latest batch
    // update/insert batch with materials
  };

  useEffect(() => {
    // dispatch(getBatches());
  }, [dispatch]);

  /* useEffect(() => {
    console.log(initialBatches[initialBatches.length - 1]);
    const batchId = initialBatches[initialBatches.length - 1]._id;
    const mappedMaterials = Object.keys(formData).map((material) => {
      return {
        name: material,
        weight: formData[material],
      };
    });
    mappedMaterials.forEach((material) => {
      console.log({
        batchId: batchId,
        ...material,
      });
      // dispatch(addMaterial({batchId}))
    });
  }, [initialBatches, isSuccess]); */

  return (
    <div>
      <h3 className="poppins-heading-6">Pre-Production</h3>
      <form className="flex flex-col mt-8">
        <div className="w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center">
          <p className="open-paragraph font-semibold w-1/3">Dayami (kg)</p>
          <TextField
            value={dayami}
            type="text"
            name="dayami"
            id="dayami-kg"
            placeholder="0"
            className="w-full md:w-2/3"
            onChange={onChange}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center">
          <p className="open-paragraph font-semibold w-1/3">Kusot (kg)</p>
          <TextField
            value={kusot}
            type="text"
            name="kusot"
            id="kusot-kg"
            placeholder="0"
            className="w-full md:w-2/3"
            onChange={onChange}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center">
          <p className="open-paragraph font-semibold w-1/3">Darak Mixed (kg)</p>
          <TextField
            value={darakMixed}
            type="text"
            name="darakMixed"
            id="darak-kg"
            placeholder="0"
            className="w-full md:w-2/3"
            onChange={onChange}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center">
          <p className="open-paragraph font-semibold w-1/3">Darak Pino (kg)</p>
          <TextField
            value={darakPino}
            type="text"
            name="darakPino"
            id="darak-kg"
            placeholder="0"
            className="w-full md:w-2/3"
            onChange={onChange}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center">
          <p className="open-paragraph font-semibold w-1/3">Asukal (kg)</p>
          <TextField
            value={asukal}
            type="text"
            name="asukal"
            id="asukal-kg"
            placeholder="0"
            className="w-full md:w-2/3"
            onChange={onChange}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center">
          <p className="open-paragraph font-semibold w-1/3">Tubig (ml)</p>
          <TextField
            value={tubig}
            type="text"
            name="tubig"
            id="tubig-ml"
            placeholder="0"
            className="w-full md:w-2/3"
            onChange={onChange}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center">
          <p className="open-paragraph font-semibold w-1/3">Apog (kg)</p>
          <TextField
            value={apog}
            type="text"
            name="apog"
            id="apog-kg"
            placeholder="0"
            className="w-full md:w-2/3"
            onChange={onChange}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row space-x-4 items-start md:items-center">
          <TextField
            value=""
            type="text"
            name="other"
            id="other"
            placeholder="Other"
            className="w-3/4"
            onChange={onChange}
          />
          <TextField
            value=""
            type="text"
            name="other-kg"
            id="other-kg"
            placeholder="0"
            className="w-1/4"
            onChange={onChange}
          />
        </div>
        <PrimaryButton
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
