"use client"

import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

export default function TravelPlanner() {
  const [openDays, setOpenDays] = useState({
    day1: true,
    day2: false,
    day3: false,
  })

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 font-sans">
      {/* Header */}
      <div className="space-y-4 border-b pb-6">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Plane size={18} />
          <span className="text-sm">Travel Plan</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Japan Adventure 2025</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} />
            <span>April 10-17, 2025</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={16} />
            <span>Tokyo → Kyoto → Osaka</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400"
          >
            Spring
          </Badge>
          <Badge
            variant="outline"
            className="bg-pink-50 text-pink-700 hover:bg-pink-100 dark:bg-pink-950 dark:text-pink-400"
          >
            Cherry Blossoms
          </Badge>
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-400"
          >
            Food Tour
          </Badge>
        </div>
      </div>

      {/* Day 1 */}
      <Collapsible open={openDays.day1} onOpenChange={() => toggleDay("day1")} className="border rounded-lg">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-4 h-auto">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-lg">Day 1: Tokyo Arrival & Exploration</span>
            </div>
            {openDays.day1 ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
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

      {/* Day 2 */}
      <Collapsible open={openDays.day2} onOpenChange={() => toggleDay("day2")} className="border rounded-lg">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-4 h-auto">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-lg">Day 2: Tokyo Cultural Immersion</span>
            </div>
            {openDays.day2 ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
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
                        <Coffee className="h-5 w-5 text-brown-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Breakfast at Hotel</div>
                          <div className="text-sm text-muted-foreground mt-1">Buffet breakfast with city views</div>
                          <div className="flex items-center mt-1.5">
                            <PriceRange level={2} />
                            <span className="text-xs text-muted-foreground ml-2">Included with stay</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">7:30 AM</div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <Camera className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Tsukiji Outer Market</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Famous food market with fresh seafood
                          </div>
                          <div className="flex items-center mt-1.5">
                            <PriceRange level={1} />
                            <span className="text-xs text-muted-foreground ml-2">Free entrance (food costs vary)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">9:00 AM</div>
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
                        <Ticket className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="font-medium">TeamLab Planets</div>
                          <div className="text-sm text-muted-foreground mt-1">Immersive digital art museum</div>
                          <div className="flex items-center mt-1.5">
                            <PriceRange level={3} />
                            <span className="text-xs text-muted-foreground ml-2">¥3,200 per person</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">1:00 PM</div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <Utensils className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Late Lunch at Uobei Sushi</div>
                          <div className="text-sm text-muted-foreground mt-1">Conveyor belt sushi restaurant</div>
                          <div className="flex items-center mt-1.5">
                            <PriceRange level={1} />
                            <span className="text-xs text-muted-foreground ml-2">¥1,000-1,500 per person</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">3:30 PM</div>
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
                        <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Tokyo Skytree</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Tallest tower in Japan with observation decks
                          </div>
                          <div className="flex items-center mt-1.5">
                            <PriceRange level={3} />
                            <span className="text-xs text-muted-foreground ml-2">¥3,100 per person (Tembo Deck)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">5:30 PM</div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <Utensils className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Dinner at Sometaro Okonomiyaki</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Traditional Japanese pancake restaurant
                          </div>
                          <div className="flex items-center mt-1.5">
                            <PriceRange level={2} />
                            <span className="text-xs text-muted-foreground ml-2">¥1,500-2,500 per person</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">7:30 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Day 3 */}
      <Collapsible open={openDays.day3} onOpenChange={() => toggleDay("day3")} className="border rounded-lg">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-4 h-auto">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-lg">Day 3: Tokyo to Kyoto</span>
            </div>
            {openDays.day3 ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
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
                        <Hotel className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Check-out from Tokyo Hotel</div>
                          <div className="text-sm text-muted-foreground mt-1">Luggage storage available if needed</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">10:00 AM</div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <Train className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Shinkansen to Kyoto</div>
                          <div className="text-sm text-muted-foreground mt-1">Bullet train from Tokyo Station</div>
                          <div className="flex items-center mt-1.5">
                            <PriceRange level={3} />
                            <span className="text-xs text-muted-foreground ml-2">¥13,320 per person</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">11:30 AM</div>
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
                        <Hotel className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Check-in at Kyoto Granbell Hotel</div>
                          <div className="text-sm text-muted-foreground mt-1">Boutique hotel in Gion district</div>
                          <div className="flex items-center mt-1.5">
                            <PriceRange level={3} />
                            <span className="text-xs text-muted-foreground ml-2">¥22,000 per night</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">2:00 PM</div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <Utensils className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Late Lunch at Nishiki Market</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Famous food market with local specialties
                          </div>
                          <div className="flex items-center mt-1.5">
                            <PriceRange level={2} />
                            <span className="text-xs text-muted-foreground ml-2">¥1,500-2,500 per person</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">3:30 PM</div>
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
                        <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Gion District Evening Walk</div>
                          <div className="text-sm text-muted-foreground mt-1">Historic geisha district</div>
                          <div className="flex items-center mt-1.5">
                            <PriceRange level={1} />
                            <span className="text-xs text-muted-foreground ml-2">Free (self-guided)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">6:00 PM</div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <Utensils className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Dinner at Pontocho Alley</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Traditional Kyoto cuisine with river views
                          </div>
                          <div className="flex items-center mt-1.5">
                            <PriceRange level={4} />
                            <span className="text-xs text-muted-foreground ml-2">¥6,000-10,000 per person</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">8:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Notes section */}
      <div className="border rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <span>Trip Notes</span>
        </h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            • Japan Rail Pass: Consider purchasing a 7-day JR Pass (¥33,610) for unlimited travel on JR lines including
            Shinkansen
          </p>
          <p>• Portable WiFi/SIM Card: Available at airport (¥800-1,200 per day)</p>
          <p>• Tipping: Not customary in Japan</p>
          <p>• Weather: April average temperatures 10-20°C (50-68°F), occasional rain</p>
          <p>• Cherry Blossom Season: Peak bloom varies, typically early April in Tokyo and mid-April in Kyoto</p>
        </div>
      </div>

      {/* Budget summary */}
      <div className="border rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <span>Budget Estimate</span>
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Accommodation:</div>
            <div className="font-medium text-right">¥165,000</div>
            <div className="text-muted-foreground">Transportation:</div>
            <div className="font-medium text-right">¥50,000</div>
            <div className="text-muted-foreground">Food & Dining:</div>
            <div className="font-medium text-right">¥70,000</div>
            <div className="text-muted-foreground">Attractions & Activities:</div>
            <div className="font-medium text-right">¥30,000</div>
            <div className="text-muted-foreground">Shopping & Souvenirs:</div>
            <div className="font-medium text-right">¥40,000</div>
            <div className="text-muted-foreground">Miscellaneous:</div>
            <div className="font-medium text-right">¥15,000</div>
            <div className="border-t pt-2 font-medium">Total Estimate:</div>
            <div className="border-t pt-2 font-bold text-right">¥370,000</div>
          </div>
          <p className="text-xs text-muted-foreground">
            *Prices are approximate and subject to change. Budget is for 2 people.
          </p>
        </div>
      </div>
    </div>
  )
}

