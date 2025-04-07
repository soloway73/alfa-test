import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ICat } from "../interfaces/cat.interface";
import { loadState } from "./storage";
import { IFormCat } from "../components/Form/Form";
export const CATS_API =
  "https://api.thecatapi.com/v1/images/search?api_key=live_iXt581Pzo7rOnpLSmJMXSIYk9wqF12BJOK8qNUFoZRJReXl5KjFo9qRrAPUv2Tvm&limit=100&has_breeds=true";
export const CATS_PERSISTENT_STATE = "cats";

export interface CatsState {
  items: ICat[];
  isLoading: boolean;
}

export const getData = createAsyncThunk(
  "cats/data",
  async (abortController: AbortController) => {
    try {
      const { data } = await axios
        .get<ICat[]>(CATS_API, { signal: abortController.signal })
        .then((res) => res);
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

const initialState: CatsState = {
  items: loadState(CATS_PERSISTENT_STATE) || [],
  isLoading: false,
};

export const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<ICat[]>) => {
      state.items = action.payload;
    },
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
    edit: (state, action: PayloadAction<IFormCat>) => {
      state.items = state.items.map((i) => {
        if (i.id === action.payload.id) {
          return {
            ...i,
            url: action?.payload.url,
            breeds: [
              {
                ...i.breeds[0],
                name: action.payload.name,
                description: action.payload.description,
                temperament: action.payload.temperament,
                origin: action.payload.origin,
              },
            ],
          };
        }
        return i;
      });
    },
    add: (state, action: PayloadAction<IFormCat>) => {
      state.items = [
        {
          id: action.payload.id,
          url: action?.payload.url,
          breeds: [
            {
              name: action.payload.name,
              description: action.payload.description,
              temperament: action.payload.temperament,
              origin: action.payload.origin,
            },
          ],
          isLiked: false,
        },
        ...state.items,
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      if (action.payload) {
        state.items = action.payload;
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
