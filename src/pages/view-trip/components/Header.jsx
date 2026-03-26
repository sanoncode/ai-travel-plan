import {
  Calendar,
  MapPin,
  Plane,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

 {/* Trip Header */}
function TripHeader({header}){
  const { trip_header } = header.tripData || {}
    return (

       <div className="space-y-4 border-b pb-6">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Plane size={18} />
          <span className="text-sm">Travel Plan</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{trip_header?.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} />
            <span>{trip_header?.dates}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={16} />
            <span>{trip_header?.route}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {trip_header?.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400"
            >
              {tag}
            </Badge>
          ))}
          {/* <Badge
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
          </Badge> */}
        </div>
      </div>
    )
}

export default TripHeader

