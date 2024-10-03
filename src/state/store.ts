import { configureStore } from "@reduxjs/toolkit";
import userChoiceReducer from "./userChoice";

export const store = configureStore({
    reducer: {
        userChoice: userChoiceReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;