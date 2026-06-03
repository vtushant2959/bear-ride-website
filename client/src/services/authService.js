import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "../config/firebase";

export const setupRecaptcha =
  async (phoneNumber) => {

    try {

      /* CLEAR OLD CAPTCHA */

      if (
        window.recaptchaVerifier
      ) {

        window.recaptchaVerifier.clear();
      }

      /* CREATE NEW CAPTCHA */

      window.recaptchaVerifier =
        new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
          }
        );

      const appVerifier =
        window.recaptchaVerifier;

      return await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

    } catch (error) {

      console.log(error);

      throw error;
    }
  };