/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button"
import { GetPlaceDetails } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
// import { PHOTO_REF_URL } from "@/service/GlobalApi";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import { Link } from "react-router-dom";



function InfoSection({trip}) {
  

  // const [photoUrl, setPhotoUrl] = useState()
  const [deleted, setDeleted] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // useEffect(()=>{
  //   trip&&GetPlacePhoto()
  // },[trip])

  // const GetPlacePhoto = async () => {
  //   const data = {
  //     textQuery: trip?.userSelection?.location?.label
  //   }
  //    await GetPlaceDetails(data).then((resp)=>{
      
  //     const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name)
  //     setPhotoUrl(photoUrl)
  //   })
  // }
  

  const DeleteTrip = async () => {
    
      setDeleting(true)
      await deleteDoc(doc(db, "trip", trip.id));
      setDeleted(true)
      setDeleting(false)
      
    }
  return (
    <div>
      <img src={""} alt='placeimage' referrerPolicy="no-referrer" className="h-[300px] w-full object-cover rounded-lg"/>
      <div className="flex justify-between items-center">
      <div className="flex flex-col my-5 gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}            
          </h2>
         <div className="flex gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">📅{trip.userSelection?.days} Days</h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">💰{trip.userSelection?.budget} Budget</h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">🧑🏼‍🤝‍🧑🏼 No. Of traveler{trip.userSelection?.people} People</h2>
         </div>
      </div>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><MdDeleteForever className="h-28 w-28" color="red" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete This Trip ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this trip?
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
            {deleted ? (
              <Link to='/create-trip'>
              <Button type="button">
              Lets Create another trip
            </Button>
            </Link>
            ) : (
              <Button type="button" disabled={deleting} variant="destructive" onClick={() => DeleteTrip()}>
              {deleting ? (
                 <Loader2 className="animate-spin" />
              ):(
               "Yes i want to delete"
              )}
            </Button>
            ) }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div>
    </div>
  )
}

export default InfoSection