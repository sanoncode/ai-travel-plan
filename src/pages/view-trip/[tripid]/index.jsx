"use client";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  TripHeader,
  TripItinerary,
  TripBudget,
  TripNotes,
} from "../components";
import { useGetTrips } from "@/hook/useGetTrips";
import { useTripStore } from "@/store/useTripStore";
import { useShallow } from "zustand/react/shallow";
import  SkeletonCard  from "../components/SkeletonCard";
import ErrorPage from "@/components/custom/ErrorPage";


export default function ViewTrip() {
  const navigate = useNavigate();
  const { tripid } = useParams();

  const { GetUserTrip } = useGetTrips();
  const { currentTrip, loading, errorTrip } = useTripStore(
    useShallow((state) => ({
      currentTrip: state.currentTrip,
      loading: state.loading,
      errorTrip: state.errorTrip,
    })),
  );

  console.log(currentTrip, 'current trip')

  useEffect(() => {
    if (!tripid) {
      navigate("/");
      return;
    }
  
    GetUserTrip(tripid);
  }, [tripid,navigate]);


  if(errorTrip){
    return <ErrorPage />
  }
  if(!currentTrip){
    return <SkeletonCard />
  }
  if(loading){
    return <SkeletonCard />
  }
 
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 font-sans">
      
      <TripHeader header={currentTrip} />

      {/* Day 1 */}
      <TripItinerary itinerary={currentTrip} />

      {/* Notes section */}
      <TripNotes notes={currentTrip} />

      {/* Budget summary */}
      <TripBudget budget={currentTrip} />
    </div>
  );
}
