import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../config/firebase";

/* ─────────────────────────────────────────
   Safely destroy any existing reCAPTCHA
───────────────────────────────────────── */
const clearRecaptcha = () => {
  try {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
  } catch (_) {
    // ignore — it may already be cleared
  } finally {
    window.recaptchaVerifier = null;
  }
};

/* ─────────────────────────────────────────
   Send OTP — robust implementation
───────────────────────────────────────── */
export const setupRecaptcha = async (phoneNumber) => {
  // 1. Always destroy previous instance first
  clearRecaptcha();

  // 2. Ensure the DOM container exists
  const container = document.getElementById("recaptcha-container");
  if (!container) {
    throw new Error("recaptcha-container not found in DOM");
  }

  try {
    // 3. Create fresh invisible reCAPTCHA
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {},
        "expired-callback": clearRecaptcha,
      }
    );

    // 4. Send OTP via Firebase
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );

    return confirmationResult;

  } catch (error) {
    // Always clean up on failure so the next attempt starts fresh
    clearRecaptcha();
    throw error;
  }
};
