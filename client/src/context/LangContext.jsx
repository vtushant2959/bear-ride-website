import { createContext, useContext, useState } from "react";

const en = {
  home: "Home", about: "About", services: "Services", contact: "Contact", blog: "Blog",
  login: "Login", logout: "Logout", register: "Create Account", dashboard: "Dashboard",
  bookRide: "Book Ride", myRides: "My Rides", wallet: "Wallet", settings: "Settings",
  profile: "Profile", earnings: "Earnings", pendingRides: "Pending Rides",
  welcome: "Welcome", driverPanel: "Driver Panel", vendorPanel: "Vendor Panel",
  switchRole: "Switch Role", addRole: "Add Role", totalRides: "Total Rides",
  completed: "Completed", cancelled: "Cancelled", active: "Active",
  walletBalance: "Wallet Balance", loyaltyPoints: "Loyalty Points",
  savedAddresses: "Saved Addresses", scheduleRide: "Schedule Ride",
  fleetManagement: "Fleet Management", promoCode: "Promo Code",
  apply: "Apply", submit: "Submit", cancel: "Cancel", save: "Save",
  loading: "Loading...", success: "Success", error: "Error",
};

const hi = {
  home: "होम", about: "हमारे बारे में", services: "सेवाएं", contact: "संपर्क", blog: "ब्लॉग",
  login: "लॉगिन", logout: "लॉगआउट", register: "खाता बनाएं", dashboard: "डैशबोर्ड",
  bookRide: "राइड बुक करें", myRides: "मेरी राइड्स", wallet: "वॉलेट", settings: "सेटिंग्स",
  profile: "प्रोफाइल", earnings: "कमाई", pendingRides: "लंबित राइड्स",
  welcome: "स्वागत है", driverPanel: "ड्राइवर पैनल", vendorPanel: "वेंडर पैनल",
  switchRole: "भूमिका बदलें", addRole: "भूमिका जोड़ें", totalRides: "कुल राइड्स",
  completed: "पूर्ण", cancelled: "रद्द", active: "सक्रिय",
  walletBalance: "वॉलेट बैलेंस", loyaltyPoints: "लॉयल्टी पॉइंट्स",
  savedAddresses: "सेव पते", scheduleRide: "राइड शेड्यूल करें",
  fleetManagement: "फ्लीट प्रबंधन", promoCode: "प्रोमो कोड",
  apply: "लागू करें", submit: "सबमिट", cancel: "रद्द करें", save: "सेव करें",
  loading: "लोड हो रहा है...", success: "सफल", error: "त्रुटि",
};

const TRANSLATIONS = { en, hi };

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("bearride_lang") || "en");

  const switchLang = (l) => {
    localStorage.setItem("bearride_lang", l);
    setLang(l);
  };

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;

  return (
    <LangContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
