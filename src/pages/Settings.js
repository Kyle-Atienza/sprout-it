import React, { useState } from "react";
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

export function Settings() {
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

  /* useEffect(() => {
    dispatch(getUsers());
  }, [users]); */

  const onDeleteUser = (id) => {
    dispatch(deleteUser(id));
    window.location.reload();
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
      } else {
        alert("Your password didn't match");
      }
    } else {
      alert("Password is too weak");
    }
  };

  return (
    <>
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
                onClick={updatePassword}
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
                  {users.map((user) => {
                    return (
                      <tr
                        key={user._id}
                        className="bg-light-100 hover:bg-light-200 border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
                      >
                        <td className="py-4 px-6">{user.name}</td>
                        <td className="py-4 px-6">{user.email}</td>
                        <td className="py-4 px-6">{user.role}</td>
                        <td className="py-4 px-6 ">
                          <button onClick={() => onDeleteUser(user._id)}>
                            <DeleteFilled className="text-red-500" />
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
