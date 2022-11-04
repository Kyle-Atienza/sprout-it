import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import financialService from "./financialService";

const initialState = {
  purchases: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getPurchases = createAsyncThunk(
  "financial/getPurchases",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await financialService.getPurchases(token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createPurchase = createAsyncThunk(
  "financial/createPurchase",
  async (purchaseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await financialService.createPurchase(purchaseData, token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePurchase = createAsyncThunk(
  "financial/updatePurchase",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await financialService.updatePurchase(token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePurchase = createAsyncThunk(
  "financial/deletePurchase",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await financialService.deletePurchase(token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const financialSlice = createSlice({
  name: "financial",
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
      .addCase(getPurchases.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPurchases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.purchases = action.payload;
      })
      .addCase(getPurchases.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.purchases = [...state.purchases, action.payload];

        window.location.reload();
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetFinancial } = financialSlice.actions;
export default financialSlice.reducer;
