import React from "react";
import {
  SideNavBar,
  TopNavBar,
  WeeklyTaskList,
  PrimaryButton,
  PurchaseForm,
  MaterialForm,
  BatchDetails,
  AnalyticsHarvestByTime,
  BackToTopButton
} from "../components";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Images } from "../core";
import { CloseOutlined } from "@ant-design/icons";
import { Dialog, Transition } from "@headlessui/react";
import {
  getBatches,
  loadBatchesBySubstrate,
} from "../features/batch/batchSlice";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
import { Chart, registerables } from "chart.js";
import { getMaterials } from "../features/inventory/inventorySlice";
import { getTasks, updateTask } from "../features/task/taskSlice";
import { getPurchases } from "../features/financial/financialSlice";
Chart.register(...registerables);

export const Home = () => {
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState({});

  let [selectedBatch, setSelectedBatch] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState({});

  const { materials } = useSelector((state) => state.inventory);

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.user
  );
  const { batches, finished, substrate } = useSelector((state) => state.batch);

  const { kusot, dayami, mixed } = substrate;

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getBatches());
  }, []);

  useEffect(() => {
    dispatch(getMaterials());
  }, [batches]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(material = {}) {
    setSelectedMaterial(material);
    setIsOpen(true);
  }

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBatches());
    dispatch(getMaterials());
  }, [user, isSuccess, isLoading, isError, message, dispatch]);

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

  useEffect(() => {
    if (finished) {
      dispatch(loadBatchesBySubstrate());
    }
  }, [finished]);

  const barData = {
    labels: ["Kusot", "Dayami", "Mixed"],
    datasets: [
      {
        label: "Total Harvests",
        backgroundColor: "#BCDEA2",
        data: [
          getBatchesHarvestSum(kusot),
          getBatchesHarvestSum(dayami),
          getBatchesHarvestSum(mixed),
        ],
      },
      {
        label: "Total Defects",
        backgroundColor: "#A29072",
        data: [
          getBatchesDefectsSum(kusot),
          getBatchesDefectsSum(dayami),
          getBatchesDefectsSum(mixed),
        ],
      },
    ],
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

  useEffect(() => {
    dispatch(getPurchases());
    dispatch(getMaterials());
  }, []);

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getBatches());
  }, []);

  useEffect(() => {
    dispatch(getMaterials());
    console.log("created");
  }, [batches, dispatch]);

  return (
    <>
      <Transition appear show={isPurchaseModalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-20'
          onClose={() => setIsPurchaseModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-dark-700 bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='bg-light-100 w-full max-w-lg transform overflow-hidden rounded-2xl pl-12 pr-12 pb-12 text-left align-middle shadow-lg transition-all'>
                  <div className='z-50 -mr-6 mb-2 mt-6 flex justify-end'>
                    <button
                      className='text-xl leading-none flex justify-center items-center hover:text-red-500'
                      onClick={() => setIsPurchaseModalOpen(false)}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                  <PurchaseForm />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isTaskModalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-20'
          onClose={() => setIsTaskModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-dark-700 bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='overflow-y-scroll scrollbar-hidden bg-light-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all  flex flex-col'>
                  <div className='w-full flex items-center justify-start mb-6'>
                    <Dialog.Title as='h3' className='poppins-heading-6 w-full'>
                      {selectedTask.name}
                    </Dialog.Title>
                    <button
                      className='hover:text-red-700 flex items-center'
                      onClick={() => setIsTaskModalOpen(false)}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                  <div className='h-full mb-8'>
                    <p className='open-paragraph-sm'>
                      <span className='font-bold'>Phase: </span>
                      {selectedTask.for}
                    </p>
                    <p className='open-paragraph-sm'>
                      <span className='font-bold'>Description: </span>
                      {selectedTask.description}
                    </p>
                    <p className='open-paragraph-sm'>
                      <span className='font-bold'>Status: </span>
                      {selectedTask.status}
                    </p>
                    <p className='open-paragraph-sm'>
                      <span className='font-bold'>Frequency: </span>
                      {selectedTask.frequency}
                    </p>
                    <p className='open-paragraph-sm'>
                      <span className='font-bold'>Time: </span>
                      {selectedTask.time}
                    </p>
                    <p className='open-paragraph-sm'>
                      <span className='font-bold'>Occurence: </span>
                      {selectedTask.occurence}
                    </p>
                    {/* <pre>{JSON.stringify(selectedTask, null, 2)}</pre> */}
                  </div>
                  <button
                    type='button'
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-20' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-dark-700 bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='bg-light-100 w-full max-w-lg transform overflow-hidden rounded-2xl pl-12 pr-12 pb-12 text-left align-middle shadow-lg transition-all'>
                  <div className='z-50 -mr-6 mb-2 mt-6 flex justify-end'>
                    <button
                      className='text-xl leading-none flex justify-center items-center hover:text-red-500'
                      onClick={closeModal}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                  <MaterialForm material={selectedMaterial} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className='flex flex-row'>
        <div className='w-0 lg:w-1/6'>
          <SideNavBar />
        </div>

        <div className='flex flex-col w-full lg:w-5/6 min-h-screen' id='top'>
          <div className='w-full'>
            <TopNavBar pageName='Home' />
          </div>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8 px-4 md:px-6 lg:px-9'>
            <div className='w-full flex p-4 gap-2 rounded-lg bg-light-100 shadow items-center'>
              <img src={Images.Composting} alt='' className='w-10 h-10' />
              <div className='flex flex-col'>
                <h4 className='poppins-paragrap-sm lg:poppins-paragraph font-bold text-primary-500'>
                  Composting
                </h4>
                <p className='open-paragraph-sm'>
                  {batches.composting ? batches.composting.length : 0} batches
                </p>
              </div>
            </div>
            <div className='w-full flex p-4 gap-2 rounded-lg bg-light-100 shadow items-center'>
              <img src={Images.Bagging} alt='' className='w-10 h-10' />
              <div className='flex flex-col'>
                <h4 className='poppins-paragrap-sm lg:poppins-paragraph font-bold text-primary-500'>
                  Bagging
                </h4>
                <p className='open-paragraph-sm'>
                  {batches.bagging ? batches.bagging.length : 0} batches
                </p>
              </div>
            </div>
            <div className='w-full flex p-4 gap-2 rounded-lg bg-light-100 shadow items-center'>
              <img src={Images.Sterilizing} alt='' className='w-10 h-10' />
              <div className='flex flex-col'>
                <h4 className='poppins-paragrap-sm lg:poppins-paragraph font-bold text-primary-500'>
                  Sterilization
                </h4>
                <p className='open-paragraph-sm'>
                  {batches.sterilization ? batches.sterilization.length : 0}{" "}
                  batches
                </p>
              </div>
            </div>
            <div className='w-full flex p-4 gap-2 rounded-lg bg-light-100 shadow items-center'>
              <img src={Images.Inoculation} alt='' className='w-10 h-10' />
              <div className='flex flex-col'>
                <h4 className='poppins-paragrap-sm lg:poppins-paragraph font-bold text-primary-500'>
                  Inoculation
                </h4>
                <p className='open-paragraph-sm'>
                  {batches.inoculation ? batches.inoculation.length : 0} batches
                </p>
              </div>
            </div>
            <div className='w-full flex p-4 gap-2 rounded-lg bg-light-100 shadow items-center'>
              <img src={Images.Fruiting} alt='' className='w-10 h-10' />
              <div className='flex flex-col'>
                <h4 className='poppins-paragrap-sm lg:poppins-paragraph font-bold text-primary-500'>
                  Fruiting
                </h4>
                <p className='open-paragraph-sm'>
                  {batches.fruiting ? batches.fruiting.length : 0} batches
                </p>
              </div>
            </div>
          </div>

          <div className='w-full mt-8 py-4 px-4 md:px-6 lg:px-9 flex flex-col lg:flex-row gap-8'>
            <section className='w-full lg:w-1/2 flex flex-col lg:flex-row'>
              <div className='flex flex-col w-full'>
                <div className='flex gap-4 mb-6 w-full'>
                  <PrimaryButton
                    className='w-1/2 text-xl leading-none flex justify-center items-center'
                    name='Add Purchase'
                    onClick={() => setIsPurchaseModalOpen(true)}
                  />
                  <PrimaryButton
                    className='w-1/2 text-xl leading-none flex justify-center items-center'
                    name='Add New Material'
                    onClick={openModal}
                  />
                </div>

                <div className='p-4 md:p-6 lg:p-12 w-full bg-white rounded-3xl shadow'>
                  {/* <Bar
                    data={barData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Monthly Harvest per Substrate",
                          fontSize: 24,
                        },
                      },
                    }}
                  /> */}
                  <AnalyticsHarvestByTime />
                </div>
              </div>
            </section>
            <section className='w-full lg:w-1/2 flex flex-col lg:flex-row'>
              <WeeklyTaskList
                setIsTaskModalOpen={(state) => setIsTaskModalOpen(state)}
                setSelectedTask={(task) => setSelectedTask(task)}
              />
            </section>
          </div>
          <BackToTopButton />
        </div>
      </div>
    </>
  );
};
