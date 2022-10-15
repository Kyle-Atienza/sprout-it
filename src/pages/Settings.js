import React, { useState } from "react";
import { InviteForm } from "../components";
import { SideNavBar, TopNavBar, TextField } from "../components";
import { useEffect } from "react";
import { getMaterials } from "../features/inventory/inventorySlice";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../features/user/userSlice";

export function Settings() {
  const dispatch = useDispatch();

  const { purchases } = useSelector((state) => state.financial);

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getUsers());
  }, []);

  return (
    <>
      <div className='flex flex-row w-screen min-h-screen'>
        <div className='w-0 lg:w-1/6'>
          <SideNavBar />
        </div>

        <div className='flex flex-col w-full lg:w-5/6'>
          <div className='w-full'>
            <TopNavBar pageName='Settings' />
          </div>
          <div className='flex flex-col lg:flex-row w-full my-4 py-4 px-4 md:px-6 lg:px-9'>
            <section className='w-full lg:w-1/3 '>
              <InviteForm />
            </section>
            <section
              div
              className='w-full lg:w-2/3 overflow-x-auto relative harvests-table mx-10 my-6 shadow-md bg-light-100 rounded-xl'
            >
              <table className='w-full text-sm text-left'>
                <thead className=' poppins-paragraph text-secondary-300'>
                  <tr>
                    <th scope='col' className='py-4 px-6'>
                      First Name
                    </th>
                    <th scope='col' className='py-4 px-6'>
                      Second Name
                    </th>
                    <th scope='col' className='py-4 px-6'>
                      Email
                    </th>
                    <th scope='col' className='py-4 px-6'></th>
                    <th scope='col' className='py-4 px-6'></th>
                  </tr>
                </thead>
                <tbody className='poppins-paragraph-sm '>
                  {purchases.map((purchase, index) => {
                    return (
                      <tr
                        key={index}
                        className='bg-light-100 hover:bg-light-200 border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out cursor-pointer'
                      >
                        <td className='py-4 px-6'>{purchase.material.name}</td>
                        <td className='py-4 px-6'>
                          {purchase.material.quantity}
                        </td>
                        <td className='py-4 px-6'>{purchase.supplier.name}</td>
                        <td className='py-4 px-6'></td>
                        <td className='py-4 px-6'></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
