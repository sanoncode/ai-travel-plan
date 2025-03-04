/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button"
import { GetPlaceDetails } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { PHOTO_REF_URL } from "@/service/GlobalApi";

function InfoSection({trip}) {

  const [photoUrl, setPhotoUrl] = useState()

  useEffect(()=>{
    trip&&GetPlacePhoto()
  },[trip])

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
     await GetPlaceDetails(data).then((resp)=>{
      
      const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name)
      setPhotoUrl(photoUrl)
    })
  }
  return (
    <div>
      <img src={photoUrl} alt='placeimage' referrerPolicy="no-referrer" className="h-[300px] w-full object-cover rounded-lg"/>
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
      <Button><IoIosSend /></Button>
      </div>
    </div>
  )
}

export default InfoSection