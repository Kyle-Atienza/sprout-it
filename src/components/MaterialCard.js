import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";

export const MaterialCard = ({ material, index }) => {
  const date = new Date(material.updatedAt).toDateString();
  return (
    <div
      className="p-6 flex flex-col shadow-md bg-light-100 rounded-xl"
      key={index}
    >
      <div className="flex flex-row justify-between items-start">
        <h3 className="poppins-heading-6 text-primary-500">{material.name}</h3>
        <div className="flex gap-4">
          <button className="hover:text-secondary-400 flex items-center">
            <EditOutlined />
          </button>
          <button className="hover:text-red-600 flex items-center">
            <DeleteOutlined />
          </button>
        </div>
      </div>
      <p className="text-left open-paragraph-sm">{material.altName}</p>
      <div className="flex justify-center items-center mx-4 my-8">
        <h4 className="text-center poppins-heading-3 text-secondary-400">
          {material.quantity}&nbsp;{material.unit}
        </h4>
      </div>
      <p className="text-left open-paragraph-sm">Last updated</p>
      <p className="text-left open-paragraph-sm font-bold">{date}</p>
    </div>
  );
};
