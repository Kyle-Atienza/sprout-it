import React from "react";
import {
  SideNavBar,
  TopNavBar,
  AnalyticsHarvestByTime,
  AnalyticsSubstrateBatch,
  AnalyticsInsights,
} from "../components";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBatches } from "../features/batch/batchSlice";
import { Bar, Line } from "react-chartjs-2";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
import { Chart, registerables } from "chart.js";
import { getMaterials } from "../features/inventory/inventorySlice";
Chart.register(...registerables);

export const Analytics = () => {
  const dispatch = useDispatch();

  const { finished } = useSelector((state) => state.batch);

  useEffect(() => {
    dispatch(getBatches());
    dispatch(getMaterials());
  }, []);

  const getBatchHarvestSum = (batch) => {
    return batch.harvests.reduce((prev, current) => {
      return prev + current.weight;
    }, 0);
  };

  const chartHarvestCostData = {
    labels: finished.map((batch) => "Batch" + batch.name),
    datasets: [
      {
        label: "Batch Cost (₱)",
        backgroundColor: "#7C6A50",
        type: "line",
        data: finished.map((batch) => {
          return batch.value;
        }),
      },
      {
        label: "Batch Harvests (₱)",
        backgroundColor: "#8ABD70",
        data: finished.map((batch) => {
          return getBatchHarvestSum(batch) * 30;
        }),
      },
    ],
  };

  const lineData = {
    labels: [
      "Batch 1",
      "Batch 2",
      "Batch 3",
      "Batch 4",
      "Batch 5",
      "Batch 6",
      "Batch 7",
      "Batch 8",
      "Batch 9",
    ],
    datasets: [
      {
        label: "Defective Fruiting Bags",
        fill: true,
        data: [22, 9, 19, 21, 20, 15, 9, 7, 13],
        borderColor: "#DA5F5F",
        backgroundColor: "#DA5F5F",
      },
      {
        label: "Fruiting Bags Produces",
        fill: true,
        data: [125, 110, 120, 131, 116, 189, 210, 153, 158],
        borderColor: "#8ABD70",
        backgroundColor: "#8ABD70",
      },
    ],
  };

  return (
    <>
      <div className="flex flex-row w-screen">
        <div className="w-0 lg:w-1/6">
          <SideNavBar />
        </div>
        <div className="flex flex-col w-full lg:w-5/6 min-h-screen">
          <div className="w-full">
            <TopNavBar pageName="Reports" />
          </div>
          <div className="charts d-flex flex-col">
            <div className="flex flex-col m-5 gap-5 w-full h-[40vh] lg:flex-row">
              <div className="p-4 md:p-6 lg:p-12 w-full lg:w-1/2 bg-white rounded-3xl shadow">
                <AnalyticsSubstrateBatch compareHarvestDefects />
              </div>

              <div className="p-5 w-1/2 bg-secondary-100 rounded-3xl shadow flex flex-col gap-4 overflow-y-scroll">
                <AnalyticsInsights />
              </div>
            </div>
            <div className="flex m-5 gap-5 flex-col">
              <AnalyticsHarvestByTime />
            </div>
            <div className="flex m-5 gap-5">
              <div className="p-12 w-full bg-white rounded-3xl shadow">
                <Bar
                  data={chartHarvestCostData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Batch Cost",
                        fontSize: 20,
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="flex m-5 gap-5">
              <div className="p-12 w-3/5 bg-white rounded-3xl shadow">
                <Line
                  data={lineData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Fruiting Bags to Defects Ratio",
                        fontSize: 20,
                      },
                    },
                  }}
                />
              </div>
              <div className="p-12 w-2/5 bg-white rounded-3xl shadow">
                <AnalyticsSubstrateBatch harvests />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
