import React, { useEffect } from "react";
import "tw-elements";
import {
  HomeOutlined,
  CalendarOutlined,
  FundOutlined,
  FolderOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import {
  NotificationButton,
  Modal,
  HelpButton,
  PreProductionForm,
} from "../components";
import { getToken } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/user/userSlice";

export const TopNavBar = ({ pageName }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const onClickNotification = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        if (!user.fcmToken) {
          getToken().then((token) => {
            dispatch(
              updateUser({
                id: user._id,
                data: {
                  fcmToken: token,
                },
              })
            );
          });
        }
      }
    });
  };

  return (
    <>
      <nav
        className="
        z-0
            absolute
            w-full
            h-20
            lg:hidden
            flex flex-wrap
            items-center
            justify-between
            py-4
            //bg-gray-100
            text-gray-500
            hover:text-gray-700
            focus:text-gray-700
            navbar navbar-expand-lg navbar-light
            "
      >
        <div className="container-fluid w-auto flex flex-wrap items-center justify-between px-2 md:px-4">
          <button
            className="
              navbar-toggler
              text-gray-500
              border-0
              hover:shadow-none hover:no-underline
              py-2
              px-2
              bg-transparent
              focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
            "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MenuOutlined className="text-xl" />
          </button>
          <div
            className="collapse navbar-collapse flex-grow items-center"
            id="navbarSupportedContent"
          >
            {/* <!-- Left links --> */}
            <ul className="navbar-nav flex flex-col list-style-none mr-auto bg-light-100 rounded-lg lg:hidd shadow p-4">
              <li className="rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all">
                <a
                  href="/home"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <HomeOutlined className="text-xl leading-none -mt-1" />
                  <h4 className="poppins-paragraph font-semibold">Home</h4>
                </a>
              </li>
              <li className="rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all">
                <a
                  href="/production"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <CalendarOutlined className="text-xl leading-none -mt-1" />
                  <h4 className="poppins-paragraph font-semibold">
                    Production
                  </h4>
                </a>
              </li>
              <li className="rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all">
                <a
                  href="/analytics"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <FundOutlined className="text-xl leading-none -mt-1" />
                  <h4 className="poppins-paragraph font-semibold">Analytics</h4>
                </a>
              </li>
              <li className="rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all">
                <a
                  href="/records"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <FolderOutlined className="text-xl leading-none -mt-1" />
                  <h4 className="poppins-paragraph font-semibold">Records</h4>
                </a>
              </li>
              <li className="rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all">
                <a
                  href="/profile"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <UserOutlined className="text-xl leading-none -mt-1" />
                  <h4 className="poppins-paragraph font-semibold">Profile</h4>
                </a>
              </li>
              <li className="rounded-full px-4 py-2 hover:bg-primary-100 active:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all">
                <a
                  href="/settings"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <SettingOutlined className="text-xl leading-none -mt-1" />
                  <h4 className="poppins-paragraph font-semibold">Settings</h4>
                </a>
              </li>
              <li className="rounded-full px-4 py-2 hover:bg-primary-100 text-dark-400 hover:text-primary-700 transition-all">
                <a
                  href="/settings"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <LogoutOutlined className="text-xl leading-none -mt-1" />
                  <h4 className="poppins-paragraph font-semibold">Log out</h4>
                </a>
              </li>
            </ul>
            {/* <!-- Left links --> */}
          </div>
          {/* <!-- Collapsible wrapper --> */}
        </div>
      </nav>
      <div className="w-full z-30 flex flex-row h-20 items-center justify-between px-4 md:px-6 lg:px-9">
        <h1 className="ml-8 md:ml-10 lg:ml-0 md:block poppins-paragraph font-semibold md:poppins-heading-4 lg:poppins-heading-3 text-primary-400">
          {pageName}
        </h1>
        <div className="flex flex-row items-center gap-4">
          <Modal title="Start New Production">
            <PreProductionForm />
          </Modal>
          {/* <PrimaryButton
            className='hidden mx-4 text-xl leading-none md:flex justify-center items-center'
            name='Start a new batch'
            onClick={openModal}
          />
          <button
            className='block md:hidden w-12 h-12 mx-4 text-xl pb-0.5 leading-none text-light-100 rounded-full bg-primary-400 hover:bg-primary-500 shadow transition-all'
            onClick={openModal}
          >
            <PlusOutlined />
          </button> */}
          <NotificationButton className="text-xl leading-none flex justify-center items-center" />
          <HelpButton className="text-xl leading-none flex justify-center items-center" />
        </div>
      </div>
    </>
  );
};
