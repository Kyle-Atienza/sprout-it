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

  // const [dates, setDates] = useState([]);
  let dates = [];
  const [chartHarvestDates, setChartHarvestDates] = useState([]);
  const [chartHarvestDateRange, setChartHarvestDateRange] = useState("days");
  const [chartHarvestDatePage, setChartHarvestDatePage] = useState(0);

  const chartHarvestData = {
    labels: chartHarvestDates.map((date) => date.label),
    datasets: [
      {
        label: "Batch Harvests",
        backgroundColor: "#8ABD70",
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
    if (dailyHarvests.length) {
      dispatch(mapHarvestsByTimeFrame(dailyHarvests));

      console.log(
        chunkHarvestsByTimeRange(harvestsByTimeRange, chartHarvestDateRange)
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dates = getDatesInRange(
        new Date(dailyHarvests[0].date),
        new Date(Date.now()),
        chartHarvestDateRange
      )[chartHarvestDatePage];

      setChartHarvestDates(() =>
        dates.map((date, index) => {
          return {
            date: date,
            label:
              chartHarvestDateRange === "months"
                ? date.split("-").splice(0, 1).join(" ")
                : date.split("-").splice(0, 2).join(" "),
            data: dailyHarvests
              .filter((harvest) => {
                return (
                  new Date(harvest.date).getTime() >=
                    new Date(dates[index]).getTime() &&
                  new Date(harvest.date).getTime() <
                    new Date(
                      dates[index + 1] ? dates[index + 1] : date
                    ).getTime()
                );
              })
              .map((harvest) => harvest.harvests)
              .flat(),
          };
        })
      );
    }
  }, [dailyHarvests, chartHarvestDateRange, chartHarvestDatePage]);

  const getDatesInRange = (startDate, endDate, range) => {
    let date;
    let interval;
    let groups;
    let end;

    if (range === "days") {
      date = new Date(startDate.getTime());
      interval = 1;
      groups = 15;
      end = new Date(endDate.setDate(endDate.getDate() + 1));
    } else if (range === "weeks") {
      const day = new Date(startDate).getDay();
      const diff = new Date(startDate).getDate() - day + (day === 0 ? -6 : 1);

      date = new Date(new Date(startDate).setDate(diff));
      interval = 7;
      groups = 8;
      end = new Date(endDate.setDate(endDate.getDate() + 7));
    } else if (range === "months") {
      date = new Date(
        new Date(startDate).getFullYear(),
        new Date(startDate).getMonth(),
        1
      );
      groups = 12;
      end = new Date(endDate.setMonth(endDate.getMonth() + 1));
    }

    const dates = [];

    if (range === "days") {
      while (date <= end) {
        dates.push(new Date(date).toDateString().slice(4).replaceAll(" ", "-"));
        date.setDate(date.getDate() + interval);
      }

      return _.chunk(dates, groups).reverse();
    } else if (range === "weeks") {
      while (date <= end) {
        dates.push(new Date(date).toDateString().slice(4).replaceAll(" ", "-"));
        date.setDate(date.getDate() + interval);
      }

      return _.chunk(dates.reverse(), groups).map((week) => week.reverse());
    } else if (range === "months") {
      while (date <= end) {
        dates.push(new Date(date).toDateString().slice(4).replaceAll(" ", "-"));
        date.setMonth(date.getMonth() + 1);
      }

      return _.chunk(dates.reverse(), groups).map((months) => months.reverse());
    }
  };

  const scrollTimeRange = (direction) => {
    if (direction === "older") {
      setChartHarvestDatePage(chartHarvestDatePage + 1);
    } else if (direction === "newer") {
      setChartHarvestDatePage(
        chartHarvestDatePage !== 0 ? chartHarvestDatePage - 1 : 0
      );
    }
  };

  const chunkHarvestsByTimeRange = (harvests, range) => {
    let group;
    if (range === "days") {
      group = 15;
    } else if (range === "weeks") {
      group = 8;
    } else if (range === "months") {
      group = 12;
    }
    _.chunk(harvests, group);
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
              text: "Batch Cost",
              fontSize: 20,
            },
          },
        }}
      />
    </div>
  );
};
