import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import toast from "react-hot-toast";
import { setupRecaptcha } from "../../../services/authService";
import { FaPhoneAlt, FaArrowRight, FaShieldAlt, FaStar } from "react-icons/fa";

function Login() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();

    // Validate: only digits, must be 10
    const digits = phone.replace(/\D/g, "");
    if (!digits)         { toast.error("Enter your phone number"); return; }
    if (digits.length !== 10) { toast.error("Enter a valid 10-digit mobile number"); return; }

    try {
      setLoading(true);

      // Build E.164 — always "+91" + 10 digits
      const e164 = `+91${digits}`;

      const confirmationResult = await setupRecaptcha(e164);
      window.confirmationResult = confirmationResult;

      toast.success(`OTP sent to +91 ${digits}`);
      navigate("/otp", { state: { phone: e164 } });

    } catch (error) {
      console.error("Send OTP error:", error);
      if (error.code === "auth/invalid-phone-number")  toast.error("Invalid number. Use a valid 10-digit Indian mobile.");
      else if (error.code === "auth/too-many-requests") toast.error("Too many attempts. Please wait and try again.");
      else if (error.code === "auth/operation-not-allowed") toast.error("Phone auth not enabled. Contact support.");
      else if (error.message?.includes("container"))    toast.error("Page error. Please refresh and try again.");
      else toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black flex items-center relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1400&q=80"
            alt="bg"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />
        </div>

        <div className="container-main px-5 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* ─── LEFT info panel ─── */}
          <div className="hidden lg:block">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-8">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              India's #1 Ride & Logistics Platform
            </div>
            <h2 className="text-6xl font-black leading-tight mb-8">
              Welcome Back to
              <span className="gradient-text block">BearRide</span>
            </h2>
            <p className="text-gray-400 text-xl leading-9 mb-12">
              Login to book rides, track deliveries, manage your wallet and access all BearRide services instantly.
            </p>

            {/* Testimonial card */}
            <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => <FaStar key={s} className="text-yellow-400 text-sm" />)}
              </div>
              <p className="text-gray-300 leading-8 mb-6 italic">
                "BearRide is the only app I need for all my transport and delivery needs. Absolutely seamless!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black text-xl">R</div>
                <div>
                  <p className="font-black">Rahul Sharma</p>
                  <p className="text-gray-500 text-sm">Delhi · Regular Customer</p>
                </div>
                <span className="ml-auto text-green-400 text-xs font-bold bg-green-400/10 px-3 py-1 rounded-full">✓ Verified</span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT form ─── */}
          <div className="bg-zinc-950 border border-yellow-500/20 rounded-[40px] p-10 md:p-14 w-full shadow-[0_0_80px_rgba(250,204,21,0.08)]">

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaPhoneAlt className="text-black text-2xl" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black gradient-text mb-3">Login</h1>
              <p className="text-gray-400 leading-8">Enter your 10-digit mobile number</p>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-6">

              {/* Phone input */}
              <div>
                <label className="block mb-3 text-gray-300 font-medium">
                  Phone Number
                </label>
                <div className="flex gap-3">
                  {/* Country code — static, not user-editable */}
                  <div className="flex items-center gap-2 bg-black border border-yellow-500/20 rounded-2xl px-4 py-5 text-gray-300 font-bold whitespace-nowrap flex-shrink-0">
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="flex-1 bg-black border border-yellow-500/20 rounded-2xl px-6 py-5 outline-none text-white text-xl font-bold tracking-widest focus:border-yellow-400 transition-all duration-300"
                  />
                </div>
                <p className="text-gray-600 text-xs mt-2 ml-1">
                  Enter digits only — we'll add the country code automatically
                </p>
              </div>

              {/* Send OTP button */}
              <button
                type="submit"
                disabled={loading || phone.replace(/\D/g, "").length !== 10}
                className="
                  w-full flex items-center justify-center gap-3
                  bg-yellow-400 text-black
                  py-5 rounded-2xl font-black text-lg
                  hover:scale-[1.02] transition-all
                  shadow-[0_0_40px_rgba(250,204,21,0.2)]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
                "
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending OTP...
                  </span>
                ) : (
                  <>Send OTP <FaArrowRight /></>
                )}
              </button>
            </form>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-[1px] bg-yellow-500/10" />
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-[1px] bg-yellow-500/10" />
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-5">New to BearRide?</p>
              <Link
                to="/register"
                className="inline-flex items-center gap-3 border border-yellow-400 text-yellow-400 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black transition-all"
              >
                Create Account <FaArrowRight />
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-gray-600 text-xs">
              <FaShieldAlt className="text-yellow-400" />
              Secured by Firebase OTP Authentication
            </div>

          </div>
        </div>
      </section>

      {/* reCAPTCHA — must be OUTSIDE the form, always in DOM */}
      <div id="recaptcha-container" />

      <Footer />
    </>
  );
}

export default Login;
