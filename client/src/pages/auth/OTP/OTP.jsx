import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import toast from "react-hot-toast";
import api from "../../../services/api";
import { getTempFiles, getTempExtra, clearTempStore } from "../../../services/tempStore";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";

function OTP() {
  const { login } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister   = location.state?.isRegister  || false;
  const phoneDisplay = location.state?.phone || "";

  const redirectByRole = (role) => {
    if (role === "DRIVER")  return navigate("/dashboard/driver");
    if (role === "VENDOR")  return navigate("/dashboard/vendor");
    if (role === "ADMIN")   return navigate("/admin");
    return navigate("/dashboard/customer");
  };

  const uploadRegistrationFiles = async (userData) => {
    const files = getTempFiles();
    const extra = getTempExtra();

    const hasFiles = files.profilePhoto || files.vehicleRC;
    if (!hasFiles) return userData;

    try {
      const formData = new FormData();
      if (files.profilePhoto)  formData.append("profilePhoto", files.profilePhoto);
      if (files.vehicleRC)     formData.append("vehicleRC",    files.vehicleRC);

      // Pass extra text fields for driver/vendor
      if (userData.role === "DRIVER") {
        if (extra.vehicleType)   formData.append("vehicleType",   extra.vehicleType);
        if (extra.vehicleNumber) formData.append("vehicleNumber", extra.vehicleNumber);
        if (extra.licenseNumber) formData.append("licenseNumber", extra.licenseNumber);
      }
      if (userData.role === "VENDOR") {
        if (extra.businessName) formData.append("businessName", extra.businessName);
        if (extra.gstNumber)    formData.append("gstNumber",    extra.gstNumber);
        if (extra.address)      formData.append("address",      extra.address);
      }

      const res = await api.post("/users/complete-registration", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearTempStore();

      if (res.data?.success) {
        return { ...userData, ...res.data.user };
      }
    } catch (err) {
      console.warn("File upload failed:", err.message);
      clearTempStore();
    }

    return userData;
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || otp.length < 4) { toast.error("Please enter the OTP"); return; }
    if (!window.confirmationResult) {
      toast.error("Session expired. Please go back and request a new OTP.");
      return;
    }

    try {
      setLoading(true);

      // Step 1 — Verify OTP with Firebase
      const result = await window.confirmationResult.confirm(otp);
      const firebaseToken = await result.user.getIdToken();
      const firebaseUser  = result.user;

      // Step 2 — Get stored register data
      let registerData = null;
      if (isRegister) {
        const stored = localStorage.getItem("bearride_register_data");
        if (stored) {
          try { registerData = JSON.parse(stored); } catch (_) {}
          localStorage.removeItem("bearride_register_data");
        }
      }

      // Step 3 — Create / login account in backend
      let userData = null;
      let jwtToken = null;

      try {
        const response = await api.post("/auth/firebase-login", {
          token: firebaseToken,
          registerData,
        });

        if (response.data?.success) {
          userData  = response.data.user;
          jwtToken  = response.data.token;

          // Temporarily store token so subsequent upload call is authenticated
          localStorage.setItem("bearride_token", jwtToken);

          // Step 4 — Upload files if this is a registration
          if (isRegister) {
            userData = await uploadRegistrationFiles(userData);
          }

          login(userData, jwtToken);
          toast.success(isRegister ? "🎉 Account created! Welcome to BearRide" : "✅ Login successful!");
          redirectByRole(userData.role);
          return;
        }
      } catch (backendErr) {
        console.warn("Backend unavailable:", backendErr.message);
      }

      // Step 5 — Fallback: build local session from Firebase
      const localUser = {
        id:            firebaseUser.uid,
        fullName:      registerData?.fullName  || firebaseUser.displayName || "BearRide User",
        phone:         firebaseUser.phoneNumber || phoneDisplay,
        email:         registerData?.email     || null,
        role:          registerData?.role      || "CUSTOMER",
        isVerified:    true,
        walletBalance: 0,
        profilePhoto:  null,
        vehicleType:   registerData?.vehicleType   || null,
        vehicleNumber: registerData?.vehicleNumber || null,
        businessName:  registerData?.businessName  || null,
        driverStatus:  "INCOMPLETE",
        isActive:      true,
      };

      clearTempStore();
      login(localUser, firebaseToken);
      toast.success(isRegister ? "🎉 Account created! Welcome to BearRide" : "✅ Login successful!");
      redirectByRole(localUser.role);

    } catch (error) {
      console.error("OTP verification error:", error);
      if (error.code === "auth/invalid-verification-code") {
        toast.error("❌ Wrong OTP — please check and try again");
      } else if (error.code === "auth/code-expired") {
        toast.error("⏱ OTP expired — please request a new one");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many attempts. Please wait a few minutes.");
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!phoneDisplay) { toast.error("Phone not found. Go back and re-enter."); return; }
    try {
      setResending(true);
      const { setupRecaptcha } = await import("../../../services/authService");
      const confirmationResult = await setupRecaptcha(phoneDisplay);
      window.confirmationResult = confirmationResult;
      toast.success("New OTP sent to " + phoneDisplay);
      setOtp("");
    } catch (err) {
      console.error(err);
      toast.error("Could not resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black flex items-center justify-center px-5 py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yellow-400/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 bg-zinc-950 border border-yellow-500/20 rounded-[40px] p-10 md:p-14 w-full max-w-xl shadow-[0_0_80px_rgba(250,204,21,0.07)]">

          <Link to="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-400 transition-all mb-8 text-sm">
            <FaArrowLeft /> Back to Login
          </Link>

          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-yellow-400/10 border border-yellow-400/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📱</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">Verify OTP</h1>
            {phoneDisplay && (
              <p className="text-gray-400 leading-8">
                OTP sent to <span className="text-yellow-400 font-bold">{phoneDisplay}</span>
              </p>
            )}
            <p className="text-gray-500 text-sm mt-2">Enter the 6-digit code from your SMS</p>
          </div>

          <form onSubmit={verifyOTP} className="space-y-6">
            <div>
              <label className="block mb-3 text-gray-300 font-medium text-center">Enter 6-digit OTP</label>
              <input
                type="number" inputMode="numeric"
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                maxLength={6}
                className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-5 outline-none text-white tracking-[12px] text-center text-3xl font-black focus:border-yellow-400 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 4}
              className="w-full flex items-center justify-center gap-3 bg-yellow-400 text-black py-5 rounded-2xl font-black text-lg hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(250,204,21,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  {isRegister ? "Creating account..." : "Verifying..."}
                </>
              ) : (
                "Verify & Continue"
              )}
            </button>
          </form>

          <div className="text-center mt-8 space-y-3">
            <p className="text-gray-500 text-sm">Didn't receive the OTP?</p>
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-yellow-400 font-bold hover:text-yellow-300 transition-all disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-gray-600 text-xs">
            <FaShieldAlt className="text-yellow-400" />
            Secured by Firebase Authentication
          </div>
        </div>
      </section>

      <div id="recaptcha-container" />
      <Footer />
    </>
  );
}

export default OTP;
