import React from "react";
import {
  SideNavBar,
  TopNavBar,
  ProductionCard,
  WeeklyTaskCard,
} from "../components";
import { Images } from "../core";
import { useSelector, useDispatch, batch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getBatches } from "../features/batch/batchSlice";

export const Production = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.user
  );
  const { tasks, batches } = useSelector((state) => state.batch);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    dispatch(getBatches());
  }, [user, isSuccess, isLoading, isError, message, dispatch, navigate]);

  const getDay = (day) => {
    switch (day) {
      case 1:
        return "Mon";
      case 2:
        return "Teu";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      case 7:
        return "Sun";
      default:
        return "Sun";
    }
  };

  return (
    <>
      <div className="flex flex-row w-screen">
        <div className="w-1/6">
          <SideNavBar />
        </div>

        <div className="flex flex-col w-full lg:w-5/6">
          <div className="w-full">
            <TopNavBar pageName="Production" />
          </div>

          <div className="my-4 py-4 px-4 md:px-6 lg:px-9 overflow-x-scroll scrollbar">
            <section className="w-max flex flex-row space-x-4 pt-4">
              {Object.keys(batches).map((batch) => {
                return (
                  <div className="w-80 text-center">
                    <h2 className="poppins-heading-6 text-seconday-400 mb-4">
                      {batch.slice(0, 1).toUpperCase() + batch.slice(1)}
                    </h2>
                    {batches[batch].map((batchItem) => {
                      return (
                        <ProductionCard
                          className=""
                          batchNumber={"Batch " + batchItem.name}
                          description="Lorem ipsum dolor sit amet consectetur"
                          daysLeft="2"
                        />
                      );
                    })}
                  </div>
                );
              })}
            </section>
          </div>
          <div className="w-full my-4 py-4 px-4 md:px-6 lg:px-9">
            <section className="w-full lg:w-1/2 flex flex-col lg:flex-row">
              <div className="w-full text-left">
                <h2 className="poppins-heading-6 text-seconday-400 mb-4">
                  Weekly Tasks
                </h2>
                {tasks
                  .map((batch) => {
                    return batch.tasks.map((task) => {
                      return {
                        phase: batch.activePhase,
                        name: batch.name,
                        task: task,
                        day: task.frequency,
                      };
                    });
                  })
                  .flat()
                  .map((taskItem) => {
                    return (
                      <WeeklyTaskCard
                        className=""
                        task={taskItem.task.name}
                        batch={taskItem.name}
                        phase={
                          taskItem.phase.slice(0, 1).toUpperCase() +
                          taskItem.phase.slice(1)
                        }
                        day={getDay(taskItem.day)}
                        image={
                          Images[
                            taskItem.phase.slice(0, 1).toUpperCase() +
                              taskItem.phase.slice(1)
                          ]
                        }
                      />
                    );
                  })}
              </div>
            </section>
            <section className="w-full lg:w-1/2 flex flex-col lg:flex-row"></section>
          </div>
        </div>
      </div>
    </>
  );
};
