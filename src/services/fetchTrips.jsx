import { db } from "@/services/firebaseConfig";
import { collection, query, where, doc, getDocs,getDoc } from "firebase/firestore";
import { normalizeTrip } from "@/lib/utils";
// === ERROR TYPE (biar konsisten & anti typo)
export const ERROR_TYPE = {
  VIEW_TRIP_ERROR: "VIEW_TRIP_ERROR",
  MY_TRIP_ERROR: "MY_TRIP_ERROR",
};




const fetchUserTrips = async (email) => {
    if (!email) return;
    try {
      const q = query(collection(db, "trip"), where("userEmail", "==", email));
      //multiple doc use getDocs
      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      //sort newest
      trips.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
     
      return trips
  
    } catch (err) {
      console.error(err);
      throw new Error(ERROR_TYPE.MY_TRIP_ERROR);
    }
}

const fetchUserTripById = async (tripId) => {
    if (!tripId) return;

    try {

      const docRef = doc(db, "trip", tripId);
      //single doc use getDoc
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
      return null;
    }

    const raw = docSnap.data();
   
    // 🔥 penting: normalize di sini
    return normalizeTrip(raw);
      
    } catch (err) {
      console.error(err)
       throw new Error(ERROR_TYPE.VIEW_TRIP_ERROR);
      
    }
  }

export {
  fetchUserTrips,
  fetchUserTripById
}
