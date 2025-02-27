/* eslint-disable react/prop-types */

import HotelsCardItem from "./HotelsCardItem"

function Hotels({trip}) {
  return (
    <div>
        <h2 className="font-bold text-2xl mt-5">Hotel Recommendation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
            {trip?.tripData?.hotelOptions.map((hotel,index)=>(
              <HotelsCardItem key={index} hotel={hotel} />
        ))}</div>
    </div>
  )
}

export default Hotels