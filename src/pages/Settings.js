import React, { Fragment, useState } from "react";
import { InviteForm } from "../components";
import {
  SideNavBar,
  TopNavBar,
  TextField,
  PrimaryButton,
  BackToTopButton,
} from "../components";
import { useEffect } from "react";
import { getMaterials } from "../features/inventory/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../features/user/userSlice";
import { DeleteFilled } from "@ant-design/icons";
import { updateUser } from "../features/user/userSlice";
import { Dialog, Transition } from "@headlessui/react";

export function Settings() {
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [modalSetup, setModalSetup] = useState({
    message: "",
    action: null,
  });
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    newPass: "",
    confirmPass: "",
  });

  const { users, user } = useSelector((state) => state.user);
  const passwordRegex = new RegExp(
    "^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}$"
  );

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getUsers());
  }, []);

  const onDeleteUser = (id) => {
    if (user.role === "owner") {
      dispatch(deleteUser(id));
    } else {
      alert("Restricted to Owner Only");
    }
    setModalSetup({
      message: "",
      action: null,
    });
    setConfirmDeleteModal(false);
  };

  const onChangeUpdatePassword = (e) => {
    setPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updatePassword = () => {
    if (passwordRegex.test(password.newPass)) {
      if (password.newPass === password.confirmPass) {
        dispatch(
          updateUser({
            id: user._id,
            data: {
              password: password.newPass,
            },
          })
        );
        setPassword({
          newPass: "",
          confirmPass: "",
        });
        alert("Password Updated Successfully");
        setModalSetup({
          message: "",
          action: null,
        });
        setConfirmDeleteModal(false);
      } else {
        alert("Your password didn't match");
      }
    } else {
      alert("Password is too weak");
    }
  };

  return (
    <>
      <Transition appear show={confirmDeleteModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setConfirmDeleteModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-dark-700 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="overflow-y-scroll scrollbar-hidden bg-light-100 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all flex flex-col">
                  <div className="w-full flex flex-col items-center justify-start mb-6">
                    <Dialog.Title as="h3" className="poppins-heading-6 w-full">
                      Confirm End Task
                    </Dialog.Title>
                    <p className="my-4">{modalSetup.message}</p>
                    <div className="flex gap-x-4">
                      <button
                        type="button"
                        className={`py-4 px-6 rounded-full poppins-button border-2 border-red-500 hover:bg-red-500 hover:text-light-100 text-red-500 shadow transition-all `}
                        onClick={modalSetup.action}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`py-4 px-6 rounded-full poppins-button bg-red-500 hover:bg-red-700 text-light-100 shadow transition-all `}
                        onClick={() => setConfirmDeleteModal(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="flex flex-row min-h-screen">
        <div className="w-0 lg:w-1/6">
          <SideNavBar />
        </div>

        <div className="flex flex-col w-full lg:w-5/6" id="top">
          <div className="w-full">
            <TopNavBar pageName="Settings" />
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-4 my-4 py-4 px-4 md:px-6 lg:px-9">
            <section className="w-full lg:w-1/3">
              <InviteForm />
              <h3 className="poppins-heading-6 mt-6">Change Password</h3>
              <TextField
                value={password.newPass}
                type="password"
                name="newPass"
                id="password"
                placeholder="Create new password"
                onChange={onChangeUpdatePassword}
              />
              <ul>
                <li>At least 1 lowerchase letter</li>
                <li>At least 1 uppercase letter</li>
                <li>At least 1 number</li>
                <li>At least a special character</li>
                <li>And at least 8 characters long</li>
              </ul>
              <TextField
                value={password.confirmPass}
                type="password"
                name="confirmPass"
                id="password"
                placeholder="Confirm new password"
                onChange={onChangeUpdatePassword}
              />
              <PrimaryButton
                className="mt-4"
                name="Update Password"
                onClick={() => {
                  setModalSetup({
                    message: "Are you sure you to update your password?",
                    action: updatePassword,
                  });
                  setConfirmDeleteModal(true);
                }}
              />
            </section>

            <div className="w-full lg:w-2/3 overflow-x-auto harvests-table mx-0 md:mx-6 lg:mx-10 my-6 shadow-md bg-light-100 rounded-xl">
              <table className="w-full text-sm text-left">
                <thead className=" poppins-paragraph text-secondary-300">
                  <tr>
                    <th scope="col" className="py-4 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-4 px-6">
                      Email
                    </th>
                    <th scope="col" className="py-4 px-6">
                      Role
                    </th>
                    <th scope="col" className="py-4 px-6"></th>
                  </tr>
                </thead>
                <tbody className="open-paragraph">
                  {users.map((account) => {
                    return (
                      <tr
                        key={account._id}
                        className={`${
                          user._id === account._id
                            ? "bg-green-100"
                            : "bg-light-100"
                        } hover:bg-light-200 border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out`}
                      >
                        <td className="py-4 px-6">{account.name}</td>
                        <td className="py-4 px-6">{account.email}</td>
                        <td className="py-4 px-6">{account.role}</td>
                        <td className="py-4 px-6 ">
                          <button
                            className={
                              account.role === "owner"
                                ? "hidden"
                                : user.role === "owner"
                                ? "cursor-pointer"
                                : "cursor-default"
                            }
                            onClick={() => {
                              setModalSetup({
                                message:
                                  "Are you sure you want to delete this user?",
                                action: () => onDeleteUser(account._id),
                              });
                              setConfirmDeleteModal(true);
                            }}
                          >
                            {/* <DeleteFilled className="text-red-500" /> */}
                            <DeleteFilled
                              className={
                                user.role === "owner"
                                  ? "text-red-500"
                                  : "text-gray-400 pointer-events-none"
                              }
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <BackToTopButton />
        </div>
      </div>
    </>
  );
}
