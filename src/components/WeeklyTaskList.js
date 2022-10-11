import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Images } from "../core";
import { io } from "socket.io-client";
import { getTasks } from "../features/task/taskSlice";

import { WeeklyTaskCard } from "./WeeklyTaskCard";

export const WeeklyTaskList = ({ setIsTaskModalOpen, setSelectedTask }) => {
  const socket = io(
    process.env.REACT_APP_PROXY.replace(/^http/, "ws").slice(0, -1)
  );

  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.task);

  const mapDateDay = (day) => {
    switch (day) {
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      case 0:
        return "Sun";
      default:
        return "Sun";
    }
  };

  useEffect(() => {
    socket.on("notification-send", () => {
      dispatch(getTasks());
    });
  }, []);

  return (
    <div className="w-full text-left">
      <h2 className="poppins-heading-6 text-dark-500 mb-4">Weekly Tasks</h2>
      {tasks
        .filter((task) => {
          return task.status === "ongoing" && task.batch;
        })
        .sort((prevTask, currTask) => {
          return new Date(prevTask.next) - new Date(currTask.next);
        })
        .map((task) => {
          return (
            <>
              <WeeklyTaskCard
                onClick={() => {
                  setIsTaskModalOpen(true);
                  setSelectedTask(task);
                }}
                day={mapDateDay(new Date(task.start.on).getDay())}
                key={task._id}
                className=""
                task={task.name}
                batch={task.batch.name}
                phase={task.for.slice(0, 1).toUpperCase() + task.for.slice(1)}
                image={
                  Images[task.for.slice(0, 1).toUpperCase() + task.for.slice(1)]
                }
                next={task.next}
              />
            </>
          );
        })}
    </div>
  );
};
