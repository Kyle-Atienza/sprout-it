import React from "react";
import {
  SideNavBar,
  TopNavBar,
  ProductionCard,
  TaskForm,
  BatchDetails,
  PrimaryButton,
  TextField,
  PhasesCarousel,
  SecondaryButton,
  WeeklyTaskList,
  HarvestForm,
  BatchHarvests,
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { useEffect, Fragment } from "react";
import { useNavigate } from "react-router";
import { getBatches, updateBatch } from "../features/batch/batchSlice";
import { getTasks, updateTask } from "../features/task/taskSlice";
import { getMaterials } from "../features/inventory/inventorySlice";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
};

export const Production = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();

  //TODO: These long ass variables annoy me - Kyle (who started this)
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isConfirmBatchModalOpen, setIsConfirmBatchModalOpen] = useState(false);
  const [isPhaseFormModal, setIsPhaseFormModal] = useState(false);
  const [isBatchHarvestModalOpen, setIsBatchHarvestModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [selectedTask, setSelectedTask] = useState({});
  const [phaseDetails, setPhaseDetails] = useState({});
  const [defects, setDefects] = useState(0);
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

  const onUpdateBatch = (batch) => {
    const phase = batch.activePhase;
    const nextPhase =
      phase !== "post"
        ? phases[phases.indexOf(selectedBatch.activePhase) + 1].toLowerCase()
        : null;

    if (phase === "post") {
      dispatch(
        updateBatch({
          id: selectedBatch._id,
          payload: {
            active: false,
            activePhase: "",
            finishedAt: new Date(),
          },
        })
      );
    } else if (phase === "composting") {
      dispatch(
        updateBatch({
          id: selectedBatch._id,
          payload: {
            activePhase: nextPhase,
            [nextPhase]: {
              startedAt: new Date(),
              bagWeight: phaseDetails.bagWeight,
            },
            [selectedBatch.activePhase]: {
              ...selectedBatch[selectedBatch.activePhase],
              defects: defects,
              moisture: phaseDetails.moisture,
            },
          },
        })
      );
    } else if (phase === "bagging") {
      dispatch(
        updateBatch({
          id: selectedBatch._id,
          payload: {
            activePhase: nextPhase,
            [nextPhase]: {
              startedAt: new Date(),
              waiting: phaseDetails.waiting,
            },
            [selectedBatch.activePhase]: {
              ...selectedBatch[selectedBatch.activePhase],
              defects: defects,
              total: phaseDetails.total,
            },
          },
        })
      );
    } else if (phase === "sterilization") {
      dispatch(
        updateBatch({
          id: selectedBatch._id,
          payload: {
            activePhase: nextPhase,
            [nextPhase]: {
              startedAt: new Date(),
              spawn: phaseDetails.spawn,
            },
            [selectedBatch.activePhase]: {
              ...selectedBatch[selectedBatch.activePhase],
              defects: defects,
            },
          },
        })
      );
    } else if (phase === "inoculation") {
      dispatch(
        updateBatch({
          id: selectedBatch._id,
          payload: {
            activePhase: nextPhase,
            [nextPhase]: {
              startedAt: new Date(),
              waiting: phaseDetails.waiting,
            },
            [selectedBatch.activePhase]: {
              ...selectedBatch[selectedBatch.activePhase],
              defects: defects,
              total: phaseDetails.total,
            },
          },
        })
      );
    } else if (phase === "fruiting") {
      dispatch(
        updateBatch({
          id: selectedBatch._id,
          payload: {
            activePhase: nextPhase,
            [nextPhase]: {
              startedAt: new Date(),
            },
            [selectedBatch.activePhase]: {
              ...selectedBatch[selectedBatch.activePhase],
              defects: defects,
              total: phaseDetails.total,
            },
          },
        })
      );
    } else if (phase === "pre") {
      dispatch(
        updateBatch({
          id: selectedBatch._id,
          payload: {
            activePhase: nextPhase,
            [nextPhase]: {
              startedAt: new Date(),
              waiting: phaseDetails.waiting,
            },
          },
        })
      );
    }

    setIsBatchModalOpen(false);
    setIsConfirmBatchModalOpen(false);
    setIsPhaseFormModal(false);
    setDefects(0);
    setPhaseDetails({});
  };

  const mapButtonByPhase = (phase) => {
    if (phase === "fruiting") {
      return (
        <PrimaryButton
          name="Finish Batch"
          className=""
          onClick={() => setIsConfirmBatchModalOpen(true)}
        />
      );
    } else if (phase === "post") {
      return (
        <PrimaryButton
          name="End Batch"
          className=""
          onClick={() => setIsConfirmBatchModalOpen(true)}
        />
      );
    } else {
      return (
        <PrimaryButton
          name="Start Next Phase"
          className=""
          onClick={() => setIsConfirmBatchModalOpen(true)}
        />
      );
    }
  };

  const onEndTask = () => {
    dispatch(
      updateTask({
        id: selectedTask._id,
        payload: {
          status: "cancel",
        },
      })
    );
  };

  const getDaysCount = (batch) => {
    const phase = batch.activePhase;
    const currentDate = new Date();

    if (phase === "pre") {
      const baseDate = new Date(batch.createdAt);
      const timeDiff = currentDate.getTime() - baseDate.getTime();
      const dayDiff = timeDiff / (1000 * 3600 * 24) + 1;
      return Math.floor(dayDiff);
    } else if (phase === "post") {
      return 0;
    } else {
      const baseDate = new Date(batch[batch.activePhase].startedAt);
      const timeDiff = currentDate.getTime() - baseDate.getTime();
      const dayDiff = timeDiff / (1000 * 3600 * 24) + 1;
      return Math.floor(dayDiff);
    }
  };

  const mapFormByPhase = (phase) => {
    if (phase === "pre") {
      return (
        <>
          <h1 className="poppins-heading-6 mt-6 mb-3">
            Next Phase Preparation
          </h1>
          <h1>How Long will be the composting time be?</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) =>
              setPhaseDetails((prevState) => ({
                ...prevState,
                waiting: e.target.value,
              }))
            }
            placeholder="1 week, 3 weeks..."
            required
          />
        </>
      );
    } else if (phase === "composting") {
      return (
        <>
          <h1 className="poppins-heading-6 mb-3">Phase Results</h1>
          <h1>How many defects where there at phase</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) => setDefects(e.target.value)}
            placeholder="Lorem ipsum dolor"
            required
          />
          <h1>What is the moisture content</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) =>
              setPhaseDetails((prevState) => ({
                ...prevState,
                moisture: e.target.value,
              }))
            }
            placeholder="0"
            required
          />
          <h1 className="poppins-heading-6 mt-6 mb-3">
            Next Phase Preparation
          </h1>
          <h1>Weight per bags (kg)</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) =>
              setPhaseDetails((prevState) => ({
                ...prevState,
                bagWeight: e.target.value,
              }))
            }
            placeholder="0"
            required
          />
        </>
      );
    } else if (phase === "bagging") {
      return (
        <>
          <h1 className="poppins-heading-6 mb-3">Phase Results</h1>
          <h1>How many defects where there at phase</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) => setDefects(e.target.value)}
            placeholder="Lorem ipsum dolor"
            required
          />
          <h1>Total Number of bags</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) =>
              setPhaseDetails((prevState) => ({
                ...prevState,
                total: e.target.value,
              }))
            }
            placeholder="Lorem ipsum dolor"
            required
          />
          <h1 className="poppins-heading-6 mt-6 mb-3">
            Next Phase Preparation
          </h1>
          <h1>How long will be the sterilization</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) =>
              setPhaseDetails((prevState) => ({
                ...prevState,
                waiting: e.target.value,
              }))
            }
            placeholder="Lorem ipsum dolor"
            required
          />
        </>
      );
    } else if (phase === "sterilization") {
      return (
        <>
          <h1 className="poppins-heading-6 mb-3">Phase Results</h1>
          <h1>How many defects where there at phase</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) => setDefects(e.target.value)}
            placeholder="Lorem ipsum dolor"
            required
          />
          <h1 className="poppins-heading-6 mt-6 mb-3">
            Next Phase Preparation
          </h1>
          <h1>What is the spawn that will be used</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) =>
              setPhaseDetails((prevState) => ({
                ...prevState,
                spawn: e.target.value,
              }))
            }
            placeholder="Lorem ipsum dolor"
            required
          />
        </>
      );
    } else if (phase === "inoculation") {
      return (
        <>
          <h1 className="poppins-heading-6 mb-3">Phase Results</h1>
          <h1>How many defects where there at phase</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) => setDefects(e.target.value)}
            placeholder="Lorem ipsum dolor"
            required
          />
          <h1>What is the total number of bags inoculated</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) =>
              setPhaseDetails((prevState) => ({
                ...prevState,
                total: e.target.value,
              }))
            }
            placeholder="Lorem ipsum dolor"
            required
          />
          <h1 className="poppins-heading-6 mt-6 mb-3">
            Next Phase Preparation
          </h1>
          <h1>How long is waiting period</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) =>
              setPhaseDetails((prevState) => ({
                ...prevState,
                waiting: e.target.value,
              }))
            }
            placeholder="Lorem ipsum dolor"
            required
          />
        </>
      );
    } else if (phase === "fruiting") {
      return (
        <>
          <h1>How many defects where there at phase</h1>
          <TextField
            className="w-full open-paragraph-sm mt-0"
            id="username"
            type="text"
            name="defects"
            onChange={(e) => setDefects(e.target.value)}
            placeholder="Lorem ipsum dolor"
            required
          />
        </>
      );
    }
  };

  const handleSubmitTask = () => {
    setIsBatchModalOpen(false);
    forceUpdate();
  };

  return (
    <>
      <Transition appear show={isBatchHarvestModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsBatchHarvestModalOpen(false)}
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
                <Dialog.Panel className="overflow-y-scroll scrollbar-hidden bg-light-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all h-[40rem] flex flex-col">
                  <div className="w-full flex items-center justify-start mb-6">
                    <Dialog.Title as="h3" className="poppins-heading-6 w-full">
                      Batch {selectedBatch.name} Details
                    </Dialog.Title>
                    <button
                      className="hover:text-red-700 flex items-center"
                      onClick={() => setIsBatchHarvestModalOpen(false)}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                  <BatchHarvests selectedBatch={selectedBatch} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

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
                <Dialog.Panel className="overflow-y-scroll scrollbar-hidden bg-light-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all h-[40rem] flex flex-col">
                  <div className="w-full flex items-center justify-start mb-6">
                    <Dialog.Title as="h3" className="poppins-heading-6 w-full">
                      Batch {selectedBatch.name} Details
                    </Dialog.Title>
                    <button
                      className="hover:text-red-700 flex items-center"
                      onClick={() => setIsBatchModalOpen(false)}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                  <BatchDetails batch={selectedBatch} />
                  {selectedBatch.activePhase === "fruiting" ? (
                    <Disclosure>
                      <Disclosure.Button className="mb-4 py-4 px-6 rounded-full poppins-button bg-transparent text-primary-500 hover:text-light-100 border-primary-400 hover:border-primary-500 border-2 hover:bg-primary-500 shadow transition-all disabled:opacity-50">
                        Record Harvest
                      </Disclosure.Button>
                      <Disclosure.Panel className="text-gray-500">
                        <HarvestForm
                          selectedBatch={selectedBatch}
                          setIsBatchHarvestModalOpen={(state) =>
                            setIsBatchHarvestModalOpen(state)
                          }
                        />
                      </Disclosure.Panel>
                    </Disclosure>
                  ) : null}
                  <Disclosure>
                    <Disclosure.Button className="mb-4 py-4 px-6 rounded-full poppins-button bg-transparent text-primary-500 hover:text-light-100 border-primary-400 hover:border-primary-500 border-2 hover:bg-primary-500 shadow transition-all disabled:opacity-50">
                      Add Task
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500">
                      <TaskForm
                        batch={selectedBatch}
                        closeModal={handleSubmitTask}
                      />
                    </Disclosure.Panel>
                  </Disclosure>
                  {mapButtonByPhase(selectedBatch.activePhase)}
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
                <Dialog.Panel className="overflow-y-scroll scrollbar-hidden bg-light-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all  flex flex-col">
                  <div className="w-full flex items-center justify-start mb-6">
                    <Dialog.Title as="h3" className="poppins-heading-6 w-full">
                      {selectedTask.name}
                    </Dialog.Title>
                    <button
                      className="hover:text-red-700 flex items-center"
                      onClick={() => setIsTaskModalOpen(false)}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                  <div className="h-full mb-8">
                    <p className="open-paragraph-sm">
                      <span className="font-bold">Phase: </span>
                      {selectedTask.for}
                    </p>
                    <p className="open-paragraph-sm">
                      <span className="font-bold">Description: </span>
                      {selectedTask.description}
                    </p>
                    <p className="open-paragraph-sm">
                      <span className="font-bold">Status: </span>
                      {selectedTask.status}
                    </p>
                    <p className="open-paragraph-sm">
                      <span className="font-bold">Frequency: </span>
                      {selectedTask.frequency}
                    </p>
                    <p className="open-paragraph-sm">
                      <span className="font-bold">Time: </span>
                      {selectedTask.time}
                    </p>
                    <p className="open-paragraph-sm">
                      <span className="font-bold">Occurence: </span>
                      {selectedTask.occurence}
                    </p>
                    {/* <pre>{JSON.stringify(selectedTask, null, 2)}</pre> */}
                  </div>
                  <button
                    type="button"
                    className={`py-4 px-6 rounded-full poppins-button bg-red-500 hover:bg-red-700 text-light-100 shadow transition-all `}
                    onClick={() => onEndTask()}
                  >
                    End Task
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isConfirmBatchModalOpen} as={Fragment}>
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
                <Dialog.Panel className="bg-light-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all flex flex-col">
                  <h1 className="text-center open-paragraph mb-6">
                    Are you sure you want to proceed to the next phase? By doing
                    so, you wont able to go back to the previous phase.
                  </h1>
                  <div className="flex flex-row justify-between align-bottom">
                    <SecondaryButton
                      name="No"
                      className="w-36"
                      onClick={() => setIsConfirmBatchModalOpen(false)}
                    />
                    <PrimaryButton
                      name="Yes"
                      className="w-36"
                      onClick={() =>
                        selectedBatch.activePhase === "post"
                          ? onUpdateBatch(selectedBatch)
                          : setIsPhaseFormModal(true)
                      }
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isPhaseFormModal} as={Fragment}>
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
                <Dialog.Panel className="overflow-y-scroll scrollbar-hidden bg-light-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all flex flex-col">
                  {mapFormByPhase(selectedBatch.activePhase)}
                  <PrimaryButton
                    name="Submit"
                    className="mt-6"
                    onClick={() => onUpdateBatch(selectedBatch)}
                  />
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

        <div className="flex flex-col w-full lg:w-5/6 min-h-screen">
          <div className="w-full">
            <TopNavBar pageName="Production" />
          </div>

          <div className="my-4 py-4 px-4 md:px-6 lg:px-9 overflow-x-scroll scrollbar">
            <section className="w-max flex flex-row space-x-4 pt-4">
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-dark-500 mb-4">
                  Pre-production
                </h2>
                {batches["pre"]?.map((batch) => {
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
                      daysLeft={getDaysCount(batch)}
                      countDays={false}
                    />
                  );
                })}
              </div>
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-dark-500 mb-4">
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
                      daysLeft={getDaysCount(batch)}
                    />
                  );
                })}
              </div>
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-dark-500 mb-4">
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
                      daysLeft={getDaysCount(batch)}
                    />
                  );
                })}
              </div>
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-dark-500 mb-4">
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
                      daysLeft={getDaysCount(batch)}
                    />
                  );
                })}
              </div>
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-dark-500 mb-4">
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
                      daysLeft={getDaysCount(batch)}
                    />
                  );
                })}
              </div>
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-dark-500 mb-4">
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
                      daysLeft={getDaysCount(batch)}
                    />
                  );
                })}
              </div>
              <div className="w-80 text-center">
                <h2 className="poppins-heading-6 text-dark-500 mb-4">
                  Post-production
                </h2>
                {batches["post"]?.map((batch) => {
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
                      daysLeft={getDaysCount(batch)}
                      countDays={false}
                    />
                  );
                })}
              </div>
            </section>
          </div>
          <div className="w-full my-4 py-4 px-4 md:px-6 lg:px-9 flex flex-col lg:flex-row gap-4">
            <section className="w-full lg:w-1/2 flex flex-col lg:flex-row">
              <WeeklyTaskList
                setIsTaskModalOpen={(state) => setIsTaskModalOpen(state)}
                setSelectedTask={(task) => setSelectedTask(task)}
              />
            </section>
            <section className="w-full lg:w-1/2 flex flex-col lg:flex-row">
              <PhasesCarousel />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
