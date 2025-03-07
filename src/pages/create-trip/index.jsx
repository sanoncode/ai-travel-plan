import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {AILoadingDialog} from './components/AiLoadingDialog'
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelerList,
} from "@/constants/options";
import { chatSession } from "@/service/AImodel";
import axios from "axios";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";

function CreateTrip() {
  const [place, setplace] = useState();
  const [formData, setformData] = useState([]);
  const [openLoginDialog, setopenLoginDialog] = useState(false);
  const [openGenerateDialog, setopenGenerateDialog] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [viewTripId, setViewTripId] = useState();
  

  const navigate = useNavigate()

  const HandleInputchange = (name, value) => {
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const OnGenerateTrip = async () => {
    
    const user = localStorage.getItem("user");
    if (!user) {
      setopenLoginDialog(true);
      return;
    }
    // implement validation for days, maximum 5 days
    if (
      (formData?.days > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.people
    ) {
      toast("please fill all the fields");
      return;
    }
    setGenerating(true);
    setopenGenerateDialog(true)

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{days}", formData?.days)
      .replace("{people}", formData?.people)
      .replace("{budget}", formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT)
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
  
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    const Tripdata = JSON.parse(TripData)
     await setDoc(doc(db, "trip", docId), {
      id: docId,
      userSelection: formData,
      tripData: Tripdata,
      userEmail: user?.email,
      createdAt: serverTimestamp()
    });
   
    setViewTripId(docId)
    setGenerating(false);
  };

  const GoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => console.log(error, "login error"),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setopenLoginDialog(false);
        OnGenerateTrip();
      });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl-px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️ 🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itineary based on your preferences
      </p>

      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API}
            selectProps={{
              place,
              onChange: (v) => {
                setplace(v);
                HandleInputchange("location", v);
              },
            }}
          />
        </div>
      </div>
      <div className="mt-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning for your trip ?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            onChange={(e) => HandleInputchange("days", e.target.value)}
          />
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">What is your Budget</h2>
        <p>
          the budget is exclusively allocated for activites and dining purposes
        </p>
        <div className="grid grid-cols-3 gap-5 mt-5 hover:cursor-pointer">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg hover:shadow-lg ${
                formData.budget === item.title && "shadow-lg border-black"
              }`}
              onClick={() => HandleInputchange("budget", item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-xl my-3 font-medium">
          Who do you plan to travel with
        </h2>

        <div className="grid grid-cols-3 gap-5 mt-5 hover:cursor-pointer">
          {SelectTravelerList.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg hover:shadow-lg ${
                formData.people === item.people && "shadow-lg border-black"
              }`}
              onClick={() => HandleInputchange("people", item.people)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 flex justify-end">
        <Button onClick={OnGenerateTrip} disabled={generating}>
          {generating ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-extrabold text-lg mt-7">
                Sign in with google
              </h2>
              <p>sign in to the App with Google Authentication securely</p>
              <Button onClick={() => GoogleLogin()} className="mt-10 w-full">
                <FcGoogle />
                Signin With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

        <AILoadingDialog
          open={openGenerateDialog}
          onOpenChange={setopenGenerateDialog}
          generating={generating}
          onCancel={() => setGenerating(false)}
          viewTripId={viewTripId}
        />
    </div>
  );
}

export default CreateTrip;
