import { React } from "react";
import { PrimaryButton, TextField } from "../components";

export const PreProductionForm = () => {
  return (
    <div>
      <h3 className='poppins-heading-6'>
        Pre-Production
      </h3>
      <form className='flex flex-col mt-8' onSubmit='{onSubmit}'>
        <div className='flex flex-col md:flex-row md:space-x-4'>
          <TextField
            value=''
            type='text'
            name='first-name'
            id='first-name'
            placeholder='Lorem ipsum'
            className='w-full'
            onChange='{onChange}'
          />
          <TextField
            value=''
            type='text'
            name='last-name'
            id='last-name'
            placeholder='Lorem ipsum'
            className='w-full'
            onChange='{onChange}'
          />
        </div>
        <TextField
          value=''
          type='text'
          name='email'
          id='email'
          placeholder='Lorem ipsum'
          onChange='{onChange}'
        />
        <TextField
          value=''
          type='text'
          name='password'
          id='password'
          placeholder='Lorem ipsum'
          onChange='{onChange}'
        />
        <TextField
          value=''
          type='text'
          name='confirmPassword'
          id='confirmPassword'
          placeholder='Lorem ipsum'
          onChange='{onChange}'
        />
        <PrimaryButton className="mt-8" name='Start Production' onClick=''>
          <input type='submit' value='Submit' />
        </PrimaryButton>
      </form>
    </div>
  );
};