import { AI_PROMPT } from "@/constants/options";
import { chatSession } from "@/services/AImodel";
import { db } from "@/services/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// === ERROR TYPE (biar konsisten & anti typo)
export const ERROR_TYPE = {
  NOT_AUTH: "NOT_AUTHENTICATED",
  INVALID_FORM: "INVALID_FORM",
  AI_ERROR: "AI_ERROR",
  INVALID_JSON: "INVALID_JSON",
  FIREBASE_ERROR: "FIREBASE_ERROR",
};

export const generateTripService = async ({ formData, user }) => {
  // ========================
  // VALIDATION
  // ========================
  if (!user) {
    throw new Error(ERROR_TYPE.NOT_AUTH);
  }

  if (!formData.country || !formData.people || !formData.budget) {
    throw new Error(ERROR_TYPE.INVALID_FORM);
  }

  // ========================
  // BUILD PROMPT
  // ========================
  const FINAL_PROMPT = AI_PROMPT
    .replace("{country}", formData.country?.name)
    .replace("{states}", formData.states?.name)
    .replace("{days}", formData.days)
    .replace("{people}", formData.people)
    .replace("{budget}", formData.budget);

  // ========================
  // CALL AI
  // ========================
  let result;
  try {
    result = await chatSession.sendMessage(FINAL_PROMPT);
  } catch (err) {
    throw new Error(ERROR_TYPE.AI_ERROR);
  }

  // ========================
  // PARSE RESPONSE
  // ========================
  let parsed;
  try {
    parsed = JSON.parse(result?.response?.text());
  } catch {
    throw new Error(ERROR_TYPE.INVALID_JSON);
  }

  // ========================
  // SAVE TO FIREBASE
  // ========================
  const docId = Date.now().toString();

  try {
    await setDoc(doc(db, "trip", docId), {
      id: docId,
      userSelection: formData,
      tripData: parsed,
      userEmail: user.email,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    throw new Error(ERROR_TYPE.FIREBASE_ERROR);
  }

  // ========================
  // RETURN RESULT
  // ========================
  return { docId, parsed };
};