import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import batchService from "./batchService";

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
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

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
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBatch = createAsyncThunk(
  "batches/update",
  async (updatedBatchData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await batchService.updateBatch(updatedBatchData, token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTask = createAsyncThunk(
  "batch/addTask",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      await batchService.createTask(taskData, token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

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
        state.isLoading = false;
        state.isSuccess = true;

        // all batches not filtered
        state.initialBatches = action.payload;

        // all active batches separated in their own phases
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

        // batches with tasks
        state.tasks = action.payload.filter(
          (batch) => batch.tasks.length && batch.active
        );

        // finished tasks
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
      .addCase(updateBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        //replace batch
        const replaceIndex = state.initialBatches.indexOf(
          state.initialBatches.find((batch) => {
            return batch._id === action.payload._id;
          })
        );
        state.initialBatches[replaceIndex] = action.payload;

        state.batches = state.initialBatches
          .filter((batch) => {
            return batch.activePhase !== "";
          })
          .reduce((phases, batch) => {
            const { activePhase } = batch;
            phases[activePhase] = phases[activePhase] ?? [];
            phases[activePhase].push(batch);
            return phases;
          }, {});
      })
      .addCase(updateBatch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = batchSlice.actions;
export default batchSlice.reducer;
