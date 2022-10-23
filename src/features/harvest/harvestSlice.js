import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import harvestService from "./harvestService";

const initialState = {
  harvestsByTimeRange: {
    days: [],
    weeks: [],
    months: [],
  },
  harvests: [],
  batchHarvests: [],
  dailyHarvests: [],
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

/* export const mapHarvestsByTimeFrame = createAsyncThunk(
  "harvest/mapByTimeFrame",
  async (payload, thunkAPI) => {}
); */

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
      const harvestsByTimeRange = action.payload
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
          date[key] = date[key] ?? {
            date: key,
            harvests: [],
          };
          date[key].harvests.push(currentBatch);
          return date;
        }, {});

      state.dailyHarvests = Object.keys(harvestsByTimeRange)
        .map((harvest) => {
          return {
            date: harvestsByTimeRange[harvest].date,
            harvests: harvestsByTimeRange[harvest].harvests,
          };
        })
        .slice() // gamitin daw pag nag ssort kase d nagana
        .sort((a, b) => {
          // sort date from earliest to latest
          return Date.parse(a.date) - Date.parse(b.date);
        });
    },
    mapHarvestsByTimeFrame: (state, action) => {
      const getDatesInRange = (startDate, endDate, range) => {
        let date;
        let interval;
        let end;

        // console.log(startDate, endDate, range);

        if (range === "days") {
          date = new Date(startDate.getTime());
          interval = 1;
          end = new Date(endDate.setDate(endDate.getDate() + 1));
        } else if (range === "weeks") {
          const day = new Date(startDate).getDay();
          const diff =
            new Date(startDate).getDate() - day + (day === 0 ? -6 : 1);

          date = new Date(new Date(startDate).setDate(diff));
          interval = 7;
          end = new Date(endDate.setDate(endDate.getDate() + 7));
        } else if (range === "months") {
          date = new Date(
            new Date(startDate).getFullYear(),
            new Date(startDate).getMonth(),
            1
          );
          end = new Date(endDate.setMonth(endDate.getMonth() + 1));
        }

        const dates = [];

        if (range === "days") {
          while (date <= end) {
            dates.push(
              new Date(date).toDateString().slice(4).replaceAll(" ", "-")
            );
            date.setDate(date.getDate() + interval);
          }
        } else if (range === "weeks") {
          while (date <= end) {
            dates.push(
              new Date(date).toDateString().slice(4).replaceAll(" ", "-")
            );
            date.setDate(date.getDate() + interval);
          }
        } else if (range === "months") {
          while (date <= end) {
            dates.push(
              new Date(date).toDateString().slice(4).replaceAll(" ", "-")
            );
            date.setMonth(date.getMonth() + 1);
          }
        }

        return dates;
      };

      Object.keys(state.harvestsByTimeRange).forEach((time) => {
        const dates = getDatesInRange(
          new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          new Date(Date.now()),
          time
        );

        state.harvestsByTimeRange[time] = dates.map((date, index) => {
          return {
            date: date,
            label:
              time === "months"
                ? date.split("-").splice(0, 1).join(" ")
                : date.split("-").splice(0, 2).join(" "),
            data: [
              ...action.payload.filter((harvest) => {
                return (
                  new Date(harvest.date).getTime() >=
                    new Date(dates[index]).getTime() &&
                  new Date(harvest.date).getTime() <
                    new Date(
                      dates[index + 1] ? dates[index + 1] : date
                    ).getTime()
                );
              }),
            ]
              .map((harvest) => harvest.harvests)
              .flat(),
          };
        });
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
        state.batchHarvests = [...state.batchHarvests, action.payload];
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

export const { resetHarvests, getDailyHarvests, mapHarvestsByTimeFrame } =
  harvestSlice.actions;
export default harvestSlice.reducer;
