import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditFilled, CheckCircleFilled } from "@ant-design/icons";
import {
  createHarvest,
  getHarvests,
  updateHarvest,
  resetHarvests,
} from "../features/harvest/harvestSlice";

import { PrimaryButton } from "../components";

export const HarvestForm = ({ selectedBatch, setIsBatchHarvestModalOpen }) => {
  const dispatch = useDispatch();

  const { batchHarvests } = useSelector((state) => state.harvest);

  const [todaysHarvest, setTodaysHarvest] = useState("");
  const [updatedHarvest, setUpdatedHarvest] = useState("");
  const [inputHarvest, setInputHarvest] = useState(false);

  const onSubmitHarvest = () => {
    if (!todaysHarvest) {
      dispatch(
        createHarvest({
          id: selectedBatch._id,
          payload: {
            weight: todaysHarvest,
          },
        })
      );
    } else {
      dispatch(
        updateHarvest({
          id: todaysHarvest._id,
          payload: {
            weight: updatedHarvest,
          },
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getHarvests(selectedBatch._id));

    return () => {
      dispatch(resetHarvests());
    };
  }, []);

  useEffect(() => {
    const todaysHarvest = batchHarvests.find((harvest) => {
      return (
        new Date(harvest.createdAt).toDateString() === new Date().toDateString()
      );
    });

    setTodaysHarvest(!!todaysHarvest ? todaysHarvest : 0);
    setUpdatedHarvest(!!todaysHarvest ? todaysHarvest.weight : 0);
  }, [batchHarvests]);

  return (
    <div>
      <p>Todays Harvests {todaysHarvest.weight} kg</p>
      <button onClick={() => setInputHarvest(!inputHarvest)}>
        {inputHarvest ? <CheckCircleFilled /> : <EditFilled />}
      </button>
      {inputHarvest ? (
        <>
          <input
            className="w-full p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400"
            id="todaysHarvest"
            name="todaysHarvest"
            type="number"
            required
            value={updatedHarvest}
            onChange={(e) => setUpdatedHarvest(e.target.value)}
            placeholder={!todaysHarvest ? 0 : null}
          />
          <PrimaryButton onClick={onSubmitHarvest} name="Submit Harvest" />
          <PrimaryButton
            onClick={() => setIsBatchHarvestModalOpen(true)}
            name="View All Harvest"
          />
        </>
      ) : null}
    </div>
  );
};
