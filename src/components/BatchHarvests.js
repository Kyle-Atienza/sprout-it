import React, { useEffect, useState, useRef } from "react";

export const BatchHarvests = ({ selectedBatch }) => {
  const recordWeightInput = useRef([]);

  const editWeightInput = (refIndex) => {
    recordWeightInput.current.forEach((input) => {
      input.disabled = true;
    });
    recordWeightInput.current[refIndex].disabled = false;
  };

  return (
    <div>
      <table className="w-full text-sm text-left">
        <thead className=" poppins-paragraph ">
          <tr>
            <th scope="col" className="py-2">
              Date
            </th>
            <th scope="col" className="py-2">
              Weight
            </th>
            <th scope="col" className="py-2">
              Edit
            </th>
            <th scope="col" className="py-2">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedBatch.harvests.map((dailyHarvest, index) => {
            return (
              <tr
                className="transition-all duration-300 ease-in-out cursor-pointer"
                key={index}
              >
                <td className="py-2">
                  {new Date(dailyHarvest.createdAt).toDateString()}
                </td>
                <td className="py-2">
                  <input
                    disabled
                    ref={(ref) => (recordWeightInput.current[index] = ref)}
                    type="number"
                    defaultValue={dailyHarvest.weight}
                  />
                </td>
                <td>
                  <button onClick={() => editWeightInput(index)}>Edit</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
          {/* {Object.keys(groupedHarvests).map((harvestsPerDay, index) => {
            return (
              <tr
                className="transition-all duration-300 ease-in-out cursor-pointer"
                key={index}
              >
                <td className="py-2">{harvestsPerDay}</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={groupedHarvests[harvestsPerDay].reduce(
                      (total, harvest) => harvest.weight + total,
                      0
                    )}
                  />
                </td>
                <td>
                  <button>Edit</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
};
