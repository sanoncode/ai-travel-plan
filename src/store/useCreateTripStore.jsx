import { create } from "zustand";

export const useCreateTripStore = create((set) => ({
  // ====
  // Form State
  // ====
  formData: {
    country: null,
    states: null,
    days: null,
    people: null,
    budget: null,
  },
  setField: (name, value) => {
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }));
  },

  //====
  //UI State
  //====
  ui: {
    openGenerateDialog: false,
    isDaysInvalid: false,
  },
  setUi: (key, value) => {
    set((state) => ({
      ui: { ...state.ui, [key]: value },
    }));
  },

  //====
  //Generation State
  //====
  generation: {
    status: "idle",
    error: null,
  },
  setGeneration: (payload) => {
    set((state) => ({
      generation: {
        ...state.generation,
        ...payload,
      },
    }));
  },
  //====
  //Result
  //====
  result: {
    tripId: "",
    tripData: "",
  },
  setResult: (data) => {
    set({
      result: data,
    });
  },
  // ========================
  // Reset
  // ========================
  reset: () =>
    set({
      generation: { status: "idle", error: null },
      result: { tripId: null, tripData: null },
      ui: { openGenerateDialog: false, isDaysInvalid: false },
      formData: {
        country: null,
        states: null,
        days: null,
        people: null,
        budget: null,
      },
    }),
}));
