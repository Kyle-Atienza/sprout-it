import React, { useEffect, Fragment, useState } from "react";
import {
  SideNavBar,
  TopNavBar,
  PrimaryButton,
  PurchaseForm,
  SupplierForm,
  BackToTopButton,
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
import { Checkbox, Dropdown, Label, Radio, TextInput } from "flowbite-react";
import { filter } from "lodash";

export const Financials = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { purchases } = useSelector((state) => state.financial);
  const { suppliers } = useSelector((state) => state.supplier);
  const { materials } = useSelector((state) => state.inventory);

  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);

  /* const quantityModes = ["many", "fewest"];
  const sortByOptions = ["newest", "quantity"]; */
  const [modalSetup, setModalSetup] = useState({
    title: "",
    message: "",
    action: null,
    toggled: false,
  });

  const [filters, setFilters] = useState({
    sortBy: [
      {
        name: "quantity",
        active: false,
        ascending: true,
      },
      {
        name: "time",
        active: true,
        ascending: true,
      },
    ],
    amount: {
      min: null,
      max: null,
    },
    material: [],
    supplier: [],
  });

  useEffect(() => {
    dispatch(getPurchases());
    dispatch(getMaterials());
    dispatch(getSuppliers());
  }, []);

  useEffect(() => {
    if (!isSupplierModalOpen) setSelectedSupplier({});
  }, [isSupplierModalOpen]);

  const onPurchase = () => {
    if (user.role === "owner") {
      setIsPurchaseModalOpen(true);
    } else {
      alert("Restricted to Owner Only");
    }
  };

  const onDeleteSupplier = (id) => {
    if (user.role === "owner") {
      dispatch(deleteSupplier(id));
      dispatch(getSuppliers());
      setModalSetup({
        message: "",
        action: null,
        toggled: false,
      });
    } else {
      alert("Restricted to Owner Only");
    }
  };

  const onEditSupplier = (supplier) => {
    if (user.role === "owner") {
      setSelectedSupplier(supplier);
      setIsSupplierModalOpen(true);
    } else {
      alert("Restricted to Owner Only");
    }
  };

  var formatter = new Intl.NumberFormat("tl-PH", {
    style: "currency",
    currency: "PHP",
  });

  const onChangeFilter = (e) => {
    console.log(e);

    if (e.target.name === "sortBy") {
      setFilters((prevState) => ({
        ...prevState,
        sortBy: filters.sortBy.map((option) => {
          return {
            ...option,
            active: option.name === e.target.value ? true : false,
            ascending: true,
          };
        }),
      }));
    } else if (e.target.name === "material" || e.target.name === "supplier") {
      if (e.target.checked) {
        setFilters((prevState) => ({
          ...prevState,
          [e.target.name]: [...prevState[e.target.name], e.target.value],
        }));
      } else {
        setFilters((prevState) => ({
          ...prevState,
          [e.target.name]: prevState[e.target.name].filter(
            (supplier) => supplier !== e.target.value
          ),
        }));
      }
    } else if (e.target.name === "amount") {
      setFilters((prevState) => ({
        ...prevState,
        amount: {
          ...prevState.amount,
          [e.target.dataset.amount]: e.target.value,
        },
      }));
    }
  };

  const sortByButton = () => {
    const activeSortBy = filters.sortBy.find((option) => option.active);

    let buttonLabel = "";

    if (activeSortBy.name === "quantity") {
      buttonLabel = activeSortBy.ascending ? "Least" : "Many";
    } else if (activeSortBy.name === "time") {
      buttonLabel = activeSortBy.ascending ? "Newest" : "Oldest";
    }

    if (activeSortBy.name !== "default") {
      return (
        <PrimaryButton
          className="text-xl leading-none flex justify-center items-center"
          name={buttonLabel}
          onClick={() =>
            setFilters((prevState) => ({
              ...prevState,
              sortBy: filters.sortBy.map((option) => {
                return {
                  ...option,
                  ascending:
                    option.name === activeSortBy.name
                      ? !option.ascending
                      : option.ascending,
                };
              }),
            }))
          }
        />
      );
    } else {
      return null;
    }
  };

  const sortByCondition = (a, b) => {
    const activeSortBy = filters.sortBy.find((option) => option.active);

    if (activeSortBy.name === "quantity") {
      return activeSortBy.ascending
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    } else if (activeSortBy.name === "time") {
      return activeSortBy.ascending
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    }
    return true;
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
                    closePurchaseForm={() => setIsPurchaseModalOpen(false)}
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
                    supplierId={selectedSupplier._id}
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

      <div className="flex flex-row">
        <div className="w-0 lg:w-1/6">
          <SideNavBar />
        </div>

        <div className="flex flex-col w-full lg:w-5/6 min-h-screen" id="top">
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
                <div className="search mx-10 mt-4 flex justify-start flex-wrap gap-4">
                  <PrimaryButton
                    className="text-xl leading-none flex justify-center items-center"
                    name="Add Purchase"
                    onClick={onPurchase}
                  />
                  <div className="price-range flex gap-4">
                    <TextInput
                      id="min"
                      class="p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
                      type="number"
                      min={0}
                      name="amount"
                      data-amount="min"
                      placeholder="Min"
                      onChange={onChangeFilter}
                    />
                    <TextInput
                      id="max"
                      class="p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400"
                      type="number"
                      min={0}
                      name="amount"
                      data-amount="max"
                      placeholder="Max"
                      onChange={onChangeFilter}
                    />
                  </div>
                  <div className="drowdown">
                    <Dropdown
                      class="py-1 px-2 rounded-full poppins-button bg-transparent text-primary-500 hover:text-light-100 border-primary-400 hover:border-primary-500 border-2 hover:bg-primary-500 shadow transition-all"
                      label="Materials"
                      dismissOnClick={false}
                    >
                      {materials.map((material) => {
                        return (
                          <Dropdown.Item key={material._id}>
                            <Checkbox
                              id={material.name}
                              name="material"
                              value={material.name.toLowerCase()}
                              onChange={onChangeFilter}
                            />
                            <Label class="ml-2" htmlFor={material.name}>
                              {material.name}
                            </Label>
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown>
                  </div>
                  <div className="drowdown">
                    <Dropdown
                      class="py-1 px-2 rounded-full poppins-button bg-transparent text-primary-500 hover:text-light-100 border-primary-400 hover:border-primary-500 border-2 hover:bg-primary-500 shadow transition-all"
                      label="Supplier"
                      dismissOnClick={false}
                    >
                      {suppliers.map((supplier) => {
                        return (
                          <Dropdown.Item key={supplier._id}>
                            <Checkbox
                              id={supplier.name}
                              name="supplier"
                              value={supplier._id}
                              onChange={onChangeFilter}
                            />
                            <Label class="ml-2" htmlFor={supplier.name}>
                              {supplier.name}
                            </Label>
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown>
                  </div>
                  <div className="drowdown flex gap-4">
                    <Dropdown
                      class="py-1 px-2 rounded-full poppins-button bg-transparent text-primary-500 hover:text-light-100 border-primary-400 hover:border-primary-500 border-2 hover:bg-primary-500 shadow transition-all"
                      label="Sort By"
                      dismissOnClick={false}
                    >
                      <fieldset
                        className="flex flex-col gap-4"
                        id="radio"
                        onChange={onChangeFilter}
                      >
                        {filters.sortBy.map((option, index) => {
                          return (
                            <Dropdown.Item
                              className="flex items-center gap-2"
                              key={index}
                            >
                              <Radio
                                id={option.name}
                                name="sortBy"
                                value={option.name}
                                defaultChecked={option.active}
                              />
                              <Label htmlFor={option.name}>{option.name}</Label>
                            </Dropdown.Item>
                          );
                        })}
                      </fieldset>
                    </Dropdown>
                    {sortByButton()}
                  </div>
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
                      {purchases
                        .slice()
                        .sort((a, b) => {
                          return sortByCondition(a, b);
                        })
                        .filter((purchase) => {
                          const total = purchase.price * purchase.quantity;
                          return filters.amount.max
                            ? total > filters.amount.min &&
                                total < filters.amount.max
                            : total > filters.amount.min;
                        })
                        .filter((purchase) => {
                          return !filters.material.length
                            ? true
                            : filters.material.includes(
                                purchase.material.name.toLowerCase()
                              );
                        })
                        .filter((purchase) => {
                          return !filters.supplier.length
                            ? true
                            : filters.supplier.includes(purchase.supplier._id);
                        })
                        .map((purchase, index) => {
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
                                  purchase.price ? purchase.price : 0
                                )}
                              </td>
                              <td className="py-4 px-6">
                                {formatter.format(
                                  (purchase.material.price
                                    ? purchase.price
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
                    className="py-2 px-4 text-xl leading-none flex justify-center items-center"
                    name="Add Purchase"
                    onClick={onPurchase}
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
                            <td className="py-4 px-6">{supplier.contact}</td>
                            <td className="py-4 px-6">
                              <button onClick={() => onEditSupplier(supplier)}>
                                <EditFilled />
                              </button>
                            </td>
                            <td className="py-4 px-6">
                              <button
                                onClick={() =>
                                  setModalSetup({
                                    message:
                                      "Are you sure you want to delete this supplier ?",
                                    action: () =>
                                      onDeleteSupplier(supplier._id),
                                    toggled: true,
                                  })
                                }
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
          <BackToTopButton />
        </div>
      </div>
    </>
  );
};
