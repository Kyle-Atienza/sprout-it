import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import _ from "lodash";
import React, { useEffect } from "react";
import { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import MLR from "ml-regression-multivariate-linear";

export const AnalyticsInsights = () => {
  const { batches, initialBatches, finished } = useSelector(
    (state) => state.batch
  );
  const { harvestsByTimeRange } = useSelector((state) => state.harvest);
  const { materials } = useSelector((state) => state.inventory);

  const { days, weeks, months } = harvestsByTimeRange;

  const [insights, setInsights] = useState([]);
  const [regressionParameters, setRegressionParameters] = useState({
    x: [],
    y: [],
  });
  const [regressionResults, setregressionResults] = useState({
    fruiting: [],
    completed: [],
  });

  const getVariables = (parameter) => {
    return parameter.map(({ variables }) =>
      Object.keys(variables).map((variable) => variables[variable])
    );
  };

  useEffect(() => {
    const initialInsights = [];
    const regressionData = initialBatches
      .map((batch) => {
        return {
          batch: parseInt(batch.name),
          variables: {
            Harvests: Math.round(getBatchHarvestSum(batch)),
            // Defects: Math.round(getBatchDefectsSum(batch)),
            Value: batch.value,
            ...materials
              .filter((material) => !material.isHidden)
              .reduce((materialCase, material) => {
                materialCase[capitalize(material.name)] =
                  batch.materials.find(({ material: batchMaterial }, index) => {
                    return (
                      batchMaterial.name.toLowerCase() ===
                      material.name.toLowerCase()
                    );
                  })?.weight ?? 0;
                return materialCase;
              }, {}),
          },
        };
      })
      .slice()
      .sort((a, b) => a.batch - b.batch);

    setRegressionParameters({
      x: regressionData.map((data) => {
        const variables = Object.keys(data.variables).reduce(
          (xVariables, variable) => {
            if (variable !== "Harvests") {
              xVariables[variable] = data.variables[variable];
            }
            return xVariables;
          },
          {}
        );
        return {
          batch: data.batch,
          variables: variables,
        };
      }),
      y: regressionData.map((data) => {
        return {
          batch: data.batch,
          variables: { Harvests: data.variables["Harvests"] },
        };
      }),
    });

    if (
      getVariables(regressionParameters.x).length &&
      getVariables(regressionParameters.y).length
    ) {
      const mlr = new MLR(
        getVariables(regressionParameters.x),
        getVariables(regressionParameters.y)
      );

      const fruitingBatchesName = batches.fruiting?.map((batch) =>
        parseInt(batch.name)
      );
      const finishedBatchesName = finished?.map((batch) =>
        parseInt(batch.name)
      );

      const initialRegressionResults = regressionParameters.x
        .map((batch) => {
          return {
            batch: batch.batch,
            prediction: Math.round(
              mlr.predict(
                Object.keys(batch.variables).map(
                  (variable) => batch.variables[variable]
                )
              )[0]
            ),
          };
        })
        .slice()
        .sort((a, b) => b.prediction - a.prediction);

      console.log(initialRegressionResults);

      setregressionResults({
        fruiting: initialRegressionResults.filter((result) => {
          return fruitingBatchesName.includes(result.batch);
        }),
        completed: initialRegressionResults.filter((result) => {
          return finishedBatchesName.includes(result.batch);
        }),
      });

      console.log(
        regressionResults.completed.map((result) => result.batch).join(", ")
      );

      initialInsights.push({
        show: true,
        isGood: true,
        message: `Batches ${regressionResults.completed
          .map((result) => result.batch)
          .slice(0, 3)
          .join(", ")} performs best in the past`,
      });
    }

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

    /* initialInsights.push({
      show: true,
      isGood: true,
      message: `Batches ${bestBatchesName
        .map((batch, index) =>
          index === bestBatchesName.length - 1 ? `and ${batch}` : batch
        )
        .join(", ")} are the best performing batches`,
    }); */

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
    return (
      batch.harvests.reduce((prev, current) => {
        return prev + current.weight;
      }, 0) || 0
    );
  };

  const getBatchDefectsSum = (batch) => {
    const phases = [
      "composting",
      "bagging",
      "sterilization",
      "inoculation",
      "fruiting",
    ];

    return (
      phases
        .map((phase) => batch[phase]?.defects ?? 0)
        .reduce((totalDefects, defect) => (totalDefects += defect), 0) || 0
    );
  };

  const capitalize = (string) => {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
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
