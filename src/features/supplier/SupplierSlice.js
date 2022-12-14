import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supplierService from "./supplierService";

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

export const createSupplier = createAsyncThunk(
  "supplier/create",
  async (supplierData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await supplierService.createSupplier(supplierData, token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSupplier = createAsyncThunk(
  "supplier/update",
  async (supplierData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await supplierService.updateSupplier(supplierData, token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  "supplier/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await supplierService.updateSupplier(
        { id: id, payload: { isDeleted: true } },
        token
      );
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
        state.suppliers = action.payload.filter(
          (supplier) => !supplier.isDeleted
        );
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.suppliers = [...state.suppliers, action.payload];
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        alert(action.payload.response);
      })
      .addCase(updateSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const replaceIndex = state.suppliers.indexOf(
          state.suppliers.find((supplier) => {
            return supplier._id === action.payload._id;
          })
        );

        state.suppliers[replaceIndex] = action.payload;
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.suppliers = state.suppliers.filter((supplier) => {
          return supplier._id !== action.payload._id;
        });
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetFinancial } = supplierSlice.actions;
export default supplierSlice.reducer;
