import {React, useRef} from "react";
import { Images } from "../core";
import { TextField, PrimaryButton } from "../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/user/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const LoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      alert(message.response);
    }
    if (isSuccess || user) {
      navigate("/production");
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  const passwordField = useRef();
  const changeType = () => {
    passwordField.current.type = "password";
  };

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
          <form className='flex flex-col' onSubmit={onSubmit}>
            <TextField
              value={email}
              type='text'
              name='email'
              id='email'
              placeholder='Email'
              onChange={onChange}
            />
            <TextField
              value={password}
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              onChange={onChange}
              onClick={changeType}
            />
            <a
              className='text-right open-button text-light-700'
              href='/forgot-password'
            >
              Forgot Password?
            </a>
            <PrimaryButton className={"mt-10"} name='Log in' onClick={onSubmit}>
              <input type='submit' value='Submit' />
            </PrimaryButton>
          </form>
        </section>
      </div>
    </>
  );
};
