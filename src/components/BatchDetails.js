import { Tab } from "@headlessui/react";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function BatchDetails({ batch }) {
  const { phases } = useSelector((state) => state.phases);

  const mappedPhases = (phase) => {
    switch (phase) {
      case "pre":
        return "Pre-Production";
      case "composting":
        return "Composting";
      case "bagging":
        return "Bagging";
      case "sterilization":
        return "Sterilization";
      case "inoculation":
        return "Inoculation";
      case "fruiting":
        return "Fruiting";
      case "post":
        return "Post-Production";

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

    console.log(phases.indexOf(batch.activePhase), batch.activePhase);
  }, []);

  return (
    <Tab.Group selectedIndex={phases.indexOf(batch.activePhase)}>
      <Tab.List className="flex gap-2 overflow-x-scroll scrollbar pb-2 flex-shrink-0">
        {phases.map((phase, index) => {
          return (
            <Tab
              className={({ selected }) =>
                selected
                  ? "open-paragraph px-4 py-3 bg-primary-200 rounded-xl disabled:opacity-50 whitespace-nowrap"
                  : "open-paragraph px-4 py-3 bg-light-100 hover:bg-primary-100 rounded-xl disabled:opacity-50 whitespace-nowrap"
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
              <tbody className="open-paragraph">
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
            <p className="open-paragraph my-1">
              <span className="font-semibold">Date Started: </span>
              {batch.hasOwnProperty("composting")
                ? new Date(batch.composting.startedAt).toDateString()
                : null}
            </p>
            <p className="open-paragraph my-1">
              <span className="font-semibold">Waiting Period: </span>
              {batch.hasOwnProperty("composting")
                ? batch.composting.waiting
                : null}{" "}
              {/* week/s */}
            </p>
            <p className="open-paragraph my-1">
              <span className="font-semibold">Mix Frequency: </span>
              {batch.hasOwnProperty("composting")
                ? batch.composting.mixFrequency
                : null}{" "}
            </p>
            <p className="open-paragraph my-1">
              <span className="font-semibold">Moisture Level: </span>
              {batch.hasOwnProperty("composting")
                ? batch.composting.moisture
                : null}{" "}
            </p>
            <p className="open-paragraph my-1">
              <span className="font-semibold">Defects: </span>
              {batch.hasOwnProperty("composting")
                ? batch.composting.defects
                : null}{" "}
              kg
            </p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            <p className="open-paragraph my-1">
              <span className="font-semibold">Date Started: </span>
              {batch.hasOwnProperty("bagging")
                ? new Date(batch.bagging.startedAt).toDateString()
                : null}{" "}
            </p>
            <p className="open-paragraph my-1">
              <span className="font-semibold">Bag Weight: </span>
              {batch.hasOwnProperty("bagging")
                ? batch.bagging.bagWeight
                : null}{" "}
              kg
            </p>
            <p className="open-paragraph my-1">
              <span className="font-semibold">Number of Bags: </span>
              {batch.hasOwnProperty("bagging")
                ? batch.bagging.total
                : null}{" "}
              bags
            </p>
            <p className="open-paragraph my-1">
              <span className="font-semibold">Defects: </span>
              {batch.hasOwnProperty("bagging")
                ? batch.bagging.defects
                : null}{" "}
              kg
            </p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <p className="open-paragraph my-1">
            <span className="font-semibold">Date Started: </span>
            {batch.hasOwnProperty("sterilization")
              ? new Date(batch.sterilization.startedAt).toDateString()
              : null}
          </p>
          <p className="open-paragraph my-1">
            <span className="font-semibold">Waiting Period: </span>
            {batch.hasOwnProperty("sterilization")
              ? batch.sterilization.waiting
              : null}{" "}
            hour/s
          </p>
          <p className="open-paragraph my-1">
            <span className="font-semibold">Defects: </span>
            {batch.hasOwnProperty("sterilization")
              ? batch.sterilization.defects
              : null}{" "}
            kg
          </p>
        </Tab.Panel>
        <Tab.Panel>
          <p className="open-paragraph my-1">
            <span className="font-semibold">Date Started: </span>
            {batch.hasOwnProperty("inoculation")
              ? new Date(batch.inoculation.startedAt).toDateString()
              : null}
          </p>
          <p className="open-paragraph my-1">
            <span className="font-semibold">Spawn Type: </span>
            {batch.hasOwnProperty("inoculation")
              ? batch.inoculation.spawn
              : null}
          </p>
          <p className="open-paragraph my-1">
            <span className="font-semibold">Total: </span>
            {batch.hasOwnProperty("inoculation")
              ? batch.inoculation.total
              : null}
          </p>
          <p className="open-paragraph my-1">
            <span className="font-semibold">Defects: </span>
            {batch.hasOwnProperty("inoculation")
              ? batch.inoculation.defects
              : null}{" "}
            kg
          </p>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            <p className="open-paragraph my-1">
              <span className="font-semibold">Date Started: </span>
              {batch.hasOwnProperty("fruiting")
                ? new Date(batch.fruiting.startedAt).toDateString()
                : null}
            </p>
            <p className="open-paragraph my-1">
              <span className="font-semibold">Waiting Period: </span>
              {batch.hasOwnProperty("fruiting")
                ? batch.fruiting.waiting
                : null}{" "}
              {/* week/s */}
            </p>
            <p className="open-paragraph my-1">
              <span className="font-semibold">Defects: </span>
              {batch.hasOwnProperty("fruiting")
                ? batch.fruiting.defects
                : null}{" "}
              kg
            </p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="">
            {phases.map((phase) => {
              if (!batch[phase]) return null;
              return (
                <div className="flex justify-between" key={phase}>
                  <p className="open-paragraph my-1">
                    <span className="font-semibold">
                      {phase.charAt(0).toUpperCase() +
                        phase.slice(1).toLowerCase()}
                      :&nbsp;
                    </span>
                    {batch[phase].defects} kg
                  </p>
                </div>
              );
            })}
            <hr className="my-1" />
            <p className="open-paragraph my-1">
              <span className="font-semibold">Total Number of defects: </span>
              {totalDefects} kg
            </p>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
