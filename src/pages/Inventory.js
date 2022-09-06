import React from "react";
import {
  SideNavBar,
  TopNavBar,
  PrimaryButton,
  AddMaterialsForm,
  Modal,
} from "../components";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { DeleteFilled, EditFilled, CloseOutlined } from "@ant-design/icons";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBatches } from "../features/batch/batchSlice";

export const Inventory = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className='flex flex-row w-screen'>
        <div className='w-0 lg:w-1/6'>
          <SideNavBar />
        </div>

        <div className='flex flex-col w-full lg:w-5/6 min-h-screen'>
          <div className='w-full'>
            <TopNavBar pageName='Inventory' />
          </div>

          <div className='search mx-10 mt-16 flex justify-between'>
            <input
              type='text'
              className='rounded-full border-0 shadow-md bg-light-100 poppins-paragraph-sm px-5 py-3 placeholder:opacity-50 w-80'
              placeholder='Search Inventory'
            />
            <PrimaryButton
              className='hidden text-xl leading-none md:flex justify-center items-center'
              name='Start a new batch'
              onClick={openModal}
            />

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
                      <Dialog.Panel className='bg-light-100 w-full max-w-lg transform overflow-hidden rounded-2xl p-12 text-left align-middle shadow-lg transition-all'>
                        <div className='-mb-6 flex justify-end'>
                          <button
                            className='text-xl leading-none flex justify-center items-center hover:text-red-500'
                            onClick={closeModal}
                          >
                            <CloseOutlined />
                          </button>
                        </div>
                        <AddMaterialsForm />
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>

          <div className='overflow-x-auto relative harvests-table mx-10 my-6 shadow-md bg-light-100 rounded-xl'>
            <table className='w-full text-sm text-left'>
              <thead className=' poppins-paragraph text-secondary-300'>
                <tr>
                  <th scope='col' className='py-4 px-6'>
                    Item Name
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Unit
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Quantity
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Price Per Unit
                  </th>
                </tr>
              </thead>
              <tbody className='poppins-paragraph-sm '>
                <tr>
                  <td className='py-4 px-6'>Lorem ipsum</td>
                  <td className='py-4 px-6'>Lorem ipsum</td>
                  <td className='py-4 px-6'>Lorem ipsum</td>
                  <td className='py-4 px-6'>Lorem ipsum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};