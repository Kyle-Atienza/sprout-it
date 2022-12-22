import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { HarvestTableRow } from "./HarvestTableRow";

export const HarvestTable = () => {
  const { batchHarvests } = useSelector((state) => state.harvest);

  const [editRow, setEditRow] = useState(null); //index of currently edited row

  useEffect(() => {
    /* if (batchHarvests) {
      console.log(
        batchHarvests.sort((a, b) => {
          if (
            new Date(a.harvestedAt).getTime() <
            new Date(b.harvestedAt).getTime()
          )
            return -1;
          if (
            new Date(a.harvestedAt).getTime() >
            new Date(b.harvestedAt).getTime()
          )
            return 1;
          return 0;
        })
      );
    } */
  }, []);

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
          {batchHarvests
            /* .sort((a, b) => {
              console.log(!!new Date(b.harvestedAt), !!new Date(a.harvestedAt));
              return new Date(b.harvestedAt) - new Date(a.harvestedAt);
            }) */
            .map((dailyHarvest, index) => {
              // console.log(new Date(dailyHarvest.harvestedAt).getTime());
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
