import { useCreateTripStore } from "@/store/useCreateTripStore";
import { useShallow } from "zustand/react/shallow";
import { newGenerateTripService } from "@/services/generateTrip";
import { safeAsync } from "@/lib/utils";

export const useGenerateTrip = () => {
  const { setUi, setGeneration, setResult } = useCreateTripStore(
    useShallow((state) => ({
      setUi: state.setUi,
      setGeneration: state.setGeneration,
      setResult: state.setResult,
      
    })),
  );
  const generateTrip = async ({ formData, user }) => {
    // =======================
    //  buka dialog
    // =======================
    setUi("openGenerateDialog", true);
    // =======================
    // START LOADING
    // ========================
    setGeneration({ status: "loading", error: null });

    const [res, error] = await safeAsync(() =>
      newGenerateTripService({ formData, user }),
    );

    if (error) {
      
      const errorType = error.message;
    
      if(errorType === "DAILY_LIMIT_REACHED")
      {
          setGeneration({
          status: "limit",
          error: errorType,
        });
        return;
      }
      // ========================
      // API => HOOK 
      // ========================
      setGeneration({
        status: "error",
        error: errorType,
      });
      return;
    }

    // ========================
    // SUCCESS
    // ========================
    setResult({
      tripId: res.id,
      tripData: res.result,
    });

    setGeneration({ status: "success", error: null });

  };

  return {
    generateTrip,
  };
};
