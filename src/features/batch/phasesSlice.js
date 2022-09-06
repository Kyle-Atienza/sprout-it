import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phases: [
    "pre",
    "composting",
    "bagging",
    "sterilization",
    "inoculation",
    "fruiting",
    "post",
  ],
};

export const phasesSlice = createSlice({
  name: "phases",
  initialState,
});

export default phasesSlice.reducer;
