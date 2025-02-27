/* eslint-disable react/prop-types */

import PlacesCardItem from "./PlacesCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-2xl my-5">Places To Visit</h2>
      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index} className="mb-10">
                <h2 className="font-bold text-xl">Day: {item.day}</h2>
                <div className="grid md:grid-cols-2 gap-5">
                {item.activities?.map((activity, index) => (
                <div key={index} >
                    <h2 className="text-sm font-medium text-orange-600">
                    {activity.bestTimeToVisit}
                    </h2>
                    <PlacesCardItem activity={activity} />
                </div>
                ))}
                </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default PlacesToVisit;
