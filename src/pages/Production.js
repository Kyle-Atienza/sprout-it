import React from 'react';
import { SideNavBar, TopNavBar, PrimaryButton } from "../components";

export const Production = () => {
  return (
    <>
      <div className='w-screen h-screen flex flex-row bg-accent-100'>
        <SideNavBar />
        <div className='flex flex-col'>
          <TopNavBar />
          content
        </div>
      </div>
    </>
  );
}