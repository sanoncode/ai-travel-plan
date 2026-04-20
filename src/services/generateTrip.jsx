import generateAI from "@/services/ai";
import { supabase } from "@/lib/supabase";

// === ERROR TYPE (biar konsisten & anti typo)
export const ERROR_TYPE = {
  AI_ERROR: "AI_ERROR",
  INVALID_JSON: "INVALID_JSON",
  FIREBASE_ERROR: "FIREBASE_ERROR",
};

export const newGenerateTripService = async ({ formData }) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const result = await generateAI({ formData, session });

  return result
};
