import React from "react";
import { SideNavBar, TopNavBar, PrimaryButton } from "../components";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getBatches,
  loadBatchesBySubstrate,
} from "../features/batch/batchSlice";
import _ from "lodash";
import { getDailyHarvests } from "../features/harvest/harvestSlice";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
import { Chart, registerables } from "chart.js";
import { getMaterials } from "../features/inventory/inventorySlice";
Chart.register(...registerables);

export const Analytics = () => {
  const dispatch = useDispatch();

  const { finished, substrate } = useSelector((state) => state.batch);
  const { daily: dailyHarvest } = useSelector((state) => state.harvest);

  const { kusot, dayami, mixed } = substrate;

  const [chartHarvestDates, setChartHarvestDates] = useState([]);
  const [chartHarvestDateRange, setChartHarvestDateRange] = useState("days");
  const [chartHarvestDatePage, setChartHarvestDatePage] = useState(0);

  useEffect(() => {
    dispatch(getBatches());
    dispatch(getMaterials());
  }, []);

  useEffect(() => {
    if (finished) {
      dispatch(loadBatchesBySubstrate());
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

  const getBatchHarvestSum = (batch) => {
    return batch.harvests.reduce((prev, current) => {
      return prev + current.weight;
    }, 0);
  };

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

  const barData = {
    labels: ["Kusot", "Dayami", "Mixed"],
    datasets: [
      {
        label: "Total Harvests",
        backgroundColor: "#8ABD70",
        data: [
          getBatchesHarvestSum(kusot),
          getBatchesHarvestSum(dayami),
          getBatchesHarvestSum(mixed),
        ],
      },
      {
        label: "Total Defects",
        backgroundColor: "#7C6A50",
        data: [
          getBatchesDefectsSum(kusot),
          getBatchesDefectsSum(dayami),
          getBatchesDefectsSum(mixed),
        ],
      },
    ],
  };

  const chartHarvestCostData = {
    labels: finished.map((batch) => "Batch" + batch.name),
    datasets: [
      {
        label: "Batch Cost",
        backgroundColor: "#7C6A50",
        type: "line",
        data: finished.map((batch) => {
          return batch.value;
        }),
      },
      {
        label: "Batch Harvests",
        backgroundColor: "#8ABD70",
        data: finished.map((batch) => {
          return getBatchHarvestSum(batch) * 30;
        }),
      },
    ],
  };

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

  const dougnutData = {
    labels: ["Kusot", "Dayami", "Mix"],
    datasets: [
      {
        label: "Yield Percentage for Substrate Type",
        fill: true,
        data: [
          getBatchesHarvestSum(kusot),
          getBatchesHarvestSum(dayami),
          getBatchesHarvestSum(mixed),
        ],
        backgroundColor: ["#FC9035", "#4C8989", "#ADE3E5"],
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
          <div className="charts d-flex flex-wrap">
            <div className="flex m-5 gap-5 h-[40vh]">
              <div className="p-12 w-1/2 bg-white rounded-3xl shadow">
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Monthly Harvest",
                        fontSize: 20,
                      },
                    },
                  }}
                />
              </div>
              <div className="p-5 w-1/2 bg-secondary-100 rounded-3xl shadow flex flex-col gap-4 overflow-y-scroll">
                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl">
                  <CaretUpFilled className="text-2xl text-primary-400" />
                  <p className="poppins-paragraph-sm">
                    10% more harvest from last batch
                  </p>
                </div>
                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl">
                  <CaretDownFilled className="text-2xl text-red-400" />
                  <p className="poppins-paragraph-sm">
                    Defect rose up to 9% from last production
                  </p>
                </div>
                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl">
                  <CaretUpFilled className="text-2xl text-primary-400" />
                  <p className="poppins-paragraph-sm">
                    Finished 3 batches from last month
                  </p>
                </div>
                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl">
                  <CaretUpFilled className="text-2xl text-primary-400" />
                  <p className="poppins-paragraph-sm">
                    10% more harvest from last batch
                  </p>
                </div>
              </div>
            </div>
            <div className="flex m-5 gap-5 flex-col">
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
                  onClick={() =>
                    setChartHarvestDatePage(chartHarvestDatePage + 1)
                  }
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
                <Doughnut
                  data={dougnutData}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
