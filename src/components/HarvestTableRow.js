import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { updateHarvest, deleteHarvest } from "../features/harvest/harvestSlice";
import { useDispatch, useSelector } from "react-redux";

export const HarvestTableRow = ({ harvest, row, editRow, setEditRow }) => {
  const dispatch = useDispatch();

  const [editHarvestInput, setEditHarvestInput] = useState(false);
  const [harvestInput, setHarvestInput] = useState();
  const harvestInputRef = useRef();

  const editHarvest = () => {
    setEditRow(row);
  };

  const cancelEdit = () => {
    setEditRow(-1);
    harvestInputRef.current.value = harvest.weight;
  };

  useEffect(() => {
    if (row === editRow) {
      setEditHarvestInput(true);
    } else {
      setEditHarvestInput(false);
    }
  }, [editRow]);

  const onUpdateHarvest = () => {
    dispatch(
      updateHarvest({
        id: harvest._id,
        payload: {
          weight: harvestInput,
        },
      })
    );
    setEditRow(-1);
  };

  return (
    <tr
      className={`transition-all duration-300 ease-in-out cursor-pointer bg-re ${
        row === editRow ? "bg-red-500" : " bg-primary-400"
      }`}
    >
      <td className="py-2">
        {new Date(harvest.createdAt).toDateString().slice(4)}
      </td>
      <td className="py-2">
        <input
          ref={harvestInputRef}
          disabled={!editHarvestInput}
          type="number"
          defaultValue={harvest.weight}
          onChange={(e) => setHarvestInput(e.target.value)}
        />
      </td>
      <td>
        {editHarvestInput ? (
          <button onClick={onUpdateHarvest}>Save</button>
        ) : (
          <button onClick={editHarvest}>Edit</button>
        )}
      </td>
      <td>
        {editHarvestInput ? (
          <button onClick={cancelEdit}>Cancel</button>
        ) : (
          <button>Delete</button>
        )}
      </td>
    </tr>
  );
};
