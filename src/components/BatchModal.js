import React from "react";
import { Fragment } from "react";
import { Transition, Dialog, Disclosure } from "@headlessui/react";
import { CloseOutlined } from "@ant-design/icons";

// import { BatchDetails } from "./BatchDetails";
import { BatchDetails, PrimaryButton, TaskForm } from "../components";

export const BatchModal = ({
  selectedBatch,
  setIsBatchModalOpen,
  setIsConfirmBatchModalOpen,
  handleSubmitTask,
}) => {
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

  return (
    <div>
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
                    Batch 7 Details
                  </Dialog.Title>
                  <button
                    className="hover:text-red-700 flex items-center"
                    onClick={() => setIsBatchModalOpen(false)}
                  >
                    <CloseOutlined />
                  </button>
                </div>
                <BatchDetails batch={selectedBatch} />
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
    </div>
  );
};
