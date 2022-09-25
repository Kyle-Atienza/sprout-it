import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHarvest } from "../features/harvest/harvestSlice";
import { getBatches } from "../features/batch/batchSlice";

import { PrimaryButton } from "../components";

export const HarvestForm = ({ selectedBatch, setIsBatchHarvestModalOpen }) => {
  // TODO: update total harvest on submit

  const dispatch = useDispatch();

  const [weight, setWeight] = useState(0);
  const [total, setTotal] = useState(0);

  const onSubmitHarvest = () => {
    dispatch(
      createHarvest({
        batchId: selectedBatch._id,
        weight: weight,
      })
    );
    setWeight(0);
  };

  useEffect(() => {
    setTotal(selectedBatch.harvests.reduce((n, { weight }) => n + weight, 0));
  }, []);

  return (
    <div>
      <p>Total Harvests: {total} </p>
      <input
        className="w-full p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400"
        id="username"
        name="time"
        type="text"
        required
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Weight"
      />
      <PrimaryButton onClick={onSubmitHarvest} name="Submit Harvest" />
      <PrimaryButton
        onClick={() => setIsBatchHarvestModalOpen(true)}
        name="View All Harvest"
      />
    </div>
  );
};
