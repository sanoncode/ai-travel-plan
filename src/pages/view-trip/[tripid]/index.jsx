"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from '@/service/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

import { TripHeader, TripItinerary, TripBudget, TripNotes } from "../components"
export default function ViewTrip() {
  const {tripid }= useParams()

    const [trip, setTrip] = useState({})

    useEffect(()=>{
        tripid && GetTripData()
     },[tripid])
     
    const GetTripData = async() => {
        const docRef = doc(db,'trip',tripid)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
           
            setTrip(docSnap.data())
        }else{
            console.log('Document not exist')
            toast('No Trip Found !')
        }
    }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 font-sans">


      {/* Header */}
      <TripHeader header={trip} />

      {/* Day 1 */}
      <TripItinerary itinerary={trip} />

      {/* Notes section */}
      <TripNotes notes={trip} />

      {/* Budget summary */}
      <TripBudget budget={trip} />
    </div>
  )
}

