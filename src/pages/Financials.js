import React, { useEffect } from "react";
import { SideNavBar, TopNavBar } from "../components";
import { useSelector, useDispatch } from "react-redux";

import { getPurchases } from "../features/financial/financialSlice";

export const Financials = () => {
  const dispatch = useDispatch();

  const { purchases } = useSelector((state) => state.financial);

  useEffect(() => {
    dispatch(getPurchases());
  }, []);

  var formatter = new Intl.NumberFormat("tl-PH", {
    style: "currency",
    currency: "PHP",
  });

  return (
    <>
      <div className="flex flex-row w-screen">
        <div className="w-0 lg:w-1/6">
          <SideNavBar />
        </div>

        <div className="flex flex-col w-full lg:w-5/6 min-h-screen">
          <div className="w-full">
            <TopNavBar pageName="Financials" />
          </div>

          <div className="search mx-10 mt-16 flex justify-between"></div>

          <div className="overflow-x-auto relative harvests-table mx-10 my-6 shadow-md bg-light-100 rounded-xl">
            <table className="w-full text-sm text-left">
              <thead className=" poppins-paragraph text-secondary-300">
                <tr>
                  <th scope="col" className="py-4 px-6">
                    Material
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Quantity
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Supplier
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Purchase On
                  </th>
                </tr>
              </thead>
              <tbody className="poppins-paragraph-sm ">
                {purchases.map((purchase, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-light-100 hover:bg-light-200 border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
                    >
                      <td className="py-4 px-6">{purchase.material.name}</td>
                      <td className="py-4 px-6">
                        {purchase.material.quantity}
                      </td>
                      <td className="py-4 px-6">
                        {formatter.format(
                          purchase.material.price ? purchase.material.price : 0
                        )}
                      </td>
                      <td className="py-4 px-6">{purchase.supplier.name}</td>
                      <td className="py-4 px-6">
                        {new Date(purchase.createdAt).toDateString().slice(4)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
