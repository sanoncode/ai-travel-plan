
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectBudgetOptions, SelectTravelerList } from '@/constants/options'
import { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function CreateTrip() {
  
  const [place, setplace] = useState()
  const [formData, setformData] = useState([])

  const handleInputchange= (name,value) =>{

    setformData({
      ...formData,
      [name]: value
    })
  }
  useEffect(()=>{
      console.log(formData)
  },[formData])

  const onGenerateTrip = () => {

    // implement validation for days, maximum 5 days
    if( formData?.days > 5){
      return ;
    }
  }
  
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl-px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️ 🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itineary based on your preferences</p>

      <div className='mt-10 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API}
          selectProps={{
            place,
            onChange:(v)=>{
              setplace(v);
              handleInputchange('location',v )
            }
          }}
          />

        </div>
      </div>
      <div className='mt-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning for your trip ?</h2>
          <Input 
          placeholder={'Ex. 3'} 
          type="number"
          onChange={(e)=> handleInputchange('days',e.target.value)}
          />
        </div>
      </div>
      <div className='mt-10'>
          <h2 className='text-xl my-3 font-medium'>What is your Budget</h2>
          <p>
            the budget is exclusively allocated for activites and dining purposes
          </p>
          <div className='grid grid-cols-3 gap-5 mt-5 hover:cursor-pointer'>
            {SelectBudgetOptions.map((item,index)=>(
              <div 
              key={index}
              className={`p-4 border rounded-lg hover:shadow-lg ${formData.budget === item.title && 'shadow-lg border-black'}`}
              onClick={()=>handleInputchange('budget', item.title)}
              >
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
            ))}
          </div>
      
        </div>
        <div className='mt-20'>
          <h2 className='text-xl my-3 font-medium'>Who do you plan to travel with</h2>
  
          <div className='grid grid-cols-3 gap-5 mt-5 hover:cursor-pointer'>
            {SelectTravelerList.map((item,index)=>(
              <div 
              key={index} 
              
              className={`p-4 border rounded-lg hover:shadow-lg ${formData.people === item.people && 'shadow-lg border-black'}`}
              onClick={()=> handleInputchange('people',item.people)}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
            ))}
          </div>
      
        </div>
        <div className='my-10 flex justify-end'>
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
        </div>
       
    </div>
  )
}

export default CreateTrip
