import React from "react";
import {
  SideNavBar,
  TopNavBar,
  ProductionCard,
  WeeklyTaskCard,
  TaskForm,
  BatchDetails,
} from "../components";
import { Images } from "../core";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect, Fragment } from "react";
import { useNavigate } from "react-router";
import { getBatches, updateBatch } from "../features/batch/batchSlice";
import { getTasks, updateTask } from "../features/task/taskSlice";
import { getMaterials } from "../features/inventory/inventorySlice";
import { useState } from "react";

export const Production = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [selectedTask, setSelectedTask] = useState({});
  const {
    user,
    isSuccess: userSuccess,
    isLoading: userLoading,
    isError: userError,
    message: userMessage,
  } = useSelector((state) => state.user);
  const {
    batches,
    isSuccess: batchSuccess,
    isLoading: batchLoading,
    isError: batchError,
  } = useSelector((state) => state.batch);
  const { tasks } = useSelector((state) => state.task);
  const { phases } = useSelector((state) => state.phases);

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getBatches());
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
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
      setIsBatchModalOpen(false);
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

  const onEndTask = (phase) => {
    dispatch(
      updateTask({
        id: selectedTask._id,
        payload: {
          status: "cancel",
        },
      })
    );
    window.location.reload();
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
      <Transition appear show={isBatchModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsBatchModalOpen(false)}
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
                <Dialog.Panel className="overflow-y-scroll bg-primary-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all h-[40rem] flex flex-col">
                  <BatchDetails batch={selectedBatch} />
                  <TaskForm batch={selectedBatch} />
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

      <Transition appear show={isTaskModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsTaskModalOpen(false)}
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
                <Dialog.Panel className="overflow-y-scroll bg-primary-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all h-[40rem] flex flex-col">
                  <pre>{JSON.stringify(selectedTask, null, 2)}</pre>
                  <button
                    onClick={() => onEndTask()}
                    className="bg-red-500 hover:bg-red-700 text-white poppins-button font-bold py-2 px-4 rounded"
                  >
                    End Task
                  </button>
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
                        setIsBatchModalOpen(true);
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
                        setIsBatchModalOpen(true);
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
                        setIsBatchModalOpen(true);
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
                        setIsBatchModalOpen(true);
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
                        setIsBatchModalOpen(true);
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
                  .filter((task) => {
                    return task.status === "ongoing" && task.batch.active;
                  })
                  .map((task) => {
                    return (
                      <WeeklyTaskCard
                        onClick={() => {
                          setIsTaskModalOpen(true);
                          setSelectedTask(task);
                        }}
                        key={task._id}
                        className=""
                        task={task.name}
                        batch={task.batch.name}
                        phase={
                          task.batch.activePhase.slice(0, 1).toUpperCase() +
                          task.batch.activePhase.slice(1)
                        }
                        image={
                          Images[
                            task.batch.activePhase.slice(0, 1).toUpperCase() +
                              task.batch.activePhase.slice(1)
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
