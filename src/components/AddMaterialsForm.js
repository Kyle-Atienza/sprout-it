import { React, useState } from "react";
import { Tab } from "@headlessui/react";
import { PrimaryButton, TextField } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getMaterials, postMaterial } from "../features/inventory/inventorySlice";

export const AddMaterialsForm = () => {
  const dispatch = useDispatch();

  const [materialData, setMaterialData] = useState({
    name: "",
    altName: "",
    unit: '',
    quantity: 0,
    price: 0,
  });

  const { name, altName, unit, quantity, price } = materialData;

  const { materials } = useSelector((state) => state.inventory);

  const onChange = (e) => {
    setMaterialData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      postMaterial({
        name: name,
        altName: altName,
        unit: unit,
        quantity: quantity,
        price: price,
      })
    );
    dispatch(getMaterials)
    window.location.reload();
  };

  return (
    <Tab.Group>
      <Tab.List className='flex gap-2 justify-between overflow-x-auto scrollbar pb-2 flex-shrink-0'>
        <Tab
          className={({ selected }) =>
            selected
              ? "w-1/2 poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl disabled:opacity-50"
              : "w-1/2 poppins-paragraph px-4 py-3 bg-light-100 hover:bg-primary-100 rounded-xl disabled:opacity-50"
          }
        >
          Add to Existing
        </Tab>
        <Tab
          className={({ selected }) =>
            selected
              ? "w-1/2 poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl disabled:opacity-50"
              : "w-1/2 poppins-paragraph px-4 py-3 bg-light-100 hover:bg-primary-100 rounded-xl disabled:opacity-50"
          }
        >
          Add New Material
        </Tab>
      </Tab.List>
      <Tab.Panels className='pt-5 flex-1'>
        {/* ADD TO EXISTING */}
        <Tab.Panel>
          <form onSubmit={onSubmit}>
            <div className='mb-4'>
              <label className='block open-button' htmlFor='username'>
                Material name <span className='text-red-600'>*</span>
              </label>
              <select
                id='countries'
                className='w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
                onChange='{onChange}'
                name='frequency'
                required
              >
                <option hidden defaultValue>
                  Select material
                </option>
                <option value=''>Lorem ipsum dolor</option>
                <option value=''>Lorem ipsum dolor</option>
                <option value=''>Lorem ipsum dolor</option>
                <option value=''>Lorem ipsum dolor</option>
                <option value=''>Lorem ipsum dolor</option>
                <option value=''>Lorem ipsum dolor</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='block open-button' htmlFor='username'>
                Unit <span className='text-red-600'>*</span>
              </label>
              <TextField // Show unit from existing material here
                className='w-full open-paragraph-sm my-0'
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
                Quantity <span className='text-red-600'>*</span>
              </label>
              <input
                className='w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
                name='{`${on}On`}'
                type='number'
                onChange='{onChange}'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block open-button' htmlFor='username'>
                Price per unit <span className='text-red-600'>*</span>
              </label>
              <div className='flex justify-center items-center'>
                <p className='open-paragraph'>₱</p>
                <input
                  className='w-full p-3 ml-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
                  name='{`${on}On`}'
                  type='number'
                  onChange='{onChange}'
                  required
                />
              </div>
            </div>
            <div className='flex justify-end'>
              <PrimaryButton
                name='Add to Inventory'
                className='mt-4'
                onClick=''
              />
            </div>
          </form>
        </Tab.Panel>

        {/* ADD NEW MATERIAL */}
        <Tab.Panel>
          <form onSubmit={onSubmit}>
            <div className='mb-4'>
              <label className='block open-button' htmlFor='item-name'>
                Item name <span className='text-red-600'>*</span>
              </label>
              <TextField
                className='w-full open-paragraph-sm'
                id='material-name'
                type='text'
                name='name'
                value={materialData.name}
                onChange={onChange}
                placeholder='Name of new material'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block open-button' htmlFor='item-name'>
                Item name <span className='text-red-600'>*</span>
              </label>
              <TextField
                className='w-full open-paragraph-sm'
                id='material-altName'
                type='text'
                name='altName'
                value={materialData.altName}
                onChange={onChange}
                placeholder='Alternative name (optional)'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block open-button' htmlFor='username'>
                Unit <span className='text-red-600'>*</span>
              </label>
              <select
                id='material-unit'
                className='w-full p-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
                onChange={onChange}
                name='unit'
                required
              >
                <option hidden defaultValue>
                  Select unit
                </option>
                <option value='kg'>kilogram (kg)</option>
                <option value='l'>liter (l)</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='block open-button' htmlFor='username'>
                Quantity <span className='text-red-600'>*</span>
              </label>
              <TextField
                className='w-full open-paragraph-sm my-0'
                id='material-quantity'
                type='text'
                name='quantity'
                value={materialData.quantity}
                onChange={onChange}
                placeholder='0'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block open-button' htmlFor='username'>
                Price per unit <span className='text-red-600'>*</span>
              </label>
              <div className='flex justify-center items-center'>
                <p className='open-paragraph'>₱</p>
                <input
                  className='w-full p-3 ml-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
                  id='material-price'
                  name='price'
                  type='number'
                  onChange={onChange}
                  value={materialData.price}
                  required
                />
              </div>
            </div>
            <div className='flex justify-end'>
              <PrimaryButton
                name='Add to Inventory'
                className='mt-4'
                onClick={onSubmit}
              >
                <input type='submit' value='Submit' />
              </PrimaryButton>
            </div>
          </form>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
