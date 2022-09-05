import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";

import { Images } from "../core";
import {
  HomeOutlined,
  CalendarOutlined,
  FundOutlined,
  FolderOutlined,
  InboxOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

export const SideNavBar = (className) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    console.log("logout");
    dispatch(logout());
  };

  return (
    <aside
      className={`lg:flex fixed flex-col p-4 bg-white shadow w-1/6 h-screen bg-light-100 justify-between hidden ${className}`}
    >
      <div className='p-4'>
        <img src={Images.EandBLogo} alt='E and B logo' />
      </div>
      <div className='h-auto w-full'>
        <ul className='space-y-1 w-full'>
          <li className='rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all'>
            <a
              href='/home'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <HomeOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Home</h4>
            </a>
          </li>
          <li className='rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all'>
            <a
              href='/production'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <CalendarOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Production</h4>
            </a>
          </li>
          <li className='rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all'>
            <a
              href='/analytics'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <FundOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Analytics</h4>
            </a>
          </li>
          <li className='rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all'>
            <a
              href='/inventory'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <InboxOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Inventory</h4>
            </a>
          </li>
          <li className='rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all'>
            <a
              href='/records'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <FolderOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Records</h4>
            </a>
          </li>
          <li className='rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all'>
            <a
              href='/settings'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <SettingOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Settings</h4>
            </a>
          </li>
          <li className='rounded-full px-4 py-2 hover:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all'>
            <a
              onClick={onLogout}
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <LogoutOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Log out</h4>
            </a>
          </li>
        </ul>
      </div>
      <div className='p-4'>
        <img src={Images.Logo} alt='Sprout It logo' />
      </div>
    </aside>
  );
};
