import { Tab } from "@headlessui/react";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function BatchDetails({ batch }) {
  const { phases } = useSelector((state) => state.phases);

  const mappedPhases = (phase) => {
    switch (phase) {
      case "pre":
        return "Pre-production";
      case "composting":
        return "Composting";
      case "bagging":
        return "Bagging";
      case "sterilization":
        return "Sterilization";
      case "inoculation":
        return "Inculation";
      case "fruiting":
        return "Fruiting";
      case "post":
        return "Post-production";

      default:
        break;
    }
  };
  const [totalDefects, setTotalDefects] = useState(0);

  useEffect(() => {
    let defectsSum = 0;
    const defectedPhase = Object.keys(batch).filter(
      (key) => batch[key].defects
    );
    defectedPhase.forEach((phase) => {
      defectsSum += batch[phase].defects;
    });
    setTotalDefects(defectsSum);
  }, []);

  return (
    <Tab.Group
      selectedIndex={phases.indexOf(
        batch.activePhase.slice(0, 1).toUpperCase() + batch.activePhase.slice(1)
      )}
    >
      <Tab.List className="flex gap-2 overflow-x-scroll scrollbar pb-2 flex-shrink-0">
        {phases.map((phase, index) => {
          return (
            <Tab
              className={({ selected }) =>
                selected
                  ? "poppins-paragraph px-4 py-3 bg-primary-200 rounded-xl disabled:opacity-50 whitespace-nowrap"
                  : "poppins-paragraph px-4 py-3 bg-light-100 hover:bg-primary-100 rounded-xl disabled:opacity-50 whitespace-nowrap"
              }
              key={phase}
            >
              {mappedPhases(phase)}
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
                {batch.materials.map((material, index) => {
                  return (
                    <tr
                      className="transition-all duration-300 ease-in-out cursor-pointer"
                      key={index}
                    >
                      <td className="py-2">{material.material.name}</td>
                      <td className="py-2">
                        {material.weight} {material.material.unit}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div>
            <p className="poppins-paragraph">27 days composting</p>
            <p>
              {batch.hasOwnProperty("composting")
                ? batch.composting.defects
                : null}
            </p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            <p className="poppins-paragraph">200 days composting</p>
            <p className="poppins-paragraph">1kg bag weight</p>
            <p>
              {batch.hasOwnProperty("bagging")
                ? batch.composting.defects
                : null}
            </p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            <p className="poppins-paragraph">8 hours Sterilization</p>
          </div>
          <p>
            {batch.hasOwnProperty("sterilization")
              ? batch.composting.defects
              : null}
          </p>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            <p className="poppins-paragraph">198 Total Inoculated</p>
            <p className="poppins-paragraph">F2 Sorgum Spawn</p>
          </div>
          <p>
            {batch.hasOwnProperty("inoculation")
              ? batch.composting.defects
              : null}
          </p>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            <p className="poppins-paragraph">194 total bags for fruiting</p>
            <p className="poppins-paragraph">2 weeks waiting time</p>
            <p>
              {batch.hasOwnProperty("fruiting")
                ? batch.composting.defects
                : null}
            </p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            <p className="poppins-paragraph">Total Number of defects</p>
            <p className="poppins-paragraph">{totalDefects}</p>
            {phases.map((phase) => {
              if (!batch[phase]) return null;
              return (
                <div className="flex justify-between" key={phase}>
                  <p>{phase}</p>
                  <p>{batch[phase].defects}</p>
                </div>
              );
            })}
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
