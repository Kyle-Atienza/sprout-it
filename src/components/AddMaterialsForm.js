import React from "react";
import { Tab } from "@headlessui/react";
import { PrimaryButton, TextField } from "../components";

export const AddMaterialsForm = () => {
  return (
    <Tab.Group>
      <Tab.List className='flex gap-2 overflow-x-scroll scrollbar pb-2 flex-shrink-0'>
        <Tab
          className={({ selected }) =>
            selected
              ? "poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl disabled:opacity-50"
              : "poppins-paragraph px-4 py-3 bg-light-100 hover:bg-primary-100 rounded-xl disabled:opacity-50"
          }
        >
          Add to Existing
        </Tab>
        <Tab
          className={({ selected }) =>
            selected
              ? "poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl disabled:opacity-50"
              : "poppins-paragraph px-4 py-3 bg-light-100 hover:bg-primary-100 rounded-xl disabled:opacity-50"
          }
        >
          Add New Material
        </Tab>
      </Tab.List>
      <Tab.Panels className='py-5 flex-1'>
        <Tab.Panel>
          <form className='mb-4'>
            <div className='mb-4'>
              <label className='block open-button mb-2' htmlFor='username'>
                Item name <span className='text-red-600'>*</span>
              </label>
              <TextField
                className='w-full open-paragraph-sm mt-0'
                id='username'
                type='text'
                name='name'
                value='{value}'
                onChange='{onChange}'
                placeholder='Lorem ipsum dolor'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block open-button mb-2' htmlFor='username'>
                Item name <span className='text-red-600'>*</span>
              </label>
              <TextField
                className='w-full open-paragraph-sm mt-0'
                id='username'
                type='text'
                name='name'
                value='{value}'
                onChange='{onChange}'
                placeholder='Lorem ipsum dolor'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block open-button' htmlFor='username'>
                Unit <span className='text-red-600'>*</span>
              </label>
              <select
                id='countries'
                className='w-full p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400'
                onChange='{onChange}'
                name='frequency'
                required
              >
                <option hidden defaultValue>
                  Select unit
                </option>
                <option value='once'>kilogram (kg)</option>
                <option value='daily'>liter (l)</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='block open-button mb-2' htmlFor='username'>
                Price per unit <span className='text-red-600'>*</span>
              </label>
              <div className='flex justify-center items-center'>
                <p className='open-paragraph'>₱</p>
                <input
                  className='w-full p-3 ml-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400'
                  id='username'
                  name='{`${on}On`}'
                  type='number'
                  onChange='{onChange}'
                  required
                />
              </div>
            </div>
          </form>
        </Tab.Panel>
        <Tab.Panel>
          <div>lorem</div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
