import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PublicContent } from "@/lib/public-data";

type PublicContentState = {
  data: PublicContent | null;
  hydrated: boolean;
};

const initialState: PublicContentState = {
  data: null,
  hydrated: false,
};

export const publicContentSlice = createSlice({
  name: "publicContent",
  initialState,
  reducers: {
    hydratePublicContent(state, action: PayloadAction<PublicContent>) {
      state.data = action.payload;
      state.hydrated = true;
    },
  },
});

export const { hydratePublicContent } = publicContentSlice.actions;
export const publicContentReducer = publicContentSlice.reducer;
