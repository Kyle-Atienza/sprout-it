import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supplierService from "./SupplierService";

const initialState = {
  suppliers: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getSuppliers = createAsyncThunk(
  "supplier/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await supplierService.getSuppliers(token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    resetFinancial: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.suppliers = action.payload;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetFinancial } = supplierSlice.actions;
export default supplierSlice.reducer;
