/* eslint-disable react/prop-types */

 {/* Budget summary */}
function TripBudget({budget}){
  const { Accommodation, Transportation, 'Food & Dining': FoodDining, Attractions, Shopping, Miscellaneous, Total } = budget.budget_estimate || {}
    return (

      <div className="border rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <span>Budget Estimate</span>
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Accommodation:</div>
            <div className="font-medium text-right">{Accommodation}</div>
            <div className="text-muted-foreground">Transportation:</div>
            <div className="font-medium text-right">{Transportation}</div>
            <div className="text-muted-foreground">Food & Dining:</div>
            <div className="font-medium text-right">{FoodDining}  </div>
            <div className="text-muted-foreground">Attractions & Activities:</div>
            <div className="font-medium text-right">{Attractions}</div>
            <div className="text-muted-foreground">Shopping & Souvenirs:</div>
            <div className="font-medium text-right">{Shopping}</div>
            <div className="text-muted-foreground">Miscellaneous:</div>
            <div className="font-medium text-right">{Miscellaneous}</div>
            <div className="border-t pt-2 font-medium">Total Estimate:</div>
            <div className="border-t pt-2 font-bold text-right">{Total}</div>
          </div>
          <p className="text-xs text-muted-foreground">
            *Prices are approximate and subject to change. Always check current rates and availability when planning your trip.
          </p>
        </div>
      </div>
    )
}

export default TripBudget