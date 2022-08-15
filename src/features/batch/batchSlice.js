import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import batchService from "./batchService";

const initialState = {
  initialBatches: [],
  batches: [],
  tasks: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getBatches = createAsyncThunk(
  "user/batches",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await batchService.getBatches(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.register.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const batchSlice = createSlice({
  name: "batch",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBatches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBatches.fulfilled, (state, action) => {
        const batchTasks = action.payload.filter((batch) => batch.tasks.length);

        state.isLoading = false;
        state.isSuccess = true;
        state.initialBatches = action.payload;
        state.batches = action.payload.reduce((phases, batch) => {
          const { activePhase } = batch;
          phases[activePhase] = phases[activePhase] ?? [];
          phases[activePhase].push(batch);
          return phases;
        }, {});
        state.tasks = batchTasks;
      })
      .addCase(getBatches.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = batchSlice.actions;
export default batchSlice.reducer;
