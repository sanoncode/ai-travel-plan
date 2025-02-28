/* eslint-disable react/prop-types */
import { GetPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function HotelsCardItem({ hotel }) {

      const [photoUrl, setPhotoUrl] = useState()
  
        useEffect(()=>{
          hotel&&GetPlacePhoto()
        },[hotel])
      
        const GetPlacePhoto = async () => {
          const data = {
            textQuery: hotel?.hotelName
          }
          await GetPlaceDetails(data).then((resp)=>{
            
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(photoUrl)
          })
      }
  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + hotel?.hotelName}
      target="_BLANK"
    >
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl}
          className="rounded-lg h-[180px] w-full object-cover"
          alt="placeholderhotel"
        />
        <div className="my-2">
          <h2 className="font-medium">{hotel.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel.hotelAddress}</h2>
          <h2 className="text-sm">$ {hotel?.priceRange} per Night</h2>
          <h2 className="text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelsCardItem;
