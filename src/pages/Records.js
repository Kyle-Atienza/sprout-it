import React from "react";
import { SideNavBar, TopNavBar, BatchDetails } from "../components";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { DeleteFilled, EditFilled, CloseOutlined } from "@ant-design/icons";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBatches } from "../features/batch/batchSlice";
import { getMaterials } from "../features/inventory/inventorySlice";

export const Records = () => {
  const dispatch = useDispatch();

  let [isOpen, setIsOpen] = useState(false);
  let [selectedBatch, setSelectedBatch] = useState("");
  const [totalDefects, setTotalDefects] = useState(0);

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.user
  );
  const { batches, finished } = useSelector((state) => state.batch);

  useEffect(() => {
    dispatch(getBatches());
    dispatch(getMaterials());
  }, [user, isSuccess, isLoading, isError, message, dispatch]);

  const getDefectsSum = (batch) => {
    let defectsSum = 0;
    const defectedPhase = Object.keys(batch).filter(
      (key) => batch[key].defects
    );
    defectedPhase.forEach((phase) => {
      defectsSum += batch[phase].defects;
    });
    return defectsSum
  }

  const getHarvestSum = (batch) => {
    let totalHarvest = 0;
    batch.harvests.forEach(harvest => {
      totalHarvest += harvest.weight 
    })
    return totalHarvest
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-20'
          onClose={() => setIsOpen(false)}
        >
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
                <Dialog.Panel className='overflow-y-scroll scrollbar-hidden bg-light-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all h-[40rem] flex flex-col'>
                  <div className='w-full flex items-center justify-start mb-3'>
                    <Dialog.Title as='h3' className='poppins-heading-6 w-full'>
                      Batch {selectedBatch.name}
                    </Dialog.Title>
                    <button
                      className='hover:text-red-700 flex items-center'
                      onClick={() => setIsOpen(false)}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                  <div className='dates my-3 flex gap-7'>
                    <div className='dates-started flex flex-col gap-1'>
                      <p className='open-paragraph-sm'>Date Started</p>
                      <h6 className='open-paragraph font-bold'>
                        {new Date(selectedBatch.createdAt).toLocaleDateString(
                          "en-ph"
                        )}
                      </h6>
                    </div>
                    <div className='dates-started flex flex-col gap-1'>
                      <p className='open-paragraph-sm'>Date Finished</p>
                      <h6 className='open-paragraph font-bold'>
                        {new Date(selectedBatch.finishedAt).toLocaleDateString(
                          "en-ph"
                        )}
                      </h6>
                    </div>
                  </div>
                  <BatchDetails batch={selectedBatch} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className='flex flex-row w-screen'>
        <div className='w-0 lg:w-1/6'>
          <SideNavBar />
        </div>

        <div className='flex flex-col w-full lg:w-5/6 min-h-screen'>
          <div className='w-full'>
            <TopNavBar pageName='Records' />
          </div>

          <div className='overflow-x-auto relative harvests-table mx-10 my-6 shadow-md bg-light-100 rounded-xl'>
            <table className='w-full text-sm text-left'>
              <thead className=' poppins-paragraph text-secondary-300'>
                <tr>
                  <th scope='col' className='py-4 px-6'>
                    Batch #
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Date Started
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Date Finished
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Total Harvests
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Total Defects
                  </th>
                </tr>
              </thead>
              <tbody className='poppins-paragraph-sm '>
                {finished.map((batch) => {
                  return (
                    <tr
                      key={batch.name}
                      className='bg-light-100 hover:bg-light-200 border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out cursor-pointer'
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedBatch(batch);
                      }}
                    >
                      <td className='py-4 px-6'>Batch {batch.name}</td>
                      <td className='py-4 px-6'>
                        {new Date(batch.createdAt).toLocaleDateString("en-ph")}
                      </td>
                      <td className='py-4 px-6'>
                        {new Date(batch.finishedAt).toLocaleDateString("en-ph")}
                      </td>
                      <td className='py-4 px-6'>
                        {getHarvestSum(batch)}
                      </td>
                      <td className='py-4 px-6'>
                        {getDefectsSum(batch)}
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
