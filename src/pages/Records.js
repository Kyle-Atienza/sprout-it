import React from "react";
import { SideNavBar, TopNavBar } from "../components";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBatches } from "../features/batch/batchSlice";

export const Records = () => {
  const dispatch = useDispatch();

  let [isOpen, setIsOpen] = useState(false);
  let [selectedBatch, setSelectedBatch] = useState("");

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.user
  );
  const { batches, finished } = useSelector((state) => state.batch);

  useEffect(() => {
    dispatch(getBatches());
  }, [user, isSuccess, isLoading, isError, message, dispatch]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsOpen(false)}
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
                <Dialog.Panel className="bg-primary-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all h-[30rem] flex flex-col">
                  <Dialog.Title as="h3" className="poppins-heading-3">
                    Batch {selectedBatch.name}
                  </Dialog.Title>
                  <div className="dates mt-3 flex gap-7">
                    <div className="dates-started flex flex-col gap-1">
                      <p className="open-paragraph-sm">Date Started</p>
                      <h6 className="poppins-heading-6">
                        {new Date(selectedBatch.createdAt).toLocaleDateString(
                          "en-ph"
                        )}
                      </h6>
                    </div>
                    <div className="dates-started flex flex-col gap-1">
                      <p className="open-paragraph-sm">Date Finished</p>
                      <h6 className="poppins-heading-6">
                        {new Date(selectedBatch.finishedAt).toLocaleDateString(
                          "en-ph"
                        )}
                      </h6>
                    </div>
                  </div>
                  <Tab.Group>
                    <Tab.List className="flex gap-2 mt-7 overflow-x-scroll pb-2">
                      <Tab className="poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl">
                        Materials
                      </Tab>
                      <Tab className="poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl">
                        Composting
                      </Tab>
                      <Tab className="poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl">
                        Bagging
                      </Tab>
                      <Tab className="poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl">
                        Sterilizing
                      </Tab>
                      <Tab className="poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl">
                        Inoculation
                      </Tab>
                      <Tab className="poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl">
                        Fruiting
                      </Tab>
                    </Tab.List>
                    <Tab.Panels className="py-5 flex-1">
                      <Tab.Panel>
                        <div>
                          <table className="w-full text-sm text-left">
                            <thead className=" poppins-paragraph ">
                              <tr>
                                <th scope="col" className="py-2">
                                  Material
                                </th>
                                <th scope="col" className="py-2">
                                  Quantity
                                </th>
                              </tr>
                            </thead>
                            <tbody className="poppins-paragraph-sm ">
                              <tr className="transition-all duration-300 ease-in-out cursor-pointer">
                                <td className="py-2">Kusot</td>
                                <td className="py-2">12 kg</td>
                              </tr>
                              <tr className="transition-all duration-300 ease-in-out cursor-pointer">
                                <td className="py-2">Kusot</td>
                                <td className="py-2">12 kg</td>
                              </tr>
                              <tr className="transition-all duration-300 ease-in-out cursor-pointer">
                                <td className="py-2">Kusot</td>
                                <td className="py-2">12 kg</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div>
                          <p className="poppins-paragraph">
                            27 days composting
                          </p>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="">
                          <p className="poppins-paragraph">
                            200 days composting
                          </p>
                          <p className="poppins-paragraph">1kg bag weight</p>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="">
                          <p className="poppins-paragraph">
                            8 hours Sterilization
                          </p>
                        </div>
                        <div className="mt-auto">
                          <p className="poppins-paragraph">2 defects</p>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="">
                          <p className="poppins-paragraph">
                            198 Total Inoculated
                          </p>
                          <p className="poppins-paragraph">F2 Sorgum Spawn</p>
                        </div>
                        <div className="mt-auto">
                          <p className="poppins-paragraph">4 defects</p>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="">
                          <p className="poppins-paragraph">
                            194 total bags for fruiting
                          </p>
                          <p className="poppins-paragraph">
                            2 weeks waiting time
                          </p>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="flex flex-row w-screen">
        <div className="w-1/6">
          <SideNavBar />
        </div>

        <div className="flex flex-col w-full lg:w-5/6 min-h-screen">
          <div className="w-full">
            <TopNavBar pageName="Records" />
          </div>

          <div className="search mx-10 mt-16">
            <input
              type="text"
              className="rounded-full border-0 shadow-md bg-light-100 poppins-paragraph-sm px-5 py-3 placeholder:opacity-50 w-80"
              placeholder="Search Batches"
            />
          </div>

          <div className="overflow-x-auto relative harvests-table mx-10 my-6 shadow-md bg-light-100 rounded-xl">
            <table className="w-full text-sm text-left">
              <thead className=" poppins-paragraph text-secondary-300">
                <tr>
                  <th scope="col" className="py-4 px-6">
                    Batch #
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Date Started
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Date Finished
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Harvests
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Loss
                  </th>
                  <th scope="col" className="py-4 px-6 text-center w-[1%]">
                    Edit
                  </th>
                  <th scope="col" className="py-4 px-6 text-center w-[1%]">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="poppins-paragraph-sm ">
                {finished.map((batch) => {
                  return (
                    <tr
                      key={batch.name}
                      className="bg-light-100 hover:bg-light-200 border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedBatch(batch);
                      }}
                    >
                      <td className="py-4 px-6">Batch {batch.name}</td>
                      <td className="py-4 px-6">
                        {new Date(batch.createdAt).toLocaleDateString("en-ph")}
                      </td>
                      <td className="py-4 px-6">
                        {new Date(selectedBatch.finishedAt).toLocaleDateString(
                          "en-ph"
                        )}
                      </td>
                      <td className="py-4 px-6">$2999</td>
                      <td className="py-4 px-6">$2999</td>
                      <td className="py-4 px-6 text-center">
                        <EditOutlined className="text-lg cursor-pointer" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <DeleteOutlined className="text-lg cursor-pointer" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
