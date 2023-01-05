import React, { useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../components";
import {
  getDailyHarvests,
  mapHarvestsByTimeFrame,
} from "../features/harvest/harvestSlice";
import { getBatchById } from "../features/batch/batchSlice";
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
  const [isChartScrollable, setIsChartScrollable] = useState({
    older: true,
    newer: false,
  });

  const { days, weeks, months } = harvestsByTimeRange;

  const colors = [];

  const chartHarvestData = {
    labels: chartHarvestDates.map((date) => date.label),
    datasets: [
      {
        label: "Total Harvests",
        data: chartHarvestDates.map((date) => {
          // console.log(date);

          return date.data.reduce((prev, curr) => {
            return prev + curr.weight;
          }, 0);
        }),
      },
      ...Object.values(
        chartHarvestDates.reduce((batchHarvests, { data }) => {
          data.forEach((dailyHarvest) => {
            const batchName = initialBatches.find(
              (batch) => batch._id === dailyHarvest.batch
            ).name;
            if (!batchHarvests[batchName]) {
              batchHarvests[batchName] = {
                label: `Batch ${batchName} Harvests`,
                data: [],
              };
            }
            if (batchHarvests[batchName]) {
              batchHarvests[batchName].data.push(
                data.find(
                  (harvest) =>
                    harvest.batch === dailyHarvest.batch &&
                    harvest.harvestedAt === dailyHarvest.harvestedAt
                ).weight
              );
            }
          });
          return batchHarvests;
        }, {})
      ),
    ],
  };

  useEffect(() => {
    const batchesHarvest = chartHarvestDates.reduce(
      (batchHarvests, { data }) => {
        data.forEach((dailyHarvest) => {
          if (
            !batchHarvests.find(
              (batchHarvest) => batchHarvest.batch === dailyHarvest.batch
            )
          ) {
            batchHarvests.push({
              batch: dailyHarvest.batch,
              label: "",
              data: [],
            });
          }
        });
        return batchHarvests;
      },
      []
    );
    chartHarvestDates.forEach((dailyHarvest) => {
      batchesHarvest.forEach((batchHarvest) => {
        const currentBatch = batchHarvest.batch;
        const currentBatchHarvest = dailyHarvest.data
          .filter(({ batch }) => batch === currentBatch)
          .map((harvest) => {
            console.log(harvest);
            return harvest.weight;
          })
          .reduce((total, harvest) => total + harvest, 0);
        // console.log(currentBatch, currentBatchHarvest, dailyHarvest);
        batchHarvest.data.push(currentBatchHarvest);
      });
    });
  }, [chartHarvestDates]);

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
      if (isChartScrollable.older)
        setChartHarvestDatePage(chartHarvestDatePage + 1);
      setIsChartScrollable({
        newer: true,
        older: !!chunkHarvestsByTimeRange(
          harvestsByTimeRange,
          chartHarvestDateRange,
          chartHarvestDatePage + 2
        ).length,
      });
    } else if (direction === "newer") {
      setChartHarvestDatePage(
        chartHarvestDatePage !== 0 ? chartHarvestDatePage - 1 : 0
      );
      setIsChartScrollable({
        ...isChartScrollable,
        newer: chartHarvestDatePage > 1,
      });
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

    let chunkedHarvests;

    try {
      chunkedHarvests = [
        ..._.chunk([...harvests[range]].reverse(), group)[page],
      ].reverse();
      chunkedHarvests.pop();
    } catch (error) {
      chunkedHarvests = [];
    }

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
        <SecondaryButton
          className={`${!isChartScrollable.older ? "opacity-50" : ""}`}
          onClick={() => scrollTimeRange("older")}
          name="<"
        />
        <SecondaryButton
          className={`${!isChartScrollable.newer ? "opacity-50" : ""}`}
          onClick={() => scrollTimeRange("newer")}
          name=">"
        />
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
              fontSize: 24,
            },
            colors: {
              forceOverride: true,
            },
          },
        }}
      />
    </div>
  );
};
