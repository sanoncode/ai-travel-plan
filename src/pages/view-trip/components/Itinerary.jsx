/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Clock,
  DollarSign,
  MapPin,
  Utensils,
  Camera,
  Ticket,
  Hotel,
  ChevronDown,
  ChevronRight,
  Train,
  Car,
  ShoppingBag
} from "lucide-react"

import { cn } from "@/lib/utils"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"



 {/* Trip Daily Itinerary */}
function TripItinerary({itinerary}){

  const {daily_itinerary = {}} = itinerary ?? {}
  
    // sort the daily itinerary based on the day numbner, extract the number from the key and sort based on it
     const sorted = Object.entries(daily_itinerary).sort((a, b) => {
          const dayA = parseInt(a[0].match(/\d+/)[0]);
          const dayB = parseInt(b[0].match(/\d+/)[0]);
          return dayA - dayB;
      });

    const setDay = sorted.map(([day, activities]) => { 
          const dayNumber = day.split(":")[0]
          if(dayNumber === "Day 1"){
              return { [dayNumber]: true }
        } else {
          return { [dayNumber]: false }
        }
  })
    const settingDays = Object.assign({}, ...setDay)
  
   const [openDays, setOpenDays] = useState(settingDays)

  const toggleDay = (day) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }))
  }

  // Function to render price range
  const PriceRange = ({ level }) => {
    return (
      <div className="flex items-center">
        {[...Array(4)].map((_, i) => (
          <DollarSign
            key={i}
            size={14}
            className={cn("mr-0.5", i < level ? "text-foreground" : "text-muted-foreground opacity-30")}
          />
        ))}
      </div>
    )
  }

      const iconMap = {
      food: <Utensils className="h-5 w-5 text-fuchsia-500 mt-0.5" />,
      attraction: <Camera className="h-5 w-5 text-red-500 mt-0.5" />,
      hotel: <Hotel className="h-5 w-5 text-blue-500 mt-0.5" />,
      train: <Train className="h-5 w-5 text-green-500 mt-0.5" />,
      transport: <Car className="h-5 w-5 text-purple-500 mt-0.5" />,
      event: <Ticket className="h-5 w-5 text-orange-500 mt-0.5" />,
      default: <MapPin className="h-5 w-5 text-amber-500 mt-0.5" />,
      shopping: <ShoppingBag className="h-5 w-5 text-sky-500 mt-0.5" />
    };


      return sorted.map(([day, activities], index) => (
          <Collapsible key={index} open={openDays[day]} onOpenChange={() => toggleDay(day.day)} className="border rounded-lg">
          <CollapsibleTrigger asChild>

              <Button variant="ghost" className="flex w-full justify-between p-4 h-auto">
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-lg">{day}</span>
                </div>
                {openDays[day] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 space-y-4">
              {/* Timeline */}
              <div className="space-y-6 pl-4 border-l-2 border-muted">
                {/* Morning */}
                <div className="relative">
                  <div className="absolute -left-[25px] p-1 bg-background border-2 border-muted rounded-full">
                    <Clock size={14} className="text-muted-foreground" />
                  </div>
                  <div className="space-y-4 pt-1">
                    <div className="text-sm text-muted-foreground">Morning</div>
  
                    <div className="pl-4 space-y-4">
                      {activities['Morning'].map((activity, index) => (
                      <div key={index+"a"} className="p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            {iconMap[activity.type.toLowerCase()] || iconMap['default']}
                            <div>
                              <div className="font-medium">{activity.title}</div>
                              <div className="text-sm text-muted-foreground mt-1">{activity.description}</div>
                              <div className="flex items-center mt-1.5">
                                <PriceRange level={activity.price_level} />
                                <span className="text-xs text-muted-foreground ml-2">{activity.cost_local}</span>
                              </div>
                            </div>
                          </div> 
                          <div className="text-sm font-medium">{activity.time}</div>
                        </div>
                      </div>
                    
                      ))}
                    </div>
                  </div>
                </div>

                {/* Afternoon */}
                <div className="relative">
                  <div className="absolute -left-[25px] p-1 bg-background border-2 border-muted rounded-full">
                    <Clock size={14} className="text-muted-foreground" />
                  </div>
                  <div className="space-y-4 pt-1">
                    <div className="text-sm text-muted-foreground">Afternoon</div>

                    <div className="pl-4 space-y-4">
                       {activities['Afternoon'].map((activity, index) => (
                      <div key={index+"a"} className="p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            {iconMap[activity.type.toLowerCase()] || iconMap['default']}
                            <div>
                              <div className="font-medium">{activity.title}</div>
                              <div className="text-sm text-muted-foreground mt-1">{activity.description}</div>
                              <div className="flex items-center mt-1.5">
                                <PriceRange level={activity.price_level} />
                                <span className="text-xs text-muted-foreground ml-2">{activity.cost_local}</span>
                              </div>
                            </div>
                          </div> 
                          <div className="text-sm font-medium">{activity.time}</div>
                        </div>
                      </div>
                    
                      ))}

                    </div>
                  </div>
                </div>

                {/* Evening */}
                <div className="relative">
                  <div className="absolute -left-[25px] p-1 bg-background border-2 border-muted rounded-full">
                    <Clock size={14} className="text-muted-foreground" />
                  </div>
                  <div className="space-y-4 pt-1">
                    <div className="text-sm text-muted-foreground">Evening</div>

                    <div className="pl-4 space-y-4">
                       {activities['Evening'].map((activity, index) => (
                      <div key={index+"a"} className="p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            {iconMap[activity.type.toLowerCase()] || iconMap['default']}
                            <div>
                              <div className="font-medium">{activity.title}</div>
                              <div className="text-sm text-muted-foreground mt-1">{activity.description}</div>
                              <div className="flex items-center mt-1.5">
                                <PriceRange level={activity.price_level} />
                                <span className="text-xs text-muted-foreground ml-2">{activity.cost_local}</span>
                              </div>
                            </div>
                          </div> 
                          <div className="text-sm font-medium">{activity.time}</div>
                        </div>
                      </div>
                    
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
      </Collapsible>
      ))
}

export default TripItinerary