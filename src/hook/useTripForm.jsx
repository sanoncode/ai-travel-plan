import { useCreateTripStore } from "@/store/useCreateTripStore";
import { useShallow } from "zustand/shallow";

import { toast } from "sonner";

export const useTripForm = () => {
  const { formData, setField, setUi } = useCreateTripStore(
    useShallow((state) => ({
      formData: state.formData,
      setField: state.setField,
      setUi: state.setUi
    })),
  );

  // ========================
  // FORM VALIDATION (only for days)
  // ========================
  const setDays = (num) => {
       
    const isDaysInValid = num < 1 || num > 7
      if(isDaysInValid) toast("Days must be between 1 and 7");
      setUi('isDaysInvalid', isDaysInValid)
      setField("days", num)
  }

  // ========================
  // FORM VALIDATION (FINAL GATE)
  // ========================
  const validateForm = () => {
    if (!formData.country || !formData.people || !formData.budget) {
      return {
        isValid: false,
        message: "Please fill all fields",
      };
    } 

    return { isValid: true };
  };

  return {
    validateForm,
    setDays
  };
};