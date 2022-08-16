import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import batchReducer from "../features/batch/batchSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    batch: batchReducer,
  },
});
