import React, { useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../components";
import {
  getDailyHarvests,
  mapHarvestsByTimeFrame,
} from "../features/harvest/harvestSlice";
import { useSelector, useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import _ from "lodash";
Chart.register(...registerables);

export const AnalyticsHarvestByTime = () => {
  const dispatch = useDispatch();

  const { finished, initialBatches } = useSelector((state) => state.batch);
  const { dailyHarvests, harvestsByTimeRange } = useSelector(
    (state) => state.harvest
  );

  const [chartHarvestDates, setChartHarvestDates] = useState([]);
  const [chartHarvestDateRange, setChartHarvestDateRange] = useState("days");
  const [chartHarvestDatePage, setChartHarvestDatePage] = useState(0);

  const { days, weeks, months } = harvestsByTimeRange;

  const chartHarvestData = {
    labels: chartHarvestDates.map((date) => date.label),
    datasets: [
      {
        label: "Batch Harvests",
        backgroundColor: "#BCDEA2",
        data: chartHarvestDates.map((date) =>
          date.data.reduce((prev, curr) => {
            return prev + curr.weight;
          }, 0)
        ),
      },
    ],
  };

  useEffect(() => {
    if (finished) {
      dispatch(getDailyHarvests(initialBatches));
    }
  }, [finished]);

  useEffect(() => {
    if (dailyHarvests) {
      dispatch(mapHarvestsByTimeFrame(dailyHarvests));
    }

    if (days.length && weeks.length && months.length) {
      setChartHarvestDates(
        chunkHarvestsByTimeRange(
          harvestsByTimeRange,
          chartHarvestDateRange,
          chartHarvestDatePage
        )
      );
    }
  }, [dailyHarvests, chartHarvestDateRange, chartHarvestDatePage]);

  const scrollTimeRange = (direction) => {
    if (direction === "older") {
      setChartHarvestDatePage(chartHarvestDatePage + 1);
    } else if (direction === "newer") {
      setChartHarvestDatePage(
        chartHarvestDatePage !== 0 ? chartHarvestDatePage - 1 : 0
      );
    }
  };

  const chunkHarvestsByTimeRange = (harvests, range, page) => {
    let group;
    if (range === "days") {
      group = 15;
    } else if (range === "weeks") {
      group = 8;
    } else if (range === "months") {
      group = 12;
    }

    const chunkedHarvests = [
      ..._.chunk([...harvests[range]].reverse(), group)[page],
    ].reverse();
    chunkedHarvests.pop();
    return chunkedHarvests;
  };

  return (
    <div className="p-4 md:p-6 lg:p-12 w-full bg-white rounded-3xl shadow">
      <div className="flex flex-wrap gap-2">
        <SecondaryButton
          onClick={() => setChartHarvestDateRange("days")}
          name="days"
        />
        <SecondaryButton
          onClick={() => setChartHarvestDateRange("weeks")}
          name="weeks"
        />
        <SecondaryButton
          onClick={() => setChartHarvestDateRange("months")}
          name="months"
        />
        <SecondaryButton onClick={() => scrollTimeRange("older")} name="<" />
        <SecondaryButton onClick={() => scrollTimeRange("newer")} name=">" />
      </div>

      <Bar
        data={chartHarvestData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Harvests by Time",
              fontSize: 20,
            },
          },
        }}
      />
    </div>
  );
};
