import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AILoadingDialog } from "./components/AILoadingDialog";
import { SelectBudgetOptions, SelectTravelerList } from "@/constants/options";

import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import GoogleLoginDialog from "../../components/custom/GoogleLoginDialog";
import { useUserStore } from "@/store/useUserStore";
import { useCreateTripStore } from "@/store/useCreateTripStore";
import { useShallow } from "zustand/react/shallow";
import { useGenerateTrip } from "@/hooks/useGenerateTrip";
import { useTripForm } from "@/hooks/useTripForm";
import { useEffect } from "react";

function CreateTrip() {
  const { user, openLoginDialog, setOpenLoginDialog } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      openLoginDialog: state.openLoginDialog,
      setOpenLoginDialog: state.setOpenLoginDialog,
    })),
  );
  const { formData, isDaysInvalid, generateAfterLogin, generation, setField, setUi } = useCreateTripStore(
    useShallow((state) => ({
      formData: state.formData,
      isDaysInvalid: state.isDaysInvalid,
      generateAfterLogin: state.generateAfterLogin,
      setUi: state.setUi,
      generation: state.generation,
      setField: state.setField,
    })),
  );

  useEffect(()=>{
    console.log(generateAfterLogin,' generationAfter di useEffec')

    if(user && generateAfterLogin){
      generateTrip({ formData, user });
    }

  },[user])

  const { validateForm, setDays } = useTripForm();
  const { isValid, message } = validateForm();
  const { generateTrip } = useGenerateTrip();

  const OnGenerateTrip = async () => {
    // ========================
    // AUTH GUARD
    // ========================
    if (!user) {
      setUi("generateAfterLogin", true);
      setOpenLoginDialog(true);
      return;
    }

    if (!isValid) {
      toast(message);
      return;
    }

    generateTrip({ formData, user });
 
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
              onChange={(country) => setField("country", country)}
              defaultValue={formData.country}
              placeHolder="Select Country"
            />

            <StateSelect
              countryid={formData.country?.id}
              onChange={(states) => setField("states", states)}
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
              isDaysInvalid ? "border-red-500 border-s" : "border-gray-300"
            }
            min={1}
            max={7}
            onChange={(e) => setDays(e.target.value)}
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
              onClick={() => setField("budget", item.desc)}
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
              onClick={() => setField("people", item.people)}
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
          disabled={isDaysInvalid || generation.status === "loading"}
        >
          {generation.status === "loading" ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <GoogleLoginDialog open={openLoginDialog} setOpen={setOpenLoginDialog} />

      <AILoadingDialog onRetry={OnGenerateTrip} />
    </div>
  );
}

export default CreateTrip;
