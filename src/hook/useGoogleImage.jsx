import { GetPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";

function useGoogleImage(label) {

     const [photoUrl, setPhotoUrl] = useState()
        
              useEffect(()=>{
                label&&GetPlacePhoto()
              },[label])
            
              const GetPlacePhoto = async () => {
                const data = {
                  textQuery: label
                }
                await GetPlaceDetails(data).then((resp)=>{
                  
                  const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name)
                  setPhotoUrl(photoUrl)
                })
            }
    return photoUrl
}

export default useGoogleImage
