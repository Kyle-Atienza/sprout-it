import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { Route, Link, Routes, useLocation } from "react-router-dom";

import { Images } from "../core";
import {
  HomeOutlined,
  CalendarOutlined,
  FundOutlined,
  FolderOutlined,
  InboxOutlined,
  SettingOutlined,
  LogoutOutlined,
  StockOutlined,
} from "@ant-design/icons";

export const SideNavBar = (className) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const location = useLocation();

  return (
    <aside
      className={`lg:flex fixed flex-col p-4 shadow w-1/6 h-screen bg-light-100 justify-between hidden ${className}`}
    >
      <div className='p-4 flex items-center justify-center'>
        <img className='w-5/6' src={Images.EandBLogo} alt='E and B logo' />
      </div>
      <div className='h-auto w-full'>
        <ul className='w-full'>
          <li
            className={
              location.pathname === "/home"
                ? "rounded-full px-4 py-2 bg-primary-100 text-primary-700 transition-all"
                : "rounded-full px-4 py-2 bg-none hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all"
            }
          >
            <a
              href='/home'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <HomeOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Home</h4>
            </a>
          </li>
          <li
            className={
              location.pathname === "/production"
                ? "rounded-full px-4 py-2 bg-primary-100 text-primary-700 transition-all"
                : "rounded-full px-4 py-2 bg-none hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all"
            }
          >
            <a
              href='/production'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <CalendarOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Production</h4>
            </a>
          </li>
          <li
            className={
              location.pathname === "/analytics"
                ? "rounded-full px-4 py-2 bg-primary-100 text-primary-700 transition-all"
                : "rounded-full px-4 py-2 bg-none hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all"
            }
          >
            <a
              href='/analytics'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <FundOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Analytics</h4>
            </a>
          </li>
          <li
            className={
              location.pathname === "/inventory"
                ? "rounded-full px-4 py-2 bg-primary-100 text-primary-700 transition-all"
                : "rounded-full px-4 py-2 bg-none hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all"
            }
          >
            <a
              href='/inventory'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <InboxOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Inventory</h4>
            </a>
          </li>
          <li
            className={
              location.pathname === "/financials"
                ? "rounded-full px-4 py-2 bg-primary-100 text-primary-700 transition-all"
                : "rounded-full px-4 py-2 bg-none hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all"
            }
          >
            <a
              href='/financials'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <StockOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Financials</h4>
            </a>
          </li>
          <li
            className={
              location.pathname === "/records"
                ? "rounded-full px-4 py-2 bg-primary-100 text-primary-700 transition-all"
                : "rounded-full px-4 py-2 bg-none hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all"
            }
          >
            <a
              href='/records'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <FolderOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Records</h4>
            </a>
          </li>
          <li
            className={
              location.pathname === "/settings"
                ? "rounded-full px-4 py-2 bg-primary-100 text-primary-700 transition-all"
                : "rounded-full px-4 py-2 bg-none hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all"
            }
          >
            <a
              href='/settings'
              className='flex items-center p-2 space-x-3 rounded-md'
            >
              <SettingOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Settings</h4>
            </a>
          </li>
          <li className='rounded-full px-4 py-2 hover:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all'>
            <div
              onClick={onLogout}
              className='flex items-center p-2 space-x-3 rounded-md cursor-pointer'
            >
              <LogoutOutlined className='text-xl leading-none -mt-1' />
              <h4 className='poppins-paragraph font-semibold'>Log out</h4>
            </div>
          </li>
        </ul>
      </div>
      <div className='p-4 flex items-center justify-center'>
        <img className='w-5/6' src={Images.Logo} alt='Sprout It logo' />
      </div>
    </aside>
  );
};
