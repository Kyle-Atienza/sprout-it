import React from "react";
import {
  SideNavBar,
  TopNavBar,
  PrimaryButton,
  MaterialForm,
  MaterialCard,
  BackToTopButton,
} from "../components";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { EditOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMaterials } from "../features/inventory/inventorySlice";
import { getBatches } from "../features/batch/batchSlice";

export const Inventory = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState({});

  const { user } = useSelector((state) => state.user);
  const { materials } = useSelector((state) => state.inventory);
  const { batches } = useSelector((state) => state.batch);

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
    if (user.role === "owner") {
      setSelectedMaterial(material);
      setIsOpen(true);
    } else {
      alert("Restricted to Owner Only");
    }
  }
  return (
    <>
      <div className="flex flex-row">
        <div className="w-0 lg:w-1/6">
          <SideNavBar />
        </div>

        <div className="flex flex-col w-full lg:w-5/6 min-h-screen" id="top">
          <div className="w-full">
            <TopNavBar pageName="Inventory" />
          </div>

          <div className="search mx-10 mt-16 flex justify-start">
            <PrimaryButton
              className="text-xl leading-none flex justify-center items-center"
              name="Add New Material"
              onClick={openModal}
            />

            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-20" onClose={closeModal}>
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
                      <Dialog.Panel className="bg-light-100 w-full max-w-lg transform overflow-hidden rounded-2xl pl-12 pr-12 pb-12 text-left align-middle shadow-lg transition-all">
                        <div className="z-50 -mr-6 mb-2 mt-6 flex justify-end">
                          <button
                            className="text-xl leading-none flex justify-center items-center hover:text-red-500"
                            onClick={closeModal}
                          >
                            <CloseOutlined />
                          </button>
                        </div>
                        <MaterialForm
                          material={selectedMaterial}
                          closeModal={closeModal}
                        />
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>

          <div className="w-full px-10 my-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {materials
              .filter((material) => !material.isHidden)
              .map((material, index) => {
                return (
                  <MaterialCard
                    key={index}
                    editMaterial={() => openModal(material)}
                    material={material}
                    index={index}
                  />
                );
              })}
          </div>
          <BackToTopButton />
        </div>
      </div>
    </>
  );
};
