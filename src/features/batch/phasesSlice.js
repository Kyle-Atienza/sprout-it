import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phases: ["Composting", "Bagging", "Sterilization", "Inoculation", "Fruiting"],
};

export const phasesSlice = createSlice({
  name: "phases",
  initialState,
});

export default phasesSlice.reducer;
