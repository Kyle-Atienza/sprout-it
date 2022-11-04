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
import { Chart, registerables } from "chart.js";
import { getMaterials } from "../features/inventory/inventorySlice";
import {
  getDailyHarvests,
  mapHarvestsByTimeFrame,
} from "../features/harvest/harvestSlice";
Chart.register(...registerables);

export const Analytics = () => {
  const dispatch = useDispatch();

  const { finished, initialBatches } = useSelector((state) => state.batch);
  const { dailyHarvests } = useSelector((state) => state.harvest);

  useEffect(() => {
    dispatch(getBatches());
    dispatch(getMaterials());
  }, []);

  useEffect(() => {
    if (finished) {
      dispatch(getDailyHarvests(initialBatches));
    }
  }, [finished]);

  useEffect(() => {
    // console.log("mapHarvestsByTimeFrame");
    if (dailyHarvests.length) {
      dispatch(mapHarvestsByTimeFrame(dailyHarvests));
    }
  }, [dailyHarvests]);

  const getBatchHarvestSum = (batch) => {
    return batch.harvests.reduce((prev, current) => {
      return prev + current.weight;
    }, 0);
  };

  const chartHarvestCostData = {
    labels: finished.map((batch) => "Batch" + batch.name),
    datasets: [
      {
        label: "Batch Cost",
        backgroundColor: "#BCDEA2",
        data: finished.map((batch) => {
          return batch.value;
        }),
      },
      {
        label: "Batch Harvests",
        backgroundColor: "#A29072",
        data: finished.map((batch) => {
          return getBatchHarvestSum(batch) * 30;
        }),
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
            <TopNavBar pageName="Analytics" />
          </div>
          <div className="charts d-flex flex-col mx-10 mt-16">
            <div className="flex flex-col gap-0 lg:gap-5 lg:flex-row">
              <div className="p-4 md:p-6 lg:p-12 w-full lg:w-1/2 bg-white rounded-3xl shadow">
                <AnalyticsSubstrateBatch compareHarvestDefects />
              </div>

              <div className=" w-full lg:w-1/2 flex flex-col gap-4 overflow-y-scroll scrollbar-hidden">
                <h2 className="poppins-heading-6 text-dark-500 mt-6 lg:mt-0">Insights</h2>
                <AnalyticsInsights />
              </div>
            </div>
            <div className="flex gap-5 flex-col mt-6">
              <AnalyticsHarvestByTime />
            </div>
            <div className="flex gap-5 my-6">
              <div className="p-4 md:p-6 lg:p-12 w-full bg-white rounded-3xl shadow">
                <Bar
                  data={chartHarvestCostData}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                      },
                    },
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Costs & Harvests per Batch",
                        fontSize: 20,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
