import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { getBatches } from "../features/batch/batchSlice";
import {
  getDailyHarvests,
  mapHarvestsByTimeFrame,
} from "../features/harvest/harvestSlice";

export const AnalyticsInsights = () => {
  const dispatch = useDispatch();

  const { initialBatches, active, batches, finished } = useSelector(
    (state) => state.batch
  );
  const { daily: dailyHarvest } = useSelector((state) => state.harvest);

  const [harvestsByTimeRange, setHarvestsByTimeRange] = useState({
    days: [],
    weeks: [],
    months: [],
  });

  const [insights, setInsights] = useState([]);

  useEffect(() => {
    dispatch(getBatches());
  }, []);

  useEffect(() => {
    // console.log("getDailyHarvests");
    if (finished) {
      dispatch(getDailyHarvests(initialBatches));
    }
  }, [finished]);

  useEffect(() => {
    // console.log("mapHarvestsByTimeFrame");
    if (dailyHarvest.length) {
      Object.keys(harvestsByTimeRange).forEach((time) => {
        const dates = getDatesInRange(
          new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          new Date(Date.now()),
          time
        );

        setHarvestsByTimeRange((prevState) => ({
          ...prevState,
          [time]: dates.map((date, index) => {
            return {
              date: date,
              label:
                time === "months"
                  ? date.split("-").splice(0, 1).join(" ")
                  : date.split("-").splice(0, 2).join(" "),
              data: dailyHarvest
                .map((harvest) => {
                  console.log(
                    new Date(harvest.date).getTime() >=
                      new Date(dates[index]).getTime() &&
                      new Date(harvest.date).getTime() <
                        new Date(
                          dates[index + 1] ? dates[index + 1] : date
                        ).getTime()
                  );
                  if (
                    new Date(harvest.date).getTime() >=
                      new Date(dates[index]).getTime() &&
                    new Date(harvest.date).getTime() <
                      new Date(
                        dates[index + 1] ? dates[index + 1] : date
                      ).getTime()
                  ) {
                    return harvest.harvests;
                  }
                  return [];
                })
                .flat(),
            };
          }),
        }));
      });
    }
  }, [dailyHarvest]);

  useEffect(() => {
    if (batches.fruiting) {
      setInsights([
        ...batchesPastDaysHarvests().map((batch) => {
          let data = {
            show: "",
            message: "",
          };
          if (batch.daysWithHarvests > 5 || batch.totalHarvests < 25) {
            data.message = `Batch ${batch.batch} doesn't produce much harvest, check on its current condition`;
            data.show = true;
          } else {
            data.message = "";
            data.show = false;
          }
          return data;
        }),
      ]);
    }
  }, [batches]);

  // batch _ doesn't produce much harvest, check on its current condition

  const pastDays = (current, daysPast) => {
    return new Date(current.setDate(current.getDate() - daysPast));
  };

  const batchesPastDaysHarvests = () => {
    return batches.fruiting
      .map((batch) => {
        return {
          batch: batch.name,
          data: batch.harvests.filter((harvest) => {
            return (
              new Date(harvest.createdAt) >= pastDays(new Date(), 5) &&
              new Date(harvest.createdAt) < new Date()
            );
          }),
        };
      })
      .map((harvests) => {
        const totalHarvests = harvests.data.reduce((prev, currentHarvest) => {
          return currentHarvest.weight + prev;
        }, 0);
        return {
          batch: harvests.batch,
          daysWithHarvests: harvests.data.length,
          totalHarvests: totalHarvests,
        };
      });
  };

  const getDatesInRange = (startDate, endDate, range) => {
    let date;
    let interval;
    let end;

    // console.log(startDate, endDate, range);

    if (range === "days") {
      date = new Date(startDate.getTime());
      interval = 1;
      end = new Date(endDate.setDate(endDate.getDate() + 1));
    } else if (range === "weeks") {
      const day = new Date(startDate).getDay();
      const diff = new Date(startDate).getDate() - day + (day === 0 ? -6 : 1);

      date = new Date(new Date(startDate).setDate(diff));
      interval = 7;
      end = new Date(endDate.setDate(endDate.getDate() + 7));
    } else if (range === "months") {
      date = new Date(
        new Date(startDate).getFullYear(),
        new Date(startDate).getMonth(),
        1
      );
      end = new Date(endDate.setMonth(endDate.getMonth() + 1));
    }

    const dates = [];

    if (range === "days") {
      while (date <= end) {
        dates.push(new Date(date).toDateString().slice(4).replaceAll(" ", "-"));
        date.setDate(date.getDate() + interval);
      }
    } else if (range === "weeks") {
      while (date <= end) {
        dates.push(new Date(date).toDateString().slice(4).replaceAll(" ", "-"));
        date.setDate(date.getDate() + interval);
      }
    } else if (range === "months") {
      while (date <= end) {
        dates.push(new Date(date).toDateString().slice(4).replaceAll(" ", "-"));
        date.setMonth(date.getMonth() + 1);
      }
    }

    return dates;
  };

  return (
    <>
      {insights
        .filter((insight) => {
          return insight.show;
        })
        .map((insight, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-4 p-5 bg-white rounded-2xl"
            >
              <CaretUpFilled className="text-2xl text-primary-400" />
              <p className="poppins-paragraph-sm">{insight.message}</p>
            </div>
          );
        })}
    </>
  );
};
