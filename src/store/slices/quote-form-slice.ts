import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type QuoteFormState = {
  submitting: boolean;
  success: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
};

const initialState: QuoteFormState = {
  submitting: false,
  success: false,
  error: null,
  fieldErrors: {},
};

export const quoteFormSlice = createSlice({
  name: "quoteForm",
  initialState,
  reducers: {
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.submitting = action.payload;
    },
    setSuccess(state, action: PayloadAction<boolean>) {
      state.success = action.payload;
      if (action.payload) {
        state.error = null;
        state.fieldErrors = {};
      }
    },
    setFormError(
      state,
      action: PayloadAction<{
        message?: string;
        fieldErrors?: Record<string, string>;
      }>,
    ) {
      state.error = action.payload.message ?? null;
      state.fieldErrors = action.payload.fieldErrors ?? {};
      state.success = false;
    },
    resetQuoteForm() {
      return initialState;
    },
  },
});

export const { setSubmitting, setSuccess, setFormError, resetQuoteForm } =
  quoteFormSlice.actions;
export const quoteFormReducer = quoteFormSlice.reducer;
