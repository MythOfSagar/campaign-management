import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "./Authorize/reducer.ts";
import { resourceReducer } from "./Resource/reducer.ts";
import { notificationReducer } from "./Notification/reducer.ts";

export const combinedStore = configureStore({
  reducer: {
    auth: authReducer,  
    resource:resourceReducer,
    notification:notificationReducer
  },
  devTools: true,  
});
