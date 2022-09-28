import React from "react";
import {
  SideNavBar,
  TopNavBar,
  PrimaryButton,
  AddNewMaterialForm,
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

  let [isOpen, setIsOpen] = useState(false);

  const { materials } = useSelector((state) => state.inventory);
  const { batches } = useSelector((state) => state.batch);

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getBatches());
  }, []);

  useEffect(() => {
    dispatch(getMaterials());
    console.log("created");
  }, [batches]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="flex flex-row w-screen">
        <div className="w-0 lg:w-1/6">
          <SideNavBar />
        </div>

        <div className="flex flex-col w-full lg:w-5/6 min-h-screen">
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
                        <AddNewMaterialForm />
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>

          {/* <div className='overflow-x-auto relative harvests-table mx-10 my-6 shadow-md bg-light-100 rounded-xl'>
            <table className='w-full text-sm text-left'>
              <thead className=' poppins-paragraph text-secondary-300'>
                <tr>
                  <th scope='col' className='py-4 px-6'>
                    Item Name
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Alt Name
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Unit
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Quantity
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Supplier
                  </th>
                </tr>
              </thead>
              <tbody className='poppins-paragraph-sm '>
                {materials.map((material, index) => {
                  return (
                    <tr
                      key={index}
                      className='bg-light-100 hover:bg-light-200 border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out cursor-pointer'
                    >
                      <td className='py-4 px-6'>{material.name}</td>
                      <td className='py-4 px-6'>{material.altName}</td>
                      <td className='py-4 px-6'>{material.unit}</td>
                      <td className='py-4 px-6'>{material.quantity}</td>
                      <td className='py-4 px-6'>{material.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div> */}

          <div className="w-full px-10 my-6 grid gap-4 grid-flow-col md:grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {materials.map((material, index) => {
              const date = new Date(material.updatedAt).toDateString();
              return (
                <div
                  className="p-6 flex flex-col shadow-md bg-light-100 rounded-xl"
                  key={index}
                >
                  <div className="flex flex-row justify-between items-start">
                    <h3 className="poppins-heading-6 text-primary-500">
                      {material.name}
                    </h3>
                    <div className="flex gap-4">
                      <button className="hover:text-secondary-400 flex items-center">
                        <EditOutlined />
                      </button>
                      <button className="hover:text-red-600 flex items-center">
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                  <p className="text-left open-paragraph-sm">
                    {material.altName}
                  </p>
                  <div className="flex justify-center items-center mx-4 my-8">
                    <h4 className="text-center poppins-heading-3 text-secondary-400">
                      {material.quantity}&nbsp;{material.unit}
                    </h4>
                  </div>
                  <p className="text-left open-paragraph-sm">Last updated</p>
                  <p className="text-left open-paragraph-sm font-bold">
                    {date}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
