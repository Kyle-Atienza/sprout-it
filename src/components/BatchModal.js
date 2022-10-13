import { CloseOutlined } from "@ant-design/icons";
import { Dialog, Disclosure } from "@headlessui/react";
import {
  BatchDetails,
  HarvestForm,
  TaskForm,
  PrimaryButton,
} from "../components";
import React from "react";

export const BatchModal = ({
  batch,
  closeModal,
  openBatchHarvestModal,
  openConfirmModal,
  handleSubmitTask,
}) => {
  const mapButtonByPhase = (phase) => {
    if (phase === "fruiting") {
      return <PrimaryButton name="Finish Batch" onClick={openConfirmModal} />;
    } else if (phase === "post") {
      return <PrimaryButton name="End Batch" onClick={openConfirmModal} />;
    } else {
      return (
        <PrimaryButton name="Start Next Phase" onClick={openConfirmModal} />
      );
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-start mb-6">
        <Dialog.Title as="h3" className="poppins-heading-6 w-full">
          Batch {batch.name} Details
        </Dialog.Title>
        <button
          className="hover:text-red-700 flex items-center"
          onClick={closeModal()}
        >
          <CloseOutlined />
        </button>
      </div>
      <BatchDetails batch={batch} />
      {batch.activePhase === "fruiting" ? (
        <Disclosure>
          <Disclosure.Button className="mb-4 py-4 px-6 rounded-full poppins-button bg-transparent text-primary-500 hover:text-light-100 border-primary-400 hover:border-primary-500 border-2 hover:bg-primary-500 shadow transition-all disabled:opacity-50">
            Record Harvest
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            <HarvestForm
              selectedBatch={batch}
              openModal={openBatchHarvestModal}
            />
          </Disclosure.Panel>
        </Disclosure>
      ) : null}
      <Disclosure>
        <Disclosure.Button className="mb-4 py-4 px-6 rounded-full poppins-button bg-transparent text-primary-500 hover:text-light-100 border-primary-400 hover:border-primary-500 border-2 hover:bg-primary-500 shadow transition-all disabled:opacity-50">
          Add Task
        </Disclosure.Button>
        <Disclosure.Panel className="text-gray-500">
          <TaskForm batch={batch} closeModal={handleSubmitTask} />
        </Disclosure.Panel>
      </Disclosure>
      {mapButtonByPhase(batch.activePhase)}
    </>
  );
};

export default BatchModal;
