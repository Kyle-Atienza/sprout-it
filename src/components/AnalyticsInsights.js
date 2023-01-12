import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import _ from "lodash";
import React, { useEffect } from "react";
import { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";

export const AnalyticsInsights = () => {
  const { batches, initialBatches } = useSelector((state) => state.batch);
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
          if (batch.daysWithHarvests > 5 && batch.totalHarvests < 6) {
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
      initialInsights.push(
        {
          show: true,
          isGood: getHarvestGrowthPercentage(days) > 0,
          message:
            getHarvestGrowthPercentage(days) === -100 ||
            getHarvestGrowthPercentage(days) === undefined
              ? "You still havent recorded any harvests for today"
              : `Harvests ${
                  getHarvestGrowthPercentage(days) > 0
                    ? "increased"
                    : "decreased"
                } by ${getHarvestGrowthPercentage(
                  days
                )}% compared from yesterday`,
        },
        {
          show: true,
          isGood: getHarvestGrowthPercentage(weeks) > 0,
          message:
            getHarvestGrowthPercentage(weeks) === -100 ||
            getHarvestGrowthPercentage(weeks) === undefined
              ? "You still havent recorded any harvests for the week"
              : `Harvests ${
                  getHarvestGrowthPercentage(weeks) > 0
                    ? "increased"
                    : "decreased"
                } by ${getHarvestGrowthPercentage(
                  weeks
                )}% compared from last week`,
        },
        {
          show: true,
          isGood: getHarvestGrowthPercentage(months) > 0,
          message:
            getHarvestGrowthPercentage(months) === -100 ||
            getHarvestGrowthPercentage(months) === undefined
              ? "You still havent recorded any harvests for the month"
              : `Harvests ${
                  getHarvestGrowthPercentage(months) > 0
                    ? "increased"
                    : "decreased"
                } by ${getHarvestGrowthPercentage(
                  months
                )}% compared from last month`,
        }
      );
    }

    const bestBatchesName = initialBatches
      .map((batch) => {
        return {
          value: getBatchHarvestSum(batch) * 30 - batch.value,
          batch: batch,
        };
      })
      .slice()
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map(({ batch }) => batch.name);

    initialInsights.push({
      show: true,
      isGood: true,
      message: `Batches ${bestBatchesName
        .map((batch, index) =>
          index === bestBatchesName.length - 1 ? `and ${batch}` : batch
        )
        .join(", ")} are the best performing batches`,
    });

    setInsights(initialInsights);
  }, [batches, harvestsByTimeRange]);

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
      return isFinite(percentage) ? percentage : 100;
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
        // past 5 days
        const totalHarvests = harvests.data
          .slice(0, 5)
          .reduce((prev, currentHarvest) => {
            return currentHarvest.weight + prev;
          }, 0);
        return {
          batch: harvests.batch,
          daysWithHarvests: harvests.data.length,
          totalHarvests: totalHarvests,
        };
      });
  };

  const getBatchHarvestSum = (batch) => {
    return batch.harvests.reduce((prev, current) => {
      return prev + current.weight;
    }, 0);
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
