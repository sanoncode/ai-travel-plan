import generateAI from "@/services/ai";
import { supabase } from "@/lib/supabaseClient";

export const newGenerateTripService = async ({ formData }) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // use API
  const result = await generateAI({ formData, session });

  return result
};
