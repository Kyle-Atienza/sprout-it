import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { HarvestTableRow } from "./HarvestTableRow";

export const HarvestTable = () => {
  const { batchHarvests } = useSelector((state) => state.harvest);

  const [editRow, setEditRow] = useState(null); //index of currently edited row

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
          {/* sort rows by date */}
          {batchHarvests.map((dailyHarvest, index) => {
            return (
              <HarvestTableRow
                setEditRow={(rowIndex) => setEditRow(rowIndex)}
                editRow={editRow}
                row={index}
                harvest={dailyHarvest}
                key={index}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
