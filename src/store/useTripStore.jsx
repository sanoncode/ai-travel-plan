import { create } from "zustand";
import { db } from "@/service/firebaseConfig";
import { collection, query, where, doc, getDocs,getDoc } from "firebase/firestore";

export const useTripStore = create((set, get) => ({
  //data
  userTrips: [],
  currentTrip: null,
  loading: false,

  //action
  fetchUserTrips: async (email) => {
    if (!email) return;

    set({ loading: true, userTrips: [] });

    try {

      //  const cached = get().userTrips
      
      // if (cached) {
      //   set({ userTrips: cached, loading: false });
      // }
      const q = query(collection(db, "trip"), where("userEmail", "==", email));
      //multiple doc use getDocs
      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      //sort newest
      trips.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      set({
        userTrips: trips,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({
        loading: false,
      });
    }
  },
  fetchUserTripById: async (tripId) => {
    if (!tripId) return;
    set({ currentTrip: null, loading: true });

    try {
      const cached = get().userTrips.find((t) => t.id === tripId);
      
      if (cached) {
        set({ currentTrip: cached, loading: false });
        return;
      }

      const docRef = doc(db, "trip", tripId);
      //single doc use getDoc
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentTrip: docSnap.data(), loading: false });
      } else {
        set({ currentTrip: null, loading: false });
      }
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
  clearCurrentTrip: () => set({ currentTrip: null }),
}));
