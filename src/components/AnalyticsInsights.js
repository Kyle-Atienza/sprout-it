import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import _ from "lodash";
import React, { useEffect } from "react";
import { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";

export const AnalyticsInsights = () => {
  // const dispatch = useDispatch();

  const { batches } = useSelector((state) => state.batch);
  const { harvestsByTimeRange } = useSelector((state) => state.harvest);

  const { days, weeks, months } = harvestsByTimeRange;

  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const initialInsights = [];

    if (batches.fruiting) {
      initialInsights.push(
        ...batchesPastDaysHarvests().map((batch) => {
          let data = {
            show: "",
            isGood: null,
            message: null,
          };
          if (batch.daysWithHarvests > 5 || batch.totalHarvests < 25) {
            data.message = `Batch ${batch.batch} doesn't produce much harvest, check on its current condition`;
            data.isGood = false;
            data.show = true;
          } else {
            data.message = "";
            data.isGood = false;
            data.show = false;
          }
          return data;
        })
      );
    }

    if (days.length && weeks.length && months.length) {
      if (
        !!getHarvestGrowthPercentage(days) &&
        !!getHarvestGrowthPercentage(weeks) &&
        !!getHarvestGrowthPercentage(months)
      ) {
        // wip
        const getHarvestGrowthInsight = (range) => {
          let rangeName;
          if (range === "days") {
            rangeName = "daily";
          } else if (range === "weeks") {
            rangeName = "weekly";
          } else if (range === "months") {
            rangeName = "monthly";
          }

          const harvestGrowthPercentage = getHarvestGrowthPercentage(range);

          if (harvestGrowthPercentage === -100) {
            return {
              show: true,
              isGood: false,
              message: "You still haven't harvested anything today",
            };
          } else {
            return {
              show: true,
              isGood: harvestGrowthPercentage > 0,
              message: `Your ${rangeName} harvest ${
                harvestGrowthPercentage > 0 ? "increased" : "decreased"
              } by ${harvestGrowthPercentage}%`,
            };
          }
        };

        initialInsights.push(
          {
            show: true,
            isGood: getHarvestGrowthPercentage(days) > 0,
            message: `Your daily harvest ${
              getHarvestGrowthPercentage(days) > 0 ? "increased" : "decreased"
            } by ${getHarvestGrowthPercentage(days)}%`,
          },
          {
            show: true,
            isGood: getHarvestGrowthPercentage(weeks) > 0,
            message: `Your weekly harvest ${
              getHarvestGrowthPercentage(weeks) > 0 ? "increased" : "decreased"
            } by ${getHarvestGrowthPercentage(weeks)}%`,
          },
          {
            show: true,
            isGood: getHarvestGrowthPercentage(months) > 0,
            message: `Your monthly harvest ${
              getHarvestGrowthPercentage(months) > 0 ? "increased" : "decreased"
            } by ${getHarvestGrowthPercentage(months)}%`,
          }
        );
      }
    }

    setInsights(initialInsights);
  }, [batches, harvestsByTimeRange]);

  /*  useEffect(() => {
    if (days.length && weeks.length && months.length) {
      if (
        !!getHarvestGrowthPercentage(days) &&
        !!getHarvestGrowthPercentage(weeks) &&
        !!getHarvestGrowthPercentage(months)
      ) {
        setInsights(
          _.uniqBy(
            [
              ...insights,
              {
                show: "true",
                message: `Your daily harvest ${
                  getHarvestGrowthPercentage(days) > 0
                    ? "increased"
                    : "decreased"
                } by ${getHarvestGrowthPercentage(days)}%`,
              },
              {
                show: "true",
                message: `Your weekly harvest ${
                  getHarvestGrowthPercentage(weeks) > 0
                    ? "increased"
                    : "decreased"
                } by ${getHarvestGrowthPercentage(weeks)}%`,
              },
              {
                show: "true",
                message: `Your monthly harvest ${
                  getHarvestGrowthPercentage(months) > 0
                    ? "increased"
                    : "decreased"
                } by ${getHarvestGrowthPercentage(months)}%`,
              },
            ],
            "message"
          )
        );
      }
    }
  }, [harvestsByTimeRange]); */

  const pastDays = (current, daysPast) => {
    return new Date(current.setDate(current.getDate() - daysPast));
  };

  const getHarvestGrowthPercentage = (harvests) => {
    const currentHarvest = [...harvests].reverse()[1];
    const pastHarvest = [...harvests].reverse()[2];

    const totalHarvests = (harvest) => {
      return harvest.data.reduce((prev, curr) => {
        return prev + curr.weight;
      }, 0);
    };

    const currentValue = totalHarvests(currentHarvest);
    const pastValue = totalHarvests(pastHarvest);
    const percentage = Math.floor(
      ((currentValue - pastValue) / pastValue) * 100
    );

    if (!isNaN(percentage)) {
      return percentage;
    }
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
              className="flex items-center gap-4 p-5 bg-white shadow rounded-2xl"
            >
              {insight.isGood ? (
                <CaretUpFilled className="text-2xl text-primary-400" />
              ) : (
                <CaretDownFilled className="text-2xl text-red-400" />
              )}

              <p className="poppins-paragraph-sm">{insight.message}</p>
            </div>
          );
        })}
    </>
  );
};
