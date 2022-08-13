import React from "react";
import { Images } from "../core";
import { TextField, PrimaryButton } from "../components";

export const RegisterUser = () => {
  return (
    <>
      <div
        className='w-screen h-screen bg-center bg-cover bg-accent-100 flex justify-center items-center'
        style={{ backgroundImage: `url(${Images.LoginRegisterBg})` }}
      >
        <section className='w-full md:w-auto lg:w-1/2 h-full md:h-auto p-4 md:p-16 bg-light-100 absolute md:rounded-3xl shadow flex flex-col justify-center text-center'>
          <div className='flex justify-center '>
            <img
              className='w-24 h-auto'
              src={Images.LogoIcon}
              alt='Sprout It'
            />
          </div>
          <div className='mt-4 mb-8'>
            <h1 className='poppins-heading-5 text-primary-500 mb-4'>
              Welcome to Sprout It
            </h1>
            <h3 className='open-heading-6 text-seconday-400'>
              Create a new account
            </h3>
          </div>
          <form className='flex flex-col mb-10'>
            <div className='flex flex-col md:flex-row md:space-x-4'>
              <TextField
                type='text'
                name='first-name'
                id='first-name'
                placeholder='First name'
                className='w-full'
              />
              <TextField
                type='text'
                name='last-name'
                id='last-name'
                placeholder='Last name'
                className='w-full'
              />
            </div>
            <TextField
              type='text'
              name='email'
              id='email'
              placeholder='Email'
            />
            <TextField
              type='password'
              name='password'
              id='password'
              placeholder='Password'
            />
            <TextField
              type='password'
              name='password2x'
              id='password2x'
              placeholder='Repeat Password'
            />
            <TextField
              type='text'
              name='invite-code'
              id='invite-code'
              placeholder='Invite code'
            />
            <a className='text-right open-button text-light-700' href='/'>
              Forgot Password?
            </a>
          </form>
          <PrimaryButton name='Register'>
            <input type='submit' value='Submit' />
          </PrimaryButton>
        </section>
      </div>
    </>
  );
};
