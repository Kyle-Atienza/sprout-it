import { BellOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getNotifications,
  deleteNotification,
} from "../features/notification/notificationSlice";
import { CloseOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

export const NotificationButton = ({ className }) => {
  const socket = io(
    process.env.REACT_APP_PROXY.replace(/^http/, "ws").slice(0, -1)
  );
  const dispatch = useDispatch();

  const { notifications } = useSelector((state) => state.notification);

  const [notificationsState, setNotificationsState] = useState(false);

  useEffect(() => {
    dispatch(getNotifications());

    socket.on("notification-send", (title) => {
      console.log(title);
      dispatch(getNotifications());
      notify(title);
    });
  }, []);

  const notify = (message) =>
    toast(message, {
      toastId: "notifToast",
    });

  const onDeleteNotification = (notifId) => {
    dispatch(deleteNotification(notifId));
  };

  return (
    <div className="relative">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <button
        className={`w-12 h-12 rounded-full   hover:bg-light-200 shadow transition-all ${className} ${
          notifications.length ? "bg-primary-400" : "bg-light-100"
        }`}
        onClick={() => setNotificationsState(!notificationsState)}
      >
        <BellOutlined
          className={`${notifications.length ? "text-white" : ""}`}
        />
      </button>
      <div
        className={`absolute z-10 top-full right-0 w-[400px] bg-light-100 rounded-md shadow flex flex-col mt-5 ${
          notificationsState ? `flex` : `hidden`
        }`}
      >
        <h3 className="p-3">Notifications</h3>
        <div>
          {notifications.map((notification) => {
            return (
              <div
                key={notification._id}
                className="p-5 border-t-2 border-blue-900 relative flex justify-between"
              >
                <div>
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                </div>
                <div>
                  <button
                    className="p-3 bg-primary-400 rounded-full self-start h-min"
                    onClick={() => onDeleteNotification(notification._id)}
                  >
                    <CloseOutlined />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
