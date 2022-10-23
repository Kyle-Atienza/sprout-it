import React, { useEffect, Fragment, useState } from "react";
import {
  SideNavBar,
  TopNavBar,
  PrimaryButton,
  PurchaseForm,
  SupplierForm,
} from "../components";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { CloseOutlined } from "@ant-design/icons";
import { getMaterials } from "../features/inventory/inventorySlice";
import { getPurchases } from "../features/financial/financialSlice";
import {
  getSuppliers,
  deleteSupplier,
} from "../features/supplier/supplierSlice";

export const Financials = () => {
  const dispatch = useDispatch();

  const { purchases } = useSelector((state) => state.financial);
  const { suppliers } = useSelector((state) => state.supplier);
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getPurchases());
    dispatch(getMaterials());
    dispatch(getSuppliers());
  }, []);

  const onDeleteSupplier = (id) => {
    dispatch(deleteSupplier(id));
    dispatch(getSuppliers());
  };

  const onEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setIsSupplierModalOpen(true);
  };

  var formatter = new Intl.NumberFormat("tl-PH", {
    style: "currency",
    currency: "PHP",
  });

  return (
    <>
      <Transition appear show={isPurchaseModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsPurchaseModalOpen(false)}
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
                <Dialog.Panel className="bg-light-100 w-full max-w-lg transform overflow-hidden rounded-2xl pl-12 pr-12 pb-12 text-left align-middle shadow-lg transition-all">
                  <div className="z-50 -mr-6 mb-2 mt-6 flex justify-end">
                    <button
                      className="text-xl leading-none flex justify-center items-center hover:text-red-500"
                      onClick={() => setIsPurchaseModalOpen(false)}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                  <PurchaseForm
                    openSupplierModal={() => setIsSupplierModalOpen(true)}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isSupplierModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsSupplierModalOpen(false)}
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
                <Dialog.Panel className="bg-light-100 w-full max-w-lg transform overflow-hidden rounded-2xl pl-12 pr-12 pb-12 text-left align-middle shadow-lg transition-all">
                  <div className="z-50 -mr-6 mb-2 mt-6 flex justify-end">
                    <button
                      className="text-xl leading-none flex justify-center items-center hover:text-red-500"
                      onClick={() => setIsSupplierModalOpen(false)}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                  <SupplierForm
                    supplier={selectedSupplier}
                    closeForm={() => {
                      setIsSupplierModalOpen(false);
                    }}
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
            <TopNavBar pageName="Financials" />
          </div>

          <Tab.Group>
            <Tab.List className="mx-10 mt-16 flex gap-2 scrollbar pb-2 flex-shrink-0">
              <Tab
                className={({ selected }) =>
                  selected
                    ? "open-paragraph px-4 py-3 bg-primary-200 rounded-xl disabled:opacity-50 whitespace-nowrap"
                    : "open-paragraph px-4 py-3 bg-light-100 hover:bg-primary-100 rounded-xl disabled:opacity-50 whitespace-nowrap"
                }
              >
                Purchases
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? "open-paragraph px-4 py-3 bg-primary-200 rounded-xl disabled:opacity-50 whitespace-nowrap"
                    : "open-paragraph px-4 py-3 bg-light-100 hover:bg-primary-100 rounded-xl disabled:opacity-50 whitespace-nowrap"
                }
              >
                Suppliers
              </Tab>
            </Tab.List>
            <Tab.Panels className="py-5 flex-1">
              <Tab.Panel>
                <div className="search mx-10 mt-4 flex justify-between">
                  <PrimaryButton
                    className="text-xl leading-none flex justify-center items-center"
                    name="Add Purchase"
                    onClick={() => setIsPurchaseModalOpen(true)}
                  />
                </div>

                <div className="overflow-x-auto harvests-table mx-10 my-6 shadow-md bg-light-100 rounded-xl">
                  <table className="w-full text-sm text-left">
                    <thead className=" poppins-paragraph text-secondary-300">
                      <tr>
                        <th scope="col" className="py-4 px-6">
                          Material
                        </th>
                        <th scope="col" className="py-4 px-6">
                          Quantity
                        </th>
                        <th scope="col" className="py-4 px-6">
                          Price
                        </th>
                        <th scope="col" className="py-4 px-6">
                          Total
                        </th>
                        <th scope="col" className="py-4 px-6">
                          Supplier
                        </th>
                        <th scope="col" className="py-4 px-6">
                          Purchase On
                        </th>
                      </tr>
                    </thead>
                    <tbody className="poppins-paragraph-sm ">
                      {purchases.map((purchase, index) => {
                        return (
                          <tr
                            key={index}
                            className="bg-light-100 hover:bg-light-200 border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
                          >
                            <td className="py-4 px-6">
                              {purchase.material.name}
                            </td>
                            <td className="py-4 px-6">
                              {`${purchase.quantity} ${purchase.material.unit}`}
                            </td>
                            <td className="py-4 px-6">
                              {formatter.format(
                                purchase.material.price
                                  ? purchase.material.price
                                  : 0
                              )}
                            </td>
                            <td className="py-4 px-6">
                              {formatter.format(
                                (purchase.material.price
                                  ? purchase.material.price
                                  : 0) * purchase.quantity
                              )}
                            </td>

                            <td className="py-4 px-6">
                              {purchase.supplier.name}
                            </td>
                            <td className="py-4 px-6">
                              {new Date(purchase.createdAt)
                                .toDateString()
                                .slice(4)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <div className="search mx-10 mt-4 flex justify-between">
                  <PrimaryButton
                    className="text-xl leading-none flex justify-center items-center"
                    name="Add Purchase"
                    onClick={() => setIsPurchaseModalOpen(true)}
                  />
                </div>

                <div className="overflow-x-auto harvests-table mx-10 my-6 shadow-md bg-light-100 rounded-xl">
                  <table className="w-full text-sm text-left">
                    <thead className=" poppins-paragraph text-secondary-300">
                      <tr>
                        <th scope="col" className="py-4 px-6">
                          Supplier
                        </th>
                        <th scope="col" className="py-4 px-6">
                          Address
                        </th>
                        <th scope="col" className="py-4 px-6">
                          Contact
                        </th>
                        <th scope="col" className="py-4 px-6"></th>
                        <th scope="col" className="py-4 px-6"></th>
                      </tr>
                    </thead>

                    <tbody className="poppins-paragraph-sm ">
                      {suppliers.map((supplier, index) => {
                        return (
                          <tr
                            key={index}
                            className="bg-light-100 hover:bg-light-200 border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
                          >
                            <td className="py-4 px-6">{supplier.name}</td>
                            <td className="py-4 px-6">{supplier.address}</td>
                            <td className="py-4 px-6">{supplier.address}</td>
                            <td className="py-4 px-6">
                              <button onClick={() => onEditSupplier(supplier)}>
                                <EditFilled />
                              </button>
                            </td>
                            <td className="py-4 px-6">
                              <button
                                onClick={() => onDeleteSupplier(supplier._id)}
                              >
                                <DeleteFilled />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
};
