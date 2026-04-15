import { create } from "zustand";

export const useTripStore = create((set) => ({
  // ===
  // data
  // ===
  userTrips: [],
  currentTrip: null,
  loading: false,
  errorTrip: null,

  // ===
  // userTrips
  // ===

  setTrips: (trips) => {
    set({
      userTrips: trips,
      loading: false,
    });
  },

  // ===
  // currentTrip
  // ===

  setTrip: (trip) => {
    set({
      currentTrip: trip,
      loading: false,
    });
  },

  // ===
  // loading
  // ===
  setLoading: (value) =>{
    set({
      loading: value
    })
  },
  // ===
  // error
  // ===
  setErrorTrip: (error) =>{
    set({
      errorTrip: error
    })
  },

  reset: () =>
    set({
      userTrips: [],
      currentTrip: null,
      loading: false,
      error: null
    }),
}));
