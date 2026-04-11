"use client";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  TripHeader,
  TripItinerary,
  TripBudget,
  TripNotes,
} from "../components";
import { useTripStore } from "@/store/useTripStore";
import { useShallow } from "zustand/react/shallow";
import { SkeletonCard
  
 } from "../components/SkeletonCard";
export default function ViewTrip() {
  const navigate = useNavigate();
  const { tripid } = useParams();
  const { currentTrip, fetchUserTripById, loading } = useTripStore(
    useShallow((state) => ({
      currentTrip: state.currentTrip,
      fetchUserTripById: state.fetchUserTripById,
      loading: state.loading,
    })),
  );

  useEffect(() => {
    if (!tripid) {
      navigate("/");
      return;
    }
    fetchUserTripById(tripid);
  }, [tripid, fetchUserTripById, navigate]);

  if (loading || !currentTrip) {
   return(
      <SkeletonCard />
   ) 
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 font-sans">
      {/* Header */}
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
