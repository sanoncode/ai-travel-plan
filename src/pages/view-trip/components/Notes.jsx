/* eslint-disable react/prop-types */

 {/* Trip Notes */}
function TripNotes({notes}){

  const { trip_notes } = notes || {}

    return (

      <div className="border rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <span>Trip Notes</span>
        </h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          {trip_notes?.map((note, index) => (
            <p key={index}>•{" "}{note}</p>
          ))}
        </div>
      </div>
    )
}

export default TripNotes