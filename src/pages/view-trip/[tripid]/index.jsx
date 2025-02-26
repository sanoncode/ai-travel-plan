import { useParams } from "react-router-dom"
import {db} from '@/service/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from "sonner"
import { useEffect, useState } from "react"

function ViewTrip(){
    const {tripid }= useParams()

    const [Trip, setTrip] = useState([])

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
    <div>
        ViewTrip: {tripid}
    </div>
  )
}

export default ViewTrip