import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import batchService from "./batchService";

const initialState = {
  initialBatches: [],
  batches: [],
  active: [],
  finished: [],
  substrate: {
    kusot: [],
    dayami: [],
    mixed: [],
    unlisted: [],
  },
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

export const getBatch = createAsyncThunk(
  "batches/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await batchService.getBatch(id, token);
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

export const deleteBatch = createAsyncThunk(
  "batches/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await batchService.deleteBatch(id, token);
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
    loadBatchesBySubstrate: (state) => {
      state.substrate.mixed = state.active.filter((batch) => {
        return !!(
          batch.materials.filter(({ material }) => {
            return material.name === "Kusot";
          }).length &&
          batch.materials.filter(({ material }) => {
            return material.name === "Dayami";
          }).length
        );
      });
      state.substrate.dayami = state.active.filter((batch) => {
        return !!(
          batch.materials.filter(({ material }) => {
            return material.name === "Dayami";
          }).length &&
          !batch.materials.filter(({ material }) => {
            return material.name === "Kusot";
          }).length
        );
      });
      state.substrate.kusot = state.active.filter((batch) => {
        return !!(
          batch.materials.filter(({ material }) => {
            return material.name === "Kusot";
          }).length &&
          !batch.materials.filter(({ material }) => {
            return material.name === "Dayami";
          }).length
        );
      });
    },
    reloadBatches: (state, action) => {
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
      // finished tasks
      state.finished = action.payload.filter((batch) => {
        return batch.activePhase === "";
      });
      state.active = action.payload.filter((batch) => {
        return batch.active;
      });

      state.substrate.mixed = action.payload.filter((batch) => {
        return !(
          batch.materials.every((material) => {
            return material.material.name === "Dayami";
          }) ||
          batch.materials.every((material) => {
            return material.material.name === "Kusot";
          })
        );
      });
      state.substrate.dayami = action.payload.filter((batch) => {
        return batch.materials.some((material) => {
          return material.material.name === "Dayami";
        });
      });
      state.substrate.kusot = action.payload.filter((batch) => {
        return batch.materials.some((material) => {
          return material.material.name === "Kusot";
        });
      });
    },
    getBatchById: (state, action) => {
      console.log(action.payload);
      return action.payload.initialBatches.filter((batch) => {
        return batch._id === action.payload.id;
      });
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
        // finished tasks
        state.finished = action.payload.filter((batch) => {
          return batch.activePhase === "";
        });
        state.active = action.payload.filter((batch) => {
          return batch.active;
        });

        state.substrate.mixed = action.payload.filter((batch) => {
          return !(
            batch.materials.every((material) => {
              return material.material.name === "Dayami";
            }) ||
            batch.materials.every((material) => {
              return material.material.name === "Kusot";
            })
          );
        });
        state.substrate.dayami = action.payload.filter((batch) => {
          return batch.materials.some((material) => {
            return material.material.name === "Dayami";
          });
        });
        state.substrate.kusot = action.payload.filter((batch) => {
          return batch.materials.some((material) => {
            return material.material.name === "Kusot";
          });
        });
      })
      .addCase(getBatches.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
      })
      .addCase(getBatch.rejected, (state, action) => {
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
        state.batches.pre = state.batches.pre
          ? [...state.batches.pre, action.payload]
          : [action.payload];
      })
      .addCase(createBatch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;

        //temporary
        // alert(action.payload.response);
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
      .addCase(deleteBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.initialBatches = state.initialBatches.filter((batch) => {
          return batch._id !== action.payload._id;
        });

        // reloadBatches(state.initialBatches);
        window.location.reload();
      })
      .addCase(deleteBatch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, loadBatchesBySubstrate, reloadBatches, getBatchById } =
  batchSlice.actions;
export default batchSlice.reducer;
