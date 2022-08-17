import { React } from "react";
import { PrimaryButton, TextField } from "../components";

export const PreProductionForm = () => {
  return (
    <div>
      <h3 className='poppins-heading-6'>Pre-Production</h3>
      <form className='flex flex-col mt-8' onSubmit='{onSubmit}'>
        <div className='w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center'>
          <p className='open-paragraph font-semibold w-1/3'>Dayami (kg)</p>
          <TextField
            value=''
            type='text'
            name='dayami-kg'
            id='dayami-kg'
            placeholder='0'
            className='w-full md:w-2/3'
            onChange='{onChange}'
          />
        </div>
        <div className='w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center'>
          <p className='open-paragraph font-semibold w-1/3'>Kusot (kg)</p>
          <TextField
            value=''
            type='text'
            name='kusot-kg'
            id='kusot-kg'
            placeholder='0'
            className='w-full md:w-2/3'
            onChange='{onChange}'
          />
        </div>
        <div className='w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center'>
          <p className='open-paragraph font-semibold w-1/3'>Darak Mixed (kg)</p>
          <TextField
            value=''
            type='text'
            name='darak-kg'
            id='darak-kg'
            placeholder='0'
            className='w-full md:w-2/3'
            onChange='{onChange}'
          />
        </div>
        <div className='w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center'>
          <p className='open-paragraph font-semibold w-1/3'>Darak Pino (kg)</p>
          <TextField
            value=''
            type='text'
            name='darak-kg'
            id='darak-kg'
            placeholder='0'
            className='w-full md:w-2/3'
            onChange='{onChange}'
          />
        </div>
        <div className='w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center'>
          <p className='open-paragraph font-semibold w-1/3'>Asukal (kg)</p>
          <TextField
            value=''
            type='text'
            name='asukal-kg'
            id='asukal-kg'
            placeholder='0'
            className='w-full md:w-2/3'
            onChange='{onChange}'
          />
        </div>
        <div className='w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center'>
          <p className='open-paragraph font-semibold w-1/3'>Tubig (ml)</p>
          <TextField
            value=''
            type='text'
            name='tubig-ml'
            id='tubig-ml'
            placeholder='0'
            className='w-full md:w-2/3'
            onChange='{onChange}'
          />
        </div>
        <div className='w-full flex flex-col md:flex-row md:space-x-4 items-start md:items-center'>
          <p className='open-paragraph font-semibold w-1/3'>Apog (kg)</p>
          <TextField
            value=''
            type='text'
            name='apog-kg'
            id='apog-kg'
            placeholder='0'
            className='w-full md:w-2/3'
            onChange='{onChange}'
          />
        </div>
        <div className='w-full flex flex-col md:flex-row space-x-4 items-start md:items-center'>
            <TextField
              value=''
              type='text'
              name='other'
              id='other'
              placeholder='Other'
              className='w-3/4'
              onChange='{onChange}'
            />
            <TextField
              value=''
              type='text'
              name='other-kg'
              id='other-kg'
              placeholder='0'
              className='w-1/4'
              onChange='{onChange}'
            />
        </div>
        <PrimaryButton className='mt-8' name='Start Production' onClick=''>
          <input type='submit' value='Submit' />
        </PrimaryButton>
      </form>
    </div>
  );
};
