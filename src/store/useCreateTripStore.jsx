import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCreateTripStore = create(
  persist(
    (set) => ({
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

      openGenerateDialog: false,
      isDaysInvalid: false,
      generateAfterLogin: false,

      setUi: (key, value) => {
        set({
          [key]: value,
        });
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

          openGenerateDialog: false,
          isDaysInvalid: false,
          generateAfterLogin: false,

          formData: {
            country: null,
            states: null,
            days: null,
            people: null,
            budget: null,
          },
        }),
    }),
    {
      name: "form_data",
      partialize: (state) => ({
        formData: state.formData,
        generateAfterLogin: state.generateAfterLogin
      }),
    },
  ),
);
