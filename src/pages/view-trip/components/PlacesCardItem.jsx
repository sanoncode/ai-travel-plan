/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import useGoogleImage from "@/hook/useGoogleImage"

function PlacesCardItem({ activity }) {

  const photoUrl = useGoogleImage(activity.placeName)
      // const [photoUrl, setPhotoUrl] = useState()
        
      //     useEffect(()=>{
      //       activity&&GetPlacePhoto()
      //     },[ activity])
        
      //     const GetPlacePhoto = async () => {
      //       const data = {
      //         textQuery: activity.placeName
      //       }
      //        await GetPlaceDetails(data).then((resp)=>{
              
      //         const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name)
      //         setPhotoUrl(photoUrl)
      //       })
      //   }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+activity.placeName} target="_BLANK">
    <div className="border rounded-xl p-2 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all">
      <img src={photoUrl} className="w-[330px] h-[130px] rounded-lg object-cover" alt="picsum" loading="Lazy" />
      <div>
        <h2 className="font-bold text-lg">{activity.placeName}</h2>
        <p className="text-sm text-gray-500">{activity.placeDetails}</p>
        <div className="flex my-2 justify-between gap-5"> 
            <p className="text-md font-bold">⭐ {activity.rating}</p>
         <p className="text-md fond-bold">🎟️ {activity.ticketPricing}</p>
        </div>
    
      </div>
    </div>
    </Link>
  );
}

export default PlacesCardItem;
