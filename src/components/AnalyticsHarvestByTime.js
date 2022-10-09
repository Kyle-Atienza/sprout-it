import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../components";
import { getDailyHarvests } from "../features/harvest/harvestSlice";
import { useSelector, useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import _ from "lodash";
Chart.register(...registerables);

export const AnalyticsHarvestByTime = () => {
  const dispatch = useDispatch();

  const { finished } = useSelector((state) => state.batch);
  const { daily: dailyHarvest } = useSelector((state) => state.harvest);

  const [chartHarvestDates, setChartHarvestDates] = useState([]);
  const [chartHarvestDateRange, setChartHarvestDateRange] = useState("days");
  const [chartHarvestDatePage, setChartHarvestDatePage] = useState(0);

  const chartHarvestData = {
    labels: chartHarvestDates.map((date) =>
      date.date.split("-").splice(0, 2).join(" ")
    ),
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
      dispatch(getDailyHarvests(finished));
    }
  }, [finished]);

  useEffect(() => {
    if (dailyHarvest.length) {
      const dates = getDatesInRange(
        new Date(dailyHarvest[0].date),
        new Date(dailyHarvest[dailyHarvest.length - 1].date),
        chartHarvestDateRange
      )[chartHarvestDatePage];

      setChartHarvestDates(
        dates.map((date, index) => {
          return {
            date: date,
            data: dailyHarvest
              .filter((harvest) => {
                // TODO: condition is still not perfect
                return (
                  harvest.date >= date &&
                  harvest.date < (dates[index + 1] ? dates[index + 1] : date)
                );
              })
              .map((harvest) => harvest.harvests)
              .flat(),
          };
        })
      );
    }
  }, [dailyHarvest, chartHarvestDateRange, chartHarvestDatePage]);

  const getDatesInRange = (startDate, endDate, range) => {
    let date;
    let interval;
    let groups;

    if (range === "days") {
      date = new Date(startDate.getTime());
      interval = 1;
      groups = 30;
    } else if (range === "weeks") {
      const day = new Date(startDate).getDay();
      const diff = new Date(startDate).getDate() - day + (day === 0 ? -6 : 1);

      date = new Date(new Date(startDate).setDate(diff));
      interval = 7;
      groups = 8;
    } else if (range === "months") {
      date = new Date(
        new Date(startDate).getFullYear(),
        new Date(startDate).getMonth(),
        1
      );
      groups = 12;
    }

    const dates = [];

    if (range !== "months") {
      while (date <= endDate) {
        dates.push(new Date(date).toDateString().slice(4).replaceAll(" ", "-"));
        date.setDate(date.getDate() + interval);
      }

      return _.chunk(dates, groups).reverse();
    } else {
      while (date <= endDate) {
        dates.push(new Date(date).toDateString().slice(4).replaceAll(" ", "-"));
        date.setMonth(date.getMonth() + 1);
      }

      return _.chunk(dates.reverse(), groups).map((months) => months.reverse());
    }
  };

  return (
    <div className="p-12 w-full bg-white rounded-3xl shadow">
      <PrimaryButton
        onClick={() => setChartHarvestDateRange("days")}
        name="days"
      />
      <PrimaryButton
        onClick={() => setChartHarvestDateRange("weeks")}
        name="weeks"
      />
      <PrimaryButton
        onClick={() => setChartHarvestDateRange("months")}
        name="months"
      />
      <PrimaryButton
        onClick={() => setChartHarvestDatePage(chartHarvestDatePage + 1)}
        name="-"
      />
      <PrimaryButton
        onClick={() =>
          setChartHarvestDatePage(
            chartHarvestDatePage !== 0 ? chartHarvestDatePage - 1 : 0
          )
        }
        name="+"
      />
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
