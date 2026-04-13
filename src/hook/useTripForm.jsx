import { useCreateTripStore } from "@/store/useCreateTripStore";
import { useShallow } from "zustand/shallow";

export const useTripForm = () => {
  const { setField, setUi } = useCreateTripStore(
    useShallow((state) => ({
      setField: state.setField,
      setUi: state.setUi,
    })),
  );

  const setDays = (value) => {
    //invalid for 0 days, and for above 7
    const inValid = value < 1 || value > 7;

    setUi("isDaysInvalid", inValid);
    setField("days", value);
  };

  return {
    setDays,
  };
};
