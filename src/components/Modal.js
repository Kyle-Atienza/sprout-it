import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { PrimaryButton } from "../components";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

export const Modal = ({ children }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <PrimaryButton
        className='hidden text-xl leading-none md:flex justify-center items-center'
        name='Start a new batch'
        onClick={openModal}
      />
      <button
        className='block md:hidden w-12 h-12 mx-4 text-xl pb-0.5 leading-none text-light-100 rounded-full bg-primary-400 hover:bg-primary-500 shadow transition-all'
        onClick={openModal}
      >
        <PlusOutlined />
      </button>

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

                  {children}
                  {/* <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Start Production
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
