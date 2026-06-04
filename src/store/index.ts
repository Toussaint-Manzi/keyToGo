import { configureStore } from "@reduxjs/toolkit";
import { publicContentReducer } from "@/store/slices/public-content-slice";
import { quoteFormReducer } from "@/store/slices/quote-form-slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      publicContent: publicContentReducer,
      quoteForm: quoteFormReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
