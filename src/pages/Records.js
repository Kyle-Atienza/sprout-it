import React from "react";
import {
  SideNavBar,
  TopNavBar,
  BatchDetails,
  BackToTopButton,
  PrimaryButton,
} from "../components";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { DeleteFilled, EditFilled, CloseOutlined } from "@ant-design/icons";
import { useState, Fragment } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBatches } from "../features/batch/batchSlice";
import { getMaterials } from "../features/inventory/inventorySlice";
import { Checkbox, Dropdown, Label, Radio, TextInput } from "flowbite-react";

export const Records = () => {
  const dispatch = useDispatch();

  const { materials } = useSelector((state) => state.inventory);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [filters, setFilters] = useState({
    sortBy: [
      {
        name: "defects",
        active: false,
        ascending: true,
      },
      {
        name: "harvests",
        active: false,
        ascending: true,
      },
      {
        name: "default",
        active: true,
        ascending: true,
      },
    ],
    active: {
      // month
      min: "",
      max: "",
    },
    material: [],
  });

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.user
  );
  const { finished } = useSelector((state) => state.batch);

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
    return defectsSum;
  };

  const getHarvestSum = (batch) => {
    let totalHarvest = 0;
    batch.harvests.forEach((harvest) => {
      totalHarvest += harvest.weight;
    });
    return totalHarvest;
  };

  const onChangeFilter = (e) => {
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
    } else if (e.target.name === "material") {
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
    } else if (e.target.name === "active") {
      setFilters((prevState) => ({
        ...prevState,
        active: {
          ...prevState.active,
          [e.target.dataset.active]: e.target.value,
        },
      }));
    }
  };

  const sortByButton = () => {
    const activeSortBy = filters.sortBy.find((option) => option.active);

    if (activeSortBy.name !== "default") {
      return (
        <PrimaryButton
          className='text-xl leading-none flex justify-center items-center'
          name={`${activeSortBy.ascending ? "Least" : "Most"} ${
            activeSortBy.name
          }`}
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

    if (activeSortBy.name === "defects") {
      return activeSortBy.ascending
        ? getDefectsSum(a) - getDefectsSum(b)
        : getDefectsSum(b) - getDefectsSum(a);
    } else if (activeSortBy.name === "harvests") {
      return activeSortBy.ascending
        ? Math.round(getHarvestSum(a)) - Math.round(getHarvestSum(b))
        : Math.round(getHarvestSum(b)) - Math.round(getHarvestSum(a));
    }
    return true;
  };

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

      <div className='flex flex-row'>
        <div className='w-0 lg:w-1/6'>
          <SideNavBar />
        </div>

        <div className='flex flex-col w-full lg:w-5/6 min-h-screen' id='top'>
          <div className='w-full'>
            <TopNavBar pageName='Records' />
          </div>

          <div className='flex flex-wrap gap-4 mx-10 mt-16'>
            <div className='dropdown flex gap-2 flex-nowrap'>
              <Dropdown
                class='py-1 px-2 rounded-full poppins-button bg-transparent text-primary-500 hover:text-light-100 border-primary-400 hover:border-primary-500 border-2 hover:bg-primary-500 shadow transition-all'
                label='Sort By'
                dismissOnClick={false}
              >
                <fieldset
                  className='flex flex-col gap-4'
                  id='radio'
                  onChange={onChangeFilter}
                >
                  {filters.sortBy.map((option, index) => {
                    return (
                      <Dropdown.Item
                        className='flex items-center gap-2'
                        key={index}
                      >
                        <Radio
                          id={option.name}
                          name='sortBy'
                          value={option.name}
                          defaultChecked={option.active}
                        />
                        <Label class='ml-2' htmlFor={option.name}>
                          {option.name}
                        </Label>
                      </Dropdown.Item>
                    );
                  })}
                </fieldset>
              </Dropdown>
              {sortByButton()}
            </div>
            <div className='dropdown'>
              <Dropdown
                class='py-1 px-2 rounded-full poppins-button bg-transparent text-primary-500 hover:text-light-100 border-primary-400 hover:border-primary-500 border-2 hover:bg-primary-500 shadow transition-all'
                label='Materials'
              >
                {materials
                  .filter((material) => !material.isHidden)
                  .map((material, index) => {
                    return (
                      <Dropdown.Item key={material._id}>
                        <Checkbox
                          id={material.name}
                          name='material'
                          value={material._id}
                          onChange={onChangeFilter}
                        />
                        <Label class='ml-2' htmlFor={material.name}>
                          {material.name}
                        </Label>
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown>
            </div>
            <div className='active flex flex-wrap gap-2'>
              <div className='flex items-center gap-2'>
                <p className='whitespace-nowrap'>Active from</p>
                <input
                  className='p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
                  type='month'
                  name='active'
                  onChange={onChangeFilter}
                  data-active='min'
                  id=''
                />
              </div>
              <div className='flex items-center gap-2'>
                <p>to</p>
                <input
                  className='p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
                  type='month'
                  name='active'
                  onChange={onChangeFilter}
                  data-active='max'
                  id=''
                />
              </div>
            </div>
          </div>

          <div className='overflow-x-auto harvests-table mx-10 my-6 shadow-md bg-light-100 rounded-xl'>
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
                    Total Harvests (kg)
                  </th>
                  <th scope='col' className='py-4 px-6'>
                    Total Defects (kg)
                  </th>
                </tr>
              </thead>
              <tbody className='poppins-paragraph-sm '>
                {finished
                  .slice()
                  .sort((a, b) => {
                    return sortByCondition(a, b);
                  })
                  .filter((batch) => {
                    return !filters.material.length
                      ? true
                      : batch.materials
                          .map(({ material }) => material._id)
                          .some((material) => {
                            console.log(material);
                            return filters.material.includes(material);
                          });
                  })
                  .filter((batch) => {
                    return (
                      (filters.active.min
                        ? new Date(filters.active.min) <
                          new Date(batch.createdAt)
                        : true) &&
                      (filters.active.max
                        ? new Date(filters.active.max) >
                          new Date(batch.finishedAt)
                        : true)
                    );
                  })
                  .map((batch) => {
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
                          {new Date(batch.createdAt).toLocaleDateString(
                            "en-ph"
                          )}
                        </td>
                        <td className='py-4 px-6'>
                          {new Date(batch.finishedAt).toLocaleDateString(
                            "en-ph"
                          )}
                        </td>
                        <td className='py-4 px-6'>
                          {Math.round(getHarvestSum(batch))}
                        </td>
                        <td className='py-4 px-6'>{getDefectsSum(batch)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <BackToTopButton />
        </div>
      </div>
    </>
  );
};
