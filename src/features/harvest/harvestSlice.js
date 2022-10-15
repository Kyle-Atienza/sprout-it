import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import harvestService from "./harvestService";

const initialState = {
  harvests: {}, // group harvests by batch
  batchHarvests: [],
  daily: [],
  weekly: [],
  monthly: [],
  yearly: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getHarvests = createAsyncThunk(
  "harvest/getAll",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await harvestService.getHarvests(id, token);
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
  async (harvestData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await harvestService.createHarvest(harvestData, token);
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
  "harvest/update",
  async (updatedHarvestData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await harvestService.updateHarvest(updatedHarvestData, token);
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
  "harvest/delete",
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
  reducers: {
    resetHarvests: (state) => {
      state.batchHarvests = [];
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
    getDailyHarvests: (state, action) => {
      state.daily = action.payload
        .filter((batch) => {
          // get batch with harvests
          return batch.harvests.length;
        })
        .map((batch) => {
          // get only harvests data
          return batch.harvests;
        })
        .flat() // flatten nested arrays
        .reduce((date, currentBatch, index) => {
          // group arrays by date
          const { createdAt } = currentBatch;
          const key = new Date(createdAt)
            .toDateString()
            .slice(4)
            .replaceAll(" ", "-");
          date[index] = date[index] ?? {
            date: key,
            harvests: [],
          };
          date[index].harvests.push(currentBatch);
          return date;
        }, [])
        .slice() // gamitin daw pag nag ssort kase d nagana
        .sort((a, b) => {
          // sort date from earliest to latest
          return Date.parse(a.date) - Date.parse(b.date);
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHarvests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHarvests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.batchHarvests = action.payload;
      })
      .addCase(getHarvests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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
      })
      .addCase(updateHarvest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHarvest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.batchHarvests = action.payload;
        const replaceIndex = state.batchHarvests.indexOf(
          state.batchHarvests.find((harvest) => {
            return harvest._id === action.payload._id;
          })
        );

        state.batchHarvests[replaceIndex] = action.payload;
      })
      .addCase(updateHarvest.rejected, (state, action) => {
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

export const { resetHarvests, getDailyHarvests } = harvestSlice.actions;
export default harvestSlice.reducer;
