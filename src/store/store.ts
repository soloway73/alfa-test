import { configureStore } from "@reduxjs/toolkit";
import catsSlice, { CATS_PERSISTENT_STATE } from "./cats.slice";
import { saveState } from "./storage";

export const store = configureStore({
  reducer: {
    cats: catsSlice,
  },
});

store.subscribe(() => {
  saveState([...store.getState().cats.items], CATS_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
