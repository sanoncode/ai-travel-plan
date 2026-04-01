import { db } from "@/service/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCarditem from "./components/UserTripCarditem";
import { SkeletonCard } from './components/SkeletonCard'
import { useUserStore } from "@/store/useUserStore";

function MyTrip() {
  const navigate = useNavigation();
  const user = useUserStore((state)=>state.user)

  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "trip"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl-px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {userTrips && userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCarditem key={index} trip={trip} />
            ))
          : <SkeletonCard />
          }
      </div>
    </div>
  );
}

export default MyTrip;
