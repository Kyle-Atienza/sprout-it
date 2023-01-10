import React from "react";
import { Images } from "../core";
import { TextField, PrimaryButton } from "../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, resetPassword } from "../features/user/userSlice";
import { useJwt } from "react-jwt";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { decodedToken } = useJwt(location.pathname.split("/")[2]);
  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  /* const [payload, setPayload] = useState({
    id: "",
    email: ""
  }) */
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  const { confirmPassword, password } = formData;

  useEffect(() => {
    if (decodedToken) {
      const { id, email } = decodedToken;

      setId(id);
      setEmail(email);
    }
  }, [decodedToken]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password did not match");
      return;
    }

    const payload = {
      id: id,
      email: email,
      password: password,
    };

    dispatch(resetPassword(payload));
    navigate("/");
  };

  return (
    <>
      <div
        className="w-screen h-screen bg-center bg-cover bg-accent-100 flex justify-center items-center"
        style={{ backgroundImage: `url(${Images.LoginRegisterBg})` }}
      >
        <section className="w-full md:w-auto lg:w-1/3  h-full md:h-auto p-4 md:p-16 bg-light-100 absolute md:rounded-3xl shadow flex flex-col justify-center text-center">
          <div className="flex justify-center ">
            <img
              className="w-24 h-auto"
              src={Images.LogoIcon}
              alt="Sprout It"
            />
          </div>
          <div className="mt-4 mb-8">
            <h1 className="poppins-heading-5 text-primary-500 mb-4">
              Reset your Password
            </h1>
            <h3 className="open-heading-6 text-seconday-400">
              Please create your new password
            </h3>
          </div>
          <form className="flex flex-col" onSubmit={onSubmit}>
            <TextField
              value={password}
              type="password"
              name="password"
              id="email"
              placeholder="New Password"
              onChange={onChange}
            />
            <TextField
              value={confirmPassword}
              type="password"
              name="confirmPassword"
              id="email"
              placeholder="Re-enter new Password"
              onChange={onChange}
            />
            <PrimaryButton
              className={"mt-10"}
              name="Update Password"
              onClick={onSubmit}
            >
              <input type="submit" value="Submit" />
            </PrimaryButton>
          </form>
        </section>
      </div>
    </>
  );
};
