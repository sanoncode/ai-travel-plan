/* eslint-disable react/prop-types */

import useGoogleImage from "@/hook/useGoogleImage"

import { Link } from "react-router-dom"

function UserTripCarditem({trip}) {

    const photoUrl = useGoogleImage(trip.userSelection?.location?.label)

  //  const [photoUrl, setPhotoUrl] = useState()
    
  //         useEffect(()=>{
  //           trip&&GetPlacePhoto()
  //         },[trip])
        
  //         const GetPlacePhoto = async () => {
  //           const data = {
  //             textQuery: trip.userSelection?.location?.label
  //           }
  //           await GetPlaceDetails(data).then((resp)=>{
              
  //             const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name)
  //             setPhotoUrl(photoUrl)
  //           })
  //       }
  return (
    <div className="hover:scale-105 hover:shadow-md transition-all p-4">
      <Link to={`/view-trip/${trip.id}`}>
        <img loading="lazy" src={photoUrl} className='object-cover rounded-lg h-[250px] w-full' alt="picsum" referrerPolicy="no-referrer" />
        <div>
          <h2 className='font-bold text-lg'>{trip.userSelection?.location?.label}</h2>
          <h2 className='text-sm text-gray-500'>{`${trip.userSelection?.days} Days trip with ${trip.userSelection?.budget} budget`}</h2>
        </div>
        </Link>
    </div>
  )
}

export default UserTripCarditem