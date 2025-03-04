/* eslint-disable react/prop-types */

import Images from "@/components/custom/Images"
import useGoogleImage from "@/hook/useGoogleImage"

import { Link } from "react-router-dom"

function UserTripCarditem({trip}) {

    const photoUrl = useGoogleImage(trip.userSelection?.location?.label)

  return (
    <div className="hover:scale-105 hover:shadow-md transition-all p-4">
      <Link to={`/view-trip/${trip.id}`}>
        <Images src={photoUrl} className='object-cover rounded-lg h-[250px] w-full' alt="carditempic" />
        <div>
          <h2 className='font-bold text-lg'>{trip.userSelection?.location?.label}</h2>
          <h2 className='text-sm text-gray-500'>{`${trip.userSelection?.days} Days trip with ${trip.userSelection?.budget} budget`}</h2>
        </div>
        </Link>
    </div>
  )
}

export default UserTripCarditem