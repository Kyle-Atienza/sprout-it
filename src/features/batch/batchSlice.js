import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import batchService from "./batchService";
import materialService from "./materialService";

const initialState = {
  initialBatches: [],
  batches: [],
  tasks: [],
  finished: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getBatches = createAsyncThunk(
  "batches/getAll",
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

export const createBatch = createAsyncThunk(
  "batches/create",
  async (batchData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await batchService.createBatch(batchData, token);
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

export const setMaterials = createAsyncThunk(
  "batches/setMaterials",
  async (materialData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await materialService.setMaterials(materialData, token);
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
        const batchTasks = action.payload.filter(
          (batch) => batch.tasks.length && batch.active
        );

        state.isLoading = false;
        state.isSuccess = true;
        state.initialBatches = action.payload;
        state.batches = action.payload
          .filter((batch) => {
            return batch.activePhase !== "";
          })
          .reduce((phases, batch) => {
            const { activePhase } = batch;
            phases[activePhase] = phases[activePhase] ?? [];
            phases[activePhase].push(batch);
            return phases;
          }, {});
        state.tasks = batchTasks;
        state.finished = action.payload.filter((batch) => {
          return batch.activePhase === "";
        });
      })
      .addCase(getBatches.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.initialBatches = [...state.initialBatches, action.payload];
      })
      .addCase(createBatch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setMaterials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(setMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = batchSlice.actions;
export default batchSlice.reducer;
