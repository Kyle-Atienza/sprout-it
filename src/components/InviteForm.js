import React, { useEffect } from "react";
import { TextField } from "./TextField";
import { PrimaryButton } from "./PrimaryButton";
import { useSelector, useDispatch } from "react-redux";
import { invite, clearInviteToken } from "../features/user/userSlice";
import { useState } from "react";

export function InviteForm() {
  const dispatch = useDispatch();

  const [invitedUser, setInvitedUser] = useState({});
  const [inviteToken, setInviteToken] = useState("");

  const { inviteToken: generatedToken } = useSelector((state) => state.user);

  const onChange = (e) => {
    setInvitedUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onCreateInvite = () => {
    dispatch(invite(invitedUser));
  };

  useEffect(() => {
    setInviteToken(generatedToken);
  }, [dispatch, generatedToken, inviteToken]);

  useEffect(() => {
    return () => {
      dispatch(clearInviteToken());
      setInvitedUser({});
    };
  }, []);

  // const link = "https://sprout-it.vercel.app/register/";
  const link = `${window.location.origin}/register/`;

  return (
    <>
      <h2 className="poppins-heading-6">Invite Worker</h2>
      <form className="flex flex-col" action="">
        <div className="flex gap-4 w-full">
          <TextField
            name={"firstName"}
            placeholder={"First Name"}
            onChange={onChange}
            className="w-full"
          />
          <TextField
            name={"lastName"}
            placeholder={"Last Name"}
            onChange={onChange}
            className="w-full"
          />
        </div>
        <TextField
          name={"email"}
          type={"email"}
          placeholder={"Email"}
          onChange={onChange}
        />
        <PrimaryButton
          name="Generate Token"
          className="my-4"
          onClick={onCreateInvite}
        />
      </form>
      <h2 className="poppins-heading-6 mt-6">Generated Link</h2>
      <TextField
        className="w-full"
        value={inviteToken ? link + inviteToken.inviteToken : ""}
        type="text"
        readonly
      />
    </>
  );
}
