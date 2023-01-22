import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteMaterial } from "../features/inventory/inventorySlice";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const MaterialCard = ({ editMaterial, material, index }) => {
  const dispatch = useDispatch();

  const date = new Date(material.updatedAt).toDateString();
  const { user } = useSelector((state) => state.user);

  let [isOpen, setIsOpen] = useState(false);
  const [modalSetup, setModalSetup] = useState({
    message: "",
    action: null,
    toggled: false,
  });

  const onDeleteMaterial = () => {
    modalSetup({
      message: `${
        material.quantity ? "Material still has quantity," : ""
      } Are you sure you want to delete it?`,
      action: null,
      toggled: true,
    });

    // dispatch(deleteMaterial(material._id));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const validateAccess = (callback) => {
    if (user.role === "owner") {
      callback();
    } else {
      alert("Restricted to Owner Only");
    }
  };
  return (
    <>
      <Transition appear show={modalSetup.toggled} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() =>
            setModalSetup({ message: "", action: null, toggled: false })
          }
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
                  <div className="w-full flex flex-col items-center justify-start mb-6">
                    <Dialog.Title as="h3" className="poppins-heading-6 w-full">
                      Confirm End Task
                    </Dialog.Title>
                    <p className="my-4">{modalSetup.message}</p>
                    <div className="flex gap-x-4">
                      <button
                        type="button"
                        className={`py-4 px-6 rounded-full poppins-button border-2 border-red-500 hover:bg-red-500 hover:text-light-100 text-red-500 shadow transition-all `}
                        onClick={modalSetup.action}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`py-4 px-6 rounded-full poppins-button bg-red-500 hover:bg-red-700 text-light-100 shadow transition-all `}
                        onClick={() =>
                          setModalSetup({
                            message: "",
                            action: null,
                            toggled: false,
                          })
                        }
                      >
                        No
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
                    ></button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
              <EditOutlined onClick={() => validateAccess(editMaterial)} />
            </button>
            <button className="hover:text-red-600 flex items-center">
              <DeleteOutlined
                onClick={() => validateAccess(onDeleteMaterial)}
              />
            </button>
          </div>
        </div>
        <p className="text-left open-paragraph-sm">{material.altName}</p>
        <div className="flex justify-center items-center mx-4 my-8">
          <h4 className="text-center poppins-heading-3 text-secondary-400">
            {material.quantity}&nbsp;{material.unit}
          </h4>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-left open-paragraph-sm">Last updated</p>
            <p className="text-left open-paragraph-sm font-bold">{date}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-left open-paragraph-sm">Price</p>
            <p className="text-left open-paragraph-sm font-bold">
              {material.price.toLocaleString("en-PH", {
                currency: "PHP",
                style: "currency",
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
