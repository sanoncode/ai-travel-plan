import { useParams } from "react-router-dom"
import {db} from '@/service/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from "sonner"
import { useEffect, useState } from "react"
import InfoSection from "../components/InfoSection"
import Hotels from "../components/Hotels"
import PlacesToVisit from "../components/PlacesToVisit"
import Footer from "../components/Footer"

function ViewTrip(){
    const {tripid }= useParams()

    const [trip, setTrip] = useState([])

    useEffect(()=>{
        tripid && GetTripData()
     },[tripid])
     
    const GetTripData = async() => {
        const docRef = doc(db,'trip',tripid)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            console.log('Document: ',docSnap.data())
            setTrip(docSnap.data())
        }else{
            console.log('Document not exist')
            toast('No Trip Found !')
        }
    }
    
  return (
    <div className="p-10 sm:px-20 lg:px-44 xl:px-56">
      {/* info section */}
       <InfoSection trip={trip} />
       {/* recommended hotel */}
        <Hotels trip={trip} />
       {/* daily plan */}
       <PlacesToVisit trip={trip} />
       {/* footer */}
       <Footer />
    </div>
  )
}

export default ViewTrip