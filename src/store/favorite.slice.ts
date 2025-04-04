import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
export const CART_PERSISTENT_STATE = "cats";
export interface FavoriteItem {
  id: number;
  count: number;
}

export interface FavoriteState {
  items: FavoriteItem[];
}

export interface FavoritePersistentState {
  cart: FavoriteItem[];
}

const initialState: FavoriteState = {
  items: loadState<FavoritePersistentState>(CART_PERSISTENT_STATE)?.cart ?? [],
};

export const favoriteSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    clean: (state) => {
      state.items = [];
    },
    delete: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (!existed) {
        state.items.push({
          id: action.payload,
          count: 1,
        });
        return;
      }
      state.items.map((i) => {
        if (i.id === action.payload) {
          i.count += 1;
        }
        return i;
      });
    },
  },
});

export default favoriteSlice.reducer;
export const favoriteActions = favoriteSlice.actions;
