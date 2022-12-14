import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import batchReducer from "../features/batch/batchSlice";
import inventoryReducer from "../features/inventory/inventorySlice";
import phasesReducer from "../features/batch/phasesSlice";
import taskReducer from "../features/task/taskSlice";
import harvestReducer from "../features/harvest/harvestSlice";
import financialReducer from "../features/financial/financialSlice";
import supplierReducer from "../features/supplier/supplierSlice";
import notificationReducer from "../features/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    batch: batchReducer,
    inventory: inventoryReducer,
    phases: phasesReducer,
    task: taskReducer,
    harvest: harvestReducer,
    financial: financialReducer,
    supplier: supplierReducer,
    notification: notificationReducer,
  },
});
