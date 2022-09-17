import React, { useState } from "react";
import { InviteForm } from "../components";
import { SideNavBar, TopNavBar, TextField } from "../components";

export function Settings() {
  return (
    <>
      <div className="flex flex-row w-screen min-h-screen">
        <div className="w-0 lg:w-1/6">
          <SideNavBar />
        </div>

        <div className="flex flex-col w-full lg:w-5/6">
          <div className="w-full">
            <TopNavBar pageName="Settings" />
          </div>
          <div className="w-full my-4 py-4 px-4 md:px-6 lg:px-9">
            <section className="w-full lg:w-1/2 ">
              <InviteForm />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
