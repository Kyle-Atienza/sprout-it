import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import materialService from "./materialService";

const initialState = {
  inventory: {},
  materials: [],
  finished: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getMaterials = createAsyncThunk(
  "inventory/getMaterials",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await materialService.getMaterials(token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const inventorySlice = createSlice({
  name: "inventory",
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
      .addCase(getMaterials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.materials = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = inventorySlice.actions;
export default inventorySlice.reducer;
