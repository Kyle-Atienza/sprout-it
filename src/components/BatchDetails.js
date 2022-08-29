import { Tab } from "@headlessui/react";
import React from "react";
import { useSelector } from "react-redux";

export function BatchDetails({ batchData }) {
  const { phases } = useSelector((state) => state.phases);

  return (
    <Tab.Group>
      <Tab.List className="flex gap-2 overflow-x-scroll pb-2 flex-shrink-0">
        {phases.map((phase) => {
          return (
            <Tab
              className="poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl disabled:opacity-50"
              key={phase}
            >
              {phase}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels className="py-5 flex-1">
        <Tab.Panel>
          <div>
            <table className="w-full text-sm text-left">
              <thead className=" poppins-paragraph ">
                <tr>
                  <th scope="col" className="py-2">
                    Material
                  </th>
                  <th scope="col" className="py-2">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="poppins-paragraph-sm ">
                <tr className="transition-all duration-300 ease-in-out cursor-pointer">
                  <td className="py-2">Kusot</td>
                  <td className="py-2">12 kg</td>
                </tr>
                <tr className="transition-all duration-300 ease-in-out cursor-pointer">
                  <td className="py-2">Kusot</td>
                  <td className="py-2">12 kg</td>
                </tr>
                <tr className="transition-all duration-300 ease-in-out cursor-pointer">
                  <td className="py-2">Kusot</td>
                  <td className="py-2">12 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div>
            <p className="poppins-paragraph">27 days composting</p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            <p className="poppins-paragraph">200 days composting</p>
            <p className="poppins-paragraph">1kg bag weight</p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            <p className="poppins-paragraph">8 hours Sterilization</p>
          </div>
          <div className="mt-auto">
            <p className="poppins-paragraph">2 defects</p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            <p className="poppins-paragraph">198 Total Inoculated</p>
            <p className="poppins-paragraph">F2 Sorgum Spawn</p>
          </div>
          <div className="mt-auto">
            <p className="poppins-paragraph">4 defects</p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            <p className="poppins-paragraph">194 total bags for fruiting</p>
            <p className="poppins-paragraph">2 weeks waiting time</p>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
