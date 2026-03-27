import {
  Calendar,
  Clock,
  Coffee,
  DollarSign,
  MapPin,
  Plane,
  Utensils,
  Camera,
  Ticket,
  Hotel,
  ChevronDown,
  ChevronRight,
  Train,
} from "lucide-react"

import { cn } from "@/lib/utils"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"



 {/* Trip Daily Itinerary */}
function TripItinerary({itinerary}){

  const {daily_itinerary = {}} = itinerary.tripData ?? {}
  
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
    console.log(settingDays, "setting days")
    console.log(sorted, "sorted daily itinerary"
    )

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
                      <div className="p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            <Plane className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <div className="font-medium">Arrive at Narita International Airport</div>
                              <div className="text-sm text-muted-foreground mt-1">Flight NH123 - Terminal 2</div>
                            </div>
                          </div> 
                          <div className="text-sm font-medium">7:30 AM</div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            <Train className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <div className="font-medium">Narita Express to Shinjuku Station</div>
                              <div className="text-sm text-muted-foreground mt-1">1 hour transit</div>
                              <div className="flex items-center mt-1.5">
                                <PriceRange level={2} />
                                <span className="text-xs text-muted-foreground ml-2">¥3,270 per person</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">9:00 AM</div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            <Hotel className="h-5 w-5 text-purple-500 mt-0.5" />
                            <div>
                              <div className="font-medium">Check-in at Hotel Century Southern Tower</div>
                              <div className="text-sm text-muted-foreground mt-1">Early check-in arranged</div>
                              <div className="flex items-center mt-1.5">
                                <PriceRange level={3} />
                                <span className="text-xs text-muted-foreground ml-2">¥25,000 per night</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">10:30 AM</div>
                        </div>
                      </div>
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
                      <div className="p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            <Utensils className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <div className="font-medium">Lunch at Ichiran Ramen</div>
                              <div className="text-sm text-muted-foreground mt-1">Famous tonkotsu ramen chain</div>
                              <div className="flex items-center mt-1.5">
                                <PriceRange level={2} />
                                <span className="text-xs text-muted-foreground ml-2">¥1,200-1,500 per person</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">12:30 PM</div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            <Camera className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                              <div className="font-medium">Meiji Shrine & Yoyogi Park</div>
                              <div className="text-sm text-muted-foreground mt-1">Tranquil shrine in a forest setting</div>
                              <div className="flex items-center mt-1.5">
                                <PriceRange level={1} />
                                <span className="text-xs text-muted-foreground ml-2">
                                  Free entrance (¥500 for special areas)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">2:00 PM</div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <div className="font-medium">Harajuku & Takeshita Street</div>
                              <div className="text-sm text-muted-foreground mt-1">Trendy shopping district</div>
                              <div className="flex items-center mt-1.5">
                                <PriceRange level={2} />
                                <span className="text-xs text-muted-foreground ml-2">Varies (shopping)</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">4:00 PM</div>
                        </div>
                      </div>
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
                      <div className="p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            <Utensils className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <div className="font-medium">Dinner at Gonpachi Nishi-Azabu</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Inspiration for Kill Bill restaurant scene
                              </div>
                              <div className="flex items-center mt-1.5">
                                <PriceRange level={3} />
                                <span className="text-xs text-muted-foreground ml-2">¥4,000-6,000 per person</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">7:00 PM</div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-md bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            <MapPin className="h-5 w-5 text-violet-500 mt-0.5" />
                            <div>
                              <div className="font-medium">Shibuya Crossing & Nightlife</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Famous scramble crossing and evening exploration
                              </div>
                              <div className="flex items-center mt-1.5">
                                <PriceRange level={1} />
                                <span className="text-xs text-muted-foreground ml-2">Free (viewing)</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">9:00 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
      </Collapsible>
      ))
}

export default TripItinerary