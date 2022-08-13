import React from "react";

import {
  HomeTwoTone,
  CalendarTwoTone,
  FundTwoTone,
  FolderOpenTwoTone,
  UserOutlined,
  SettingTwoTone,
} from "@ant-design/icons";



export const SideNavBar = () => {
  return (
    <div className='flex flex-col h-screen p-3 bg-white shadow w-60 bg-light-100'>
      <div className='space-y-3'>
        <div className='flex items-center'>
          <h2 className='text-xl font-bold'>Dashboard</h2>
        </div>
        <div className='flex-1'>
          <ul className='pt-2 pb-4 space-y-1 text-sm'>
            <li className='rounded-sm'>
              <a
                href='/home'
                className='flex items-center p-2 space-x-3 rounded-md'
              >
                <HomeTwoTone twoToneColor='#4A4A4A' />
                <span>Home</span>
              </a>
            </li>
            <li className='rounded-sm'>
              <a
                href='/production'
                className='flex items-center p-2 space-x-3 rounded-md'
              >
                <CalendarTwoTone twoToneColor='#4A4A4A' />
                <span>Production</span>
              </a>
            </li>
            <li className='rounded-sm'>
              <a
                href='/analytics'
                className='flex items-center p-2 space-x-3 rounded-md'
              >
                <FundTwoTone twoToneColor='#4A4A4A' />
                <span>Analytics</span>
              </a>
            </li>
            <li className='rounded-sm'>
              <a
                href='/records'
                className='flex items-center p-2 space-x-3 rounded-md'
              >
                <FolderOpenTwoTone twoToneColor='#4A4A4A' />
                <span>Records</span>
              </a>
            </li>
            <li className='rounded-sm'>
              <a
                href='/profile'
                className='flex items-center p-2 space-x-3 rounded-md'
              >
                <UserOutlined twoToneColor='#4A4A4A' />
                <span>Profile</span>
              </a>
            </li>
            <li className='rounded-sm'>
              <a
                href='/settings'
                className='flex items-center p-2 space-x-3 rounded-md'
              >
                <SettingTwoTone twoToneColor='#4A4A4A' />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
