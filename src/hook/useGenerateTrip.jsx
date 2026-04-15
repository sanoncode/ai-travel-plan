
import { useCreateTripStore } from "@/store/useCreateTripStore";
import { useShallow } from "zustand/react/shallow";
import { generateTripService } from "@/services/generateTrip";
import { safeAsync } from "@/lib/utils";

export const useGenerateTrip = () => {
 const {
    setUi,
    setGeneration,
    setResult,
  } = useCreateTripStore(
    useShallow((state) => ({

      setUi: state.setUi,
      setGeneration: state.setGeneration,
      setResult: state.setResult,

    })),
  );
    const generateTrip = async ({formData, user}) =>{
            // =======================
           //  buka dialog
          // =======================
          setUi("openGenerateDialog", true);
             // =======================
            // START LOADING
          // ========================
          setGeneration({ status: "loading", error: null });

    const [res, error] = await safeAsync(() => generateTripService({ formData, user }));
    
            if(error){
            const errorType = error.message;
            // ========================
          // SERVER / AI / FIREBASE → DIALOG
          // ========================
          setGeneration({
            status: "error",
            error: errorType,
          });
        }

          // ========================
          // SUCCESS
          // ========================
            setResult({
            tripId: res.docId,
            tripData: res.parsed,
          });

          setGeneration({ status: "success", error: null });
    }

    return {
        generateTrip
    }

}
     
    
        
    
         
    
    
         

