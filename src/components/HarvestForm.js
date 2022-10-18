import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import {
  createHarvest,
  getHarvests,
  updateHarvest,
  resetHarvests,
} from "../features/harvest/harvestSlice";

import { PrimaryButton, SecondaryButton } from "../components";

export const HarvestForm = ({ selectedBatch, setIsBatchHarvestModalOpen }) => {
  const dispatch = useDispatch();

  const { batchHarvests } = useSelector((state) => state.harvest);

  const [todaysHarvest, setTodaysHarvest] = useState({});
  const [updatedHarvest, setUpdatedHarvest] = useState("");
  const [inputHarvest, setInputHarvest] = useState(false);

  const onSubmitHarvest = () => {
    if (Object.keys(todaysHarvest).length === 0) {
      console.log(selectedBatch._id);
      dispatch(
        createHarvest({
          id: selectedBatch._id,
          payload: {
            weight: updatedHarvest,
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

    console.log(todaysHarvest);

    setTodaysHarvest(!!todaysHarvest ? todaysHarvest : {});
    setUpdatedHarvest(!!todaysHarvest ? todaysHarvest.weight : 0);
  }, [batchHarvests]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center mb-4">
        <p className="poppins-paragraph-sm">
          Today's Harvests: {todaysHarvest.weight ? todaysHarvest.weight : 0} kg
        </p>
        <button onClick={() => setInputHarvest(!inputHarvest)}>
          {inputHarvest ? <CheckCircleOutlined /> : <EditOutlined />}
        </button>
      </div>

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
          <div className="flex justify-between mb-4">
            <SecondaryButton
              onClick={() => setIsBatchHarvestModalOpen(true)}
              name="View All Harvest"
            />
            <PrimaryButton onClick={onSubmitHarvest} name="Submit Harvest" />
          </div>
        </>
      ) : null}
    </div>
  );
};
