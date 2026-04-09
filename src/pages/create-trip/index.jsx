import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AILoadingDialog } from "./components/AILoadingDialog";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelerList,
} from "@/constants/options";
import { chatSession } from "@/service/AImodel";

import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import { toast } from "sonner";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { serverTimestamp } from "firebase/firestore";
import GoogleLoginDialog from "./components/GoogleLoginDialog";
import { useUserStore } from "@/store/useUserStore";
import { useCreateTripStore } from "@/store/useCreateTripStore";
import { useShallow } from "zustand/react/shallow";

function CreateTrip() {
  const { user, openLoginDialog, setOpenLoginDialog } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      openLoginDialog: state.openLoginDialog,
      setOpenLoginDialog: state.setOpenLoginDialog,
    })),
  );
  const {
    formData,
    setFormData,
    openGenerateDialog,
    setOpenGenerateDialog,
    generatingStatus,
    setGeneratingStatus,
    viewTripId,
    setViewTripId,
    limitDays,
    setLimitDays,
  } = useCreateTripStore(
    useShallow((state) => ({
      formData: state.formData,
      openGenerateDialog: state.openGenerateDialog,
      generatingStatus: state.GeneratingStatus,
      viewTripId: state.viewTripId,
      limitDays: state.limitDays,
      setFormData: state.setFormData,
      setOpenGenerateDialog: state.setOpenGenerateDialog,
      setGeneratingStatus: state.setGeneratingStatus,
      setViewTripId: state.setViewTripId,
      setLimitDays: state.setLimitDays,
    })),
  );

  const HandleInputchange = (name, value) => {
    // implement validation for days, maximum 7 days
    if (name === "days" && (value > 7 || value < 1)) {
      toast("Please enter a value between 1 and 7 for days");
      setLimitDays(true);
      return;
    } else {
      setLimitDays(false);
    }
    setFormData(name, value);
  };



  const OnGenerateTrip = async () => {
    if (!user) {
      setOpenLoginDialog(true);
      return;
    }

    // implement validation to check if country, people, budget are selected
    if (!formData?.country || !formData?.budget || !formData?.people) {
      toast("please fill all the fields");
      return;
    }

    try {
      setGeneratingStatus("loading");
      setOpenGenerateDialog(true);

      const FINAL_PROMPT = AI_PROMPT.replace(
        "{country}",
        formData?.country?.name,
      )
        .replace("{states}", formData?.states?.name)
        .replace("{days}", formData?.days)
        .replace("{people}", formData?.people)
        .replace("{budget}", formData?.budget);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result,'res')

      SaveAiTrip(result?.response?.text());
    } catch (err) {
      console.error(err);
      setGeneratingStatus("error");
    }
  };

  const SaveAiTrip = async (TripData) => {
    const docId = Date.now().toString();
    const Tripdata = JSON.parse(TripData);
    await setDoc(doc(db, "trip", docId), {
      id: docId,
      userSelection: formData,
      tripData: Tripdata,
      userEmail: user?.email,
      createdAt: serverTimestamp(),
    });

    setViewTripId(docId);
    setGeneratingStatus("success");
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
          <div className="flex gap-5">
            <CountrySelect
              onChange={(country) => HandleInputchange("country", country)}
              defaultValue={formData.country}
              placeHolder="Select Country"
            />

            <StateSelect
              countryid={formData.country?.id}
              onChange={(states) => HandleInputchange("states", states)}
              defaultValue={formData.states}
              placeHolder="Select States"
            />
          </div>
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
            className={
              limitDays ? "border-red-500 border-s" : "border-gray-300"
            }
            min={1}
            max={7}
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
                formData.budget === item.desc && "shadow-lg border-black"
              }`}
              onClick={() => HandleInputchange("budget", item.desc)}
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
        <Button
          onClick={OnGenerateTrip}
          disabled={limitDays || generatingStatus === "loading"}
        >
          {generatingStatus === "loading" ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <GoogleLoginDialog open={openLoginDialog} setOpen={setOpenLoginDialog} />

      <AILoadingDialog
        open={openGenerateDialog}
        setOpen={setOpenGenerateDialog}
        status={generatingStatus}
        onCancel={() => setGeneratingStatus("")}
        viewTripId={viewTripId}
      />
    </div>
  );
}

export default CreateTrip;
