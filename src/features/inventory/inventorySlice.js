import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import inventoryService from "./inventoryService";

const initialState = {
  materials: [],
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
      return await inventoryService.getMaterials(token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postMaterial = createAsyncThunk(
  "inventory/postMaterial",
  async (materialData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await inventoryService.postMaterial(materialData, token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const putMaterial = createAsyncThunk(
  "inventory/putMaterial",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const token = thunkAPI.getState().user.user.token;
      return await inventoryService.putMaterial(payload, token);
    } catch (error) {
      const message = {
        status: error.message,
        response: error.response.data.message,
      };

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMaterial = createAsyncThunk(
  "inventory/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await inventoryService.deleteMaterial(id, token);
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
        state.isLoading = false;
        state.isSuccess = true;
        state.materials = action.payload.filter(
          (material) => !material.isDeleted
        );
      })
      .addCase(getMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(postMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.materials = [...state.materials, action.payload];
      })
      .addCase(postMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(putMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(putMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.materials = action.payload;
        const replaceIndex = state.materials.indexOf(
          state.materials.find((material) => {
            return material._id === action.payload._id;
          })
        );
        state.materials[replaceIndex] = action.payload;
      })
      .addCase(putMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.materials = state.materials.filter((notification) => {
          return notification._id !== action.payload.id;
        });

        window.location.reload();
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = inventorySlice.actions;
export default inventorySlice.reducer;
