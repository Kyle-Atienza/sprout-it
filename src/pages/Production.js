import React from "react";
import {
  SideNavBar,
  TopNavBar,
  ProductionCard,
  WeeklyTaskCard,
} from "../components";
import { Images } from "../core";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { useEffect, Fragment } from "react";
import { useNavigate } from "react-router";
import {
  createTask,
  getBatches,
  updateBatch,
} from "../features/batch/batchSlice";
import { getMaterials } from "../features/inventory/inventorySlice";
import { useState } from "react";

export const Production = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isBatchDetailsOpen, setIsBatchDetailsOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [task, setTask] = useState("");

  const {
    user,
    isSuccess: userSuccess,
    isLoading: userLoading,
    isError: userError,
    message: userMessage,
  } = useSelector((state) => state.user);
  const {
    tasks,
    batches,
    isSuccess: batchSuccess,
    isLoading: batchLoading,
    isError: batchError,
  } = useSelector((state) => state.batch);
  const { phases } = useSelector((state) => state.phases);

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getBatches());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    /* dispatch(getMaterials());
    dispatch(getBatches()); */
  }, [
    user,
    userSuccess,
    userLoading,
    userError,
    userMessage,
    dispatch,
    navigate,
    batchSuccess,
    batchLoading,
    batchError,
  ]);

  const onUpdateBatch = (phase) => {
    alert("Are you sure?");
    if (phase === "fruiting") {
      dispatch(
        updateBatch({
          id: selectedBatch._id,
          payload: {
            active: false,
            activePhase: "",
          },
        })
      );
      setIsBatchDetailsOpen(false);
    } else {
      const nextPhase =
        phases[
          phases.indexOf(
            selectedBatch.activePhase.slice(0, 1).toUpperCase() +
              selectedBatch.activePhase.slice(1)
          ) + 1
        ].toLowerCase();
      dispatch(
        updateBatch({
          id: selectedBatch._id,
          payload: {
            activePhase: nextPhase,
          },
        })
      );
    }
  };

  const onChange = (e) => {
    setTask(e.target.value);
    // console.log(task);
  };

  const onCreateTask = () => {
    // console.log("task");
    dispatch(
      createTask({
        batchId: selectedBatch._id,
        name: "task",
        frequency: 1,
      })
    );
  };

  const getDay = (day) => {
    switch (day) {
      case 1:
        return "Mon";
      case 2:
        return "Tue";
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
      <Transition appear show={isBatchDetailsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsBatchDetailsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-dark-700 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-primary-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all h-[40rem] flex flex-col">
                  <Tab.Group>
                    <Tab.List className="flex gap-2 mt-7 overflow-x-scroll pb-2">
                      {phases.map((phase) => {
                        return (
                          <Tab
                            className="poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl disabled:opacity-50"
                            key={phase}
                          >
                            {phase}
                          </Tab>
                        );
                      })}
                    </Tab.List>
                    <Tab.Panels className="py-5 flex-1">
                      <Tab.Panel>
                        <div>
                          <table className="w-full text-sm text-left">
                            <thead className=" poppins-paragraph ">
                              <tr>
                                <th scope="col" className="py-2">
                                  Material
                                </th>
                                <th scope="col" className="py-2">
                                  Quantity
                                </th>
                              </tr>
                            </thead>
                            <tbody className="poppins-paragraph-sm ">
                              <tr className="transition-all duration-300 ease-in-out cursor-pointer">
                                <td className="py-2">Kusot</td>
                                <td className="py-2">12 kg</td>
                              </tr>
                              <tr className="transition-all duration-300 ease-in-out cursor-pointer">
                                <td className="py-2">Kusot</td>
                                <td className="py-2">12 kg</td>
                              </tr>
                              <tr className="transition-all duration-300 ease-in-out cursor-pointer">
                                <td className="py-2">Kusot</td>
                                <td className="py-2">12 kg</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div>
                          <p className="poppins-paragraph">
                            27 days composting
                          </p>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="">
                          <p className="poppins-paragraph">
                            200 days composting
                          </p>
                          <p className="poppins-paragraph">1kg bag weight</p>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="">
                          <p className="poppins-paragraph">
                            8 hours Sterilization
                          </p>
                        </div>
                        <div className="mt-auto">
                          <p className="poppins-paragraph">2 defects</p>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="">
                          <p className="poppins-paragraph">
                            198 Total Inoculated
                          </p>
                          <p className="poppins-paragraph">F2 Sorgum Spawn</p>
                        </div>
                        <div className="mt-auto">
                          <p className="poppins-paragraph">4 defects</p>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="">
                          <p className="poppins-paragraph">
                            194 total bags for fruiting
                          </p>
                          <p className="poppins-paragraph">
                            2 weeks waiting time
                          </p>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                  <form className=" mb-4">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                      >
                        Task Message
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={task}
                        onChange={onChange}
                        placeholder="Clean Mushroom House"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={onCreateTask}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        Create Task
                      </button>
                    </div>
                  </form>
                  {selectedBatch.activePhase === "fruiting" ? (
                    <button
                      onClick={() => onUpdateBatch(selectedBatch.activePhase)}
                      className="bg-red-500 hover:bg-red-700 text-white poppins-button font-bold py-2 px-4 rounded"
                    >
                      Finish Batch
                    </button>
                  ) : (
                    <button
                      onClick={() => onUpdateBatch(selectedBatch.activePhase)}
                      className="bg-blue-500 hover:bg-blue-700 text-white poppins-button font-bold py-2 px-4 rounded"
                    >
                      Start Next Phase
                    </button>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="flex flex-row w-screen">
        <div className="w-0 lg:w-1/6">
          <SideNavBar />
        </div>

        <div className="flex flex-col w-full lg:w-5/6">
          <div className="w-full">
            <TopNavBar pageName="Production" />
          </div>

          <div className="my-4 py-4 px-4 md:px-6 lg:px-9 overflow-x-scroll scrollbar">
            <section className="w-max flex flex-row space-x-4 pt-4">
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-seconday-400 mb-4">
                  Composting
                </h2>
                {batches["composting"]?.map((batch) => {
                  return (
                    <ProductionCard
                      onClick={() => {
                        setIsBatchDetailsOpen(true);
                        setSelectedBatch(batch);
                      }}
                      key={batch.name}
                      className=""
                      batchNumber={"Batch " + batch.name}
                      description="Lorem ipsum dolor sit amet consectetur"
                      daysLeft="2"
                    />
                  );
                })}
              </div>
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-seconday-400 mb-4">
                  Bagging
                </h2>
                {batches["bagging"]?.map((batch) => {
                  return (
                    <ProductionCard
                      onClick={() => {
                        setIsBatchDetailsOpen(true);
                        setSelectedBatch(batch);
                      }}
                      key={batch.name}
                      className=""
                      batchNumber={"Batch " + batch.name}
                      description="Lorem ipsum dolor sit amet consectetur"
                      daysLeft="2"
                    />
                  );
                })}
              </div>
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-seconday-400 mb-4">
                  Sterilization
                </h2>
                {batches["sterilization"]?.map((batch) => {
                  return (
                    <ProductionCard
                      onClick={() => {
                        setIsBatchDetailsOpen(true);
                        setSelectedBatch(batch);
                      }}
                      key={batch.name}
                      className=""
                      batchNumber={"Batch " + batch.name}
                      description="Lorem ipsum dolor sit amet consectetur"
                      daysLeft="2"
                    />
                  );
                })}
              </div>
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-seconday-400 mb-4">
                  Inoculation
                </h2>
                {batches["inoculation"]?.map((batch) => {
                  return (
                    <ProductionCard
                      onClick={() => {
                        setIsBatchDetailsOpen(true);
                        setSelectedBatch(batch);
                      }}
                      key={batch.name}
                      className=""
                      batchNumber={"Batch " + batch.name}
                      description="Lorem ipsum dolor sit amet consectetur"
                      daysLeft="2"
                    />
                  );
                })}
              </div>
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-seconday-400 mb-4">
                  Fruiting
                </h2>
                {batches["fruiting"]?.map((batch) => {
                  return (
                    <ProductionCard
                      onClick={() => {
                        setIsBatchDetailsOpen(true);
                        setSelectedBatch(batch);
                      }}
                      key={batch.name}
                      className=""
                      batchNumber={"Batch " + batch.name}
                      description="Lorem ipsum dolor sit amet consectetur"
                      daysLeft="2"
                    />
                  );
                })}
              </div>
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
                        key={taskItem.task._id}
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
