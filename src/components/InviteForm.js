import React, { useEffect } from "react";
import { TextField } from "./TextField";
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
    // console.log(invitedUser);
    dispatch(invite(invitedUser));
  };

  useEffect(() => {
    setInviteToken(generatedToken);
    console.log(inviteToken);
  }, [dispatch, generatedToken, inviteToken]);

  useEffect(() => {
    return () => {
      dispatch(clearInviteToken());
      setInvitedUser({});
    };
  }, []);

  return (
    <>
      <h2>Invite Worker</h2>
      <form className="flex flex-col" action="">
        <div className="flex flex-1">
          <TextField
            name={"firstName"}
            placeholder={"First Name"}
            onChange={onChange}
          />
          <TextField
            name={"lastName"}
            placeholder={"Last Name"}
            onChange={onChange}
          />
        </div>
        <TextField
          name={"email"}
          type={"email"}
          placeholder={"Email"}
          onChange={onChange}
        />
        <button
          onClick={onCreateInvite}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Generate Token
        </button>
      </form>
      <h2>Generated Link</h2>
      <p>{inviteToken ? inviteToken.inviteToken : ""}</p>
    </>
  );
}
