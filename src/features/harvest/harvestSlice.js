import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import harvestService from "./harvestService";

const initialState = {
  harvests: [], // group harvests by batch
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getHarvests = createAsyncThunk(
  "harvest/create",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await harvestService.createHarves(token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createHarvest = createAsyncThunk(
  "harvest/create",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await harvestService.createHarvest(payload, token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateHarvest = createAsyncThunk(
  "harvest/create",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await harvestService.updateHarvest(payload, token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteHarvest = createAsyncThunk(
  "harvest/create",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await harvestService.deleteHarvest(payload, token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const harvestSlice = createSlice({
  name: "harvest",
  initialState,
  extraReducers: (builder) => {
    builder
      /* .addCase(getHarvests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHarvests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.harvests = action.payload;
      })
      .addCase(getHarvests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }) */
      .addCase(createHarvest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHarvest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.harvests = [...state.harvests, action.payload];
      })
      .addCase(createHarvest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    /* .addCase(updateHarvest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHarvest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const replaceIndex = state.harvests.indexOf(
          state.harvests.find((harvest) => {
            return harvest._id === action.payload._id;
          })
        );
        state.harvests[replaceIndex] = action.payload;
      })
      .addCase(updateHarvest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteHarvest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteHarvest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.harvests = state.harvests.splice(
          state.harvests.indexOf(
            state.harvests.find((harvest) => {
              return harvest._id === action.payload._id;
            }),
            1
          )
        );
      })
      .addCase(deleteHarvest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }); */
  },
});

export default harvestSlice.reducer;
