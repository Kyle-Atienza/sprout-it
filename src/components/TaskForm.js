import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { createTask, getTasks } from "../features/batch/batchSlice";
import { createTask, getTasks } from "../features/task/taskSlice";
import { PrimaryButton, TextField } from "../components";

export function TaskForm({ batch, closeModal }) {
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

  const datePickerMin = (on) => {
    if (startOn && on === "end") {
      return startOn;
    } else if (on === "start") {
      return new Date().toISOString().split("T")[0];
    }
  };

  const onCreateTask = (e) => {
    console.log("create task");
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
        for: batch.activePhase,
        frequency: frequency,
        time: time,
      })
    );
    closeModal();
    // window.location.reload();
  };

  const getInputByType = (on, type) => {
    if (type === "phase") {
      return (
        <select
          id="countries"
          className="w-full p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400"
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
          className="w-full p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400"
          id="username"
          name={`${on}On`}
          type="date"
          onChange={onChange}
          required
          min={datePickerMin(on)}
        />
      );
    }
    if (type === "occurrence") {
      return (
        <input
          className="w-full p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400"
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
    <form className="mb-4">
      <div className="mb-4">
        <label className="block open-button mb-2" htmlFor="username">
          Task Name <span className="text-red-600">*</span>
        </label>
        <TextField
          className="w-full open-paragraph-sm mt-0"
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
        <label className="block open-button mb-2" htmlFor="username">
          Task Description
        </label>
        <TextField
          className="w-full open-paragraph-sm mt-0"
          id="username"
          type="text"
          name="description"
          value={task.description}
          onChange={onChange}
          placeholder="Optional"
        />
      </div>
      <div className="mb-4">
        <label className="block open-button" htmlFor="username">
          Frequency <span className="text-red-600">*</span>
        </label>
        <select
          id="countries"
          className="w-full p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400"
          onChange={onChange}
          name="frequency"
          required
        >
          <option hidden defaultValue>
            Select Frequency
          </option>
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="flex-1 block open-button" htmlFor="username">
          Start On <span className="text-red-600">*</span>
        </label>
        <div className="flex items-center gap-4">
          <select
            id="countries"
            className="w-1/3 p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400"
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
          {getInputByType("start", task.startBy)}
        </div>
      </div>

      <div className="mb-4">
        <label className="flex-1 block open-button" htmlFor="username">
          Time <span className="text-red-600">*</span>
        </label>
        <div className="flex items-center gap-4">
          <div className="form-check flex">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary-500 checked:border-primary-500 focus:ring-primary-500 focus:border-primary-400 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
            className="w-full p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400"
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
          <label className="flex-1 block open-button" htmlFor="username">
            End on <span className="text-red-600">*</span>
          </label>
          <select
            id="countries"
            className="w-full p-3 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm my-2 focus:ring-primary-500 focus:border-primary-400"
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
          {getInputByType("end", task.endBy)}
        </div>
      ) : null}

      <div className="w-full flex items-center justify-end">
        <PrimaryButton name="Create Task" className="" onClick={onCreateTask} />
      </div>
    </form>
  );
}
