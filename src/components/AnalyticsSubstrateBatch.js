import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBatches } from "../features/batch/batchSlice";
import { getMaterials } from "../features/inventory/inventorySlice";

import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export const AnalyticsSubstrateBatch = ({
  compareHarvestDefects,
  harvests,
}) => {
  const dispatch = useDispatch();

  const { finished, substrate } = useSelector((state) => state.batch);

  const { kusot, dayami, mixed } = substrate;
  const [kusotBatch, setKusotBatch] = useState([]);
  const [dayamiBatch, setDayamiBatch] = useState([]);
  const [mixedBatch, setMixedBatch] = useState([]);

  useEffect(() => {
    dispatch(getBatches());
    dispatch(getMaterials());
  }, []);

  useEffect(() => {
    if (kusot) {
      setKusotBatch(kusot.filter((batch) => !batch.active));
    }
    if (dayami) {
      setDayamiBatch(dayami.filter((batch) => !batch.active));
    }
    if (mixed) {
      setMixedBatch(mixed.filter((batch) => !batch.active));
    }
  }, [kusot, dayami, mixed]);

  const getBatchesHarvestSum = (batches) => {
    return batches.reduce((prev, current) => {
      return (
        prev +
        current.harvests.reduce((prev, current) => {
          return prev + current.weight;
        }, 0)
      );
    }, 0);
  };

  const getDefectsSum = (batch) => {
    let defectsSum = 0;
    const defectedPhase = Object.keys(batch).filter(
      (key) => batch[key].defects
    );
    defectedPhase.forEach((phase) => {
      defectsSum += batch[phase].defects;
    });
    return defectsSum;
  };

  const getBatchesDefectsSum = (batches) => {
    return batches.reduce((prev, current) => {
      return prev + getDefectsSum(current);
    }, 0);
  };

  const chartCompareHarvestDefects = {
    labels: ["Kusot", "Dayami", "Mixed"],
    datasets: [
      {
        label: "Total Harvests",
        backgroundColor: "#BCDEA2",
        data: [
          getBatchesHarvestSum(kusotBatch),
          getBatchesHarvestSum(dayamiBatch),
          getBatchesHarvestSum(mixedBatch),
        ],
      },
      {
        label: "Total Defects",
        backgroundColor: "#A29072",
        data: [
          getBatchesDefectsSum(kusotBatch),
          getBatchesDefectsSum(dayamiBatch),
          getBatchesDefectsSum(mixedBatch),
        ],
      },
    ],
  };

  const chartHarvests = {
    labels: ["Kusot", "Dayami", "Mix"],
    datasets: [
      {
        label: "Yield Percentage for Substrate Type",
        fill: true,
        data: [
          getBatchesHarvestSum(kusotBatch),
          getBatchesHarvestSum(dayamiBatch),
          getBatchesHarvestSum(mixedBatch),
        ],
        backgroundColor: ["#FC9035", "#4C8989", "#ADE3E5"],
      },
    ],
  };

  if (compareHarvestDefects) {
    return (
      <Bar
        data={chartCompareHarvestDefects}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Monthly Harvest per Substrate",
              fontSize: 20,
            },
          },
        }}
      />
    );
  } else if (harvests) {
    return (
      <Doughnut
        data={chartHarvests}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Yield Percentage per Substrate",
              fontSize: 20,
            },
          },
        }}
      />
    );
  }
};
