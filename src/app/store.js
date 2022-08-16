import { configureStore, compose, applyMiddleware } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import batchReducer from "../features/batch/batchSlice";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({
  reducer: {
    user: userReducer,
    batch: batchReducer,
  },
});
