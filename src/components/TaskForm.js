import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { createTask, getTasks } from "../features/batch/batchSlice";
import { createTask, getTasks } from "../features/task/taskSlice";

export function TaskForm({ batch }) {
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    name: "",
    description: "",
    startBy: "",
    startOn: "",
    endBy: "",
    endOn: "",
    frequency: "",
    time: "",
  });

  const { name, description, startBy, startOn, endBy, endOn, frequency, time } =
    task;

  const onChange = (e) => {
    if (e.target.name === "startBy") {
      setTask((prevState) => ({
        ...prevState,
        startOn: "",
        [e.target.name]: e.target.value,
      }));
    }
    if (e.target.name === "endBy") {
      setTask((prevState) => ({
        ...prevState,
        endOn: "",
        [e.target.name]: e.target.value,
      }));
    }
    if (e.target.name === "frequency") {
      setTask((prevState) => ({
        ...prevState,
        endOn: "",
        startOn: "",
        [e.target.name]: e.target.value,
      }));
    }
    setTask((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onCreateTask = (e) => {
    e.preventDefault();

    dispatch(
      createTask({
        batch: batch._id,
        start: {
          by: startBy,
          on: startOn,
        },
        end: {
          by: endBy,
          on: endOn,
        },
        name: name,
        description: description,
        frequency: frequency,
        time: time,
      })
    );
    dispatch(getTasks());
  };
  /* 
  const getFrequencyInputType = (frequency) => {
    switch (frequency) {
      case "once":
        return "date";
      case "daily":
        return "date";
      case "weekly":
        return "week";
      case "monthly":
        return "month";
      default:
        break;
    }
  }; */

  const getInputByType = (on, type) => {
    if (type === "phase") {
      return (
        <select
          id="countries"
          className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={onChange}
          name={`${on}On`}
          required
        >
          <option hidden defaultValue>
            Select Phase
          </option>
          <option value="composting">Composting</option>
          <option value="bagging">Bagging</option>
          <option value="sterilization">Sterilization</option>
          <option value="inoculation">Inoculation</option>
          <option value="fruiting">Fruiting</option>
        </select>
      );
    }
    if (type === "date") {
      return (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          name={`${on}On`}
          type="date"
          onChange={onChange}
          required
        />
      );
    }
    if (type === "occurrence") {
      return (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          name={`${on}On`}
          type="number"
          onChange={onChange}
          required
        />
      );
    }
  };

  return (
    <form className=" mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Task Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          name="name"
          value={task.name}
          onChange={onChange}
          placeholder="Clean Mushroom House"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Task Description
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          name="description"
          value={task.description}
          onChange={onChange}
          placeholder="Optional"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Frequency
        </label>
        <select
          id="countries"
          className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={onChange}
          name="frequency"
          required
        >
          <option hidden defaultValue>
            Select Frequency
          </option>
          <option value="once">once</option>
          <option value="daily">daily</option>
          <option value="weekly">weekly</option>
          <option value="monthly">monthly</option>
        </select>
      </div>
      <div className="mb-4 flex-1">
        <div className="flex items-center gap-4 mb-4">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="username"
          >
            Start On
          </label>
          <select
            id="countries"
            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={onChange}
            name="startBy"
            required
          >
            <option hidden defaultValue>
              Start By
            </option>
            <option value="phase">Phase</option>
            <option value="date">Date</option>
          </select>
        </div>
        {getInputByType("start", task.startBy)}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="time">
          Time
        </label>
        <div className="flex items-center gap-4">
          <div className="form-check flex">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value="allDay"
              name="time"
              id="flexCheckDefault"
              onChange={() =>
                setTask((prevState) => ({
                  ...prevState,
                  time: prevState.time === "allDay" ? "" : "allDay",
                }))
              }
            />
            <label
              className=" whitespace-nowrap form-check-label inline-block text-gray-800"
              htmlFor="flexCheckDefault"
            >
              All day
            </label>
          </div>
          <input
            disabled={task.time === "allDay"}
            className="disabled:opacity-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="time"
            type="time"
            value={time}
            onChange={onChange}
            required
          />
        </div>
      </div>
      {task.frequency !== "once" ? (
        <div className="mb-4 flex-1">
          <div className="flex items-center gap-4  mb-4">
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="username"
            >
              End On
            </label>
            <select
              id="countries"
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={onChange}
              name="endBy"
              required
            >
              <option hidden defaultValue>
                End By
              </option>
              <option value="phase">Phase</option>
              <option value="date">Date</option>
              <option value="occurrence">Occurrence</option>
              <option value="manual">Manually End</option>
            </select>
          </div>
          {getInputByType("end", task.endBy)}
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <button
          onClick={onCreateTask}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Create Task
        </button>
      </div>
    </form>
  );
}
