/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

import Images from "@/components/custom/Images";
import useGoogleImage from "@/hook/useGoogleImage"

import { Link } from "react-router-dom";

function HotelsCardItem({ hotel }) {

  const photoUrl = useGoogleImage(hotel?.hotelName)
  
      // const [photoUrl, setPhotoUrl] = useState()
  
      //   useEffect(()=>{
      //     hotel&&GetPlacePhoto()
      //   },[hotel])
      
      //   const GetPlacePhoto = async () => {
      //     const data = {
      //       textQuery: hotel?.hotelName
      //     }
      //     await GetPlaceDetails(data).then((resp)=>{
            
      //       const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name)
      //       setPhotoUrl(photoUrl)
      //     })
      // }
  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + hotel?.hotelName}
      target="_BLANK"
    >
      <div className="hover:scale-105 transition-all">
    
        <Images 
         src={photoUrl}
         className="rounded-lg h-[180px] w-full object-cover"
         alt="hotelCardItem"
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
