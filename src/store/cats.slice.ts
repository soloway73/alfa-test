import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ICat } from "../interfaces/cat.interface";
import { loadState, saveState } from "./storage";
export const CATS_API =
  "https://api.thecatapi.com/v1/images/search?api_key=live_iXt581Pzo7rOnpLSmJMXSIYk9wqF12BJOK8qNUFoZRJReXl5KjFo9qRrAPUv2Tvm&limit=100&has_breeds=true";
export const CATS_PERSISTENT_STATE = "cats";

export interface CatsState {
  items: ICat[];
  isLoading: boolean;
}

export const getData = createAsyncThunk("cats/data", async () => {
  try {
    const { data } = await axios.get<ICat[]>(CATS_API).then((res) => res);
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message);
    }
  }
});

const initialState: CatsState = {
  items: loadState<ICat[]>(CATS_PERSISTENT_STATE) ?? [],
  isLoading: false,
};

export const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    clean: (state) => {
      state.items = [];
    },
    delete: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    like: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((i) =>
        i.id === action.payload ? { ...i, isLiked: !i.isLiked } : i
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      if (action.payload) {
        state.items = action.payload;
        saveState<ICat[]>(action.payload, CATS_PERSISTENT_STATE);
        state.isLoading = false;
      }
    });
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default catsSlice.reducer;
export const catsActions = catsSlice.actions;
