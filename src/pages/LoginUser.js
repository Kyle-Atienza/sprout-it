import React from "react";
import { Images } from "../core";
import { TextField, PrimaryButton } from "../components";

export const LoginUser = () => {
  return (
    <>
      <div
        className='w-screen h-screen bg-center bg-cover bg-accent-100 flex justify-center items-center'
        style={{ backgroundImage: `url(${Images.LoginRegisterBg})` }}
      >
        <section className='w-full md:w-auto lg:w-1/3  h-full md:h-auto p-4 md:p-16 bg-light-100 absolute md:rounded-3xl shadow flex flex-col justify-center text-center'>
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
              Log in to your account
            </h3>
          </div>
          <form className='flex flex-col mb-10'>
            <TextField
              type='text'
              name='email'
              id='email'
              placeholder='Email'
              onChange=''
            />
            <TextField
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              onChange=''
            />
            <a className='text-right open-button text-light-700' href='/'>
              Forgot Password?
            </a>
          </form>
          <PrimaryButton name='Log in'>
            <input type="submit" value="Submit" />
          </PrimaryButton>
        </section>
      </div>
    </>
  );
};
