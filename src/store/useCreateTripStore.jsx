import { create } from "zustand";
import { AI_PROMPT } from "@/constants/options";
import { chatSession } from "@/service/AImodel";
import { db } from "@/service/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { toast } from "sonner";

export const useCreateTripStore = create((set, get) => ({
  // data
  formData: [],
  openGenerateDialog: false,
  generatingStatus: "idle", //idle | loading | success | error
  viewTripId: "",
  limitDays: false,

  // action
  setOpenGenerateDialog: (value) => set({ openGenerateDialog: value }),
  setGeneratingStatus: (status) => set({ generatingStatus: status }),
  setViewTripId: (id) => set({ viewTripId: id }),
  setLimitDays: (limit) => set({ limitDays: limit }),
  setFormData: (name, value) =>
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    })),
  generateTrip: async (user) => {
    const { formData, setGeneratingStatus, setOpenGenerateDialog, saveAiTrip } = get();
      if (!formData?.country || !formData?.budget || !formData?.people) {
      throw new Error("VALIDATION_ERROR");
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

      await saveAiTrip(result?.response?.text(), user);
    } catch (err) {
      console.error(err);
      setGeneratingStatus("error");
      throw err;
    }
  },
  saveAiTrip: async (tripData, user) => {
    const {formData, setViewTripId, setGeneratingStatus} = get()

    let tripdata;
        try {
          tripdata = JSON.parse(tripData);
        } catch (err) {
          console.error("JSON ERROR: ", err);
          setGeneratingStatus("error");
          return;
        }
        const docId = Date.now().toString();
    
        try {
          await setDoc(doc(db, "trip", docId), {
            id: docId,
            userSelection: formData,
            tripData: tripdata,
            userEmail: user?.email,
            createdAt: serverTimestamp(),
          });
        } catch (err) {
          console.error("FIRESTORE ERROR: ", err);
          if (!navigator.onLine) {
            setGeneratingStatus("offline");
          } else {
            setGeneratingStatus("error");
          }
        }
    
        setViewTripId(docId);
        setGeneratingStatus("success");

  },
  handleInputchange: (name, value) => {
    const {setLimitDays, setFormData} = get()
    // implement validation for days, maximum 7 days
    if (name === "days" && (value > 7 || value < 1)) {
        toast('Please fill the date between 1 and 7 days')
      setLimitDays(true);
      return;
    } else {
      setLimitDays(false);
    }
    setFormData(name, value);
  },
  reset: () =>
    set({
      generatingStatus: "",
      openGenerateDialog: false,
      viewTripId: "",
    }),
}));
