import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import toast from "react-hot-toast";
import { setupRecaptcha } from "../../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaPhoneAlt, FaUserTag, FaArrowRight,
  FaMotorcycle, FaBuilding, FaShieldAlt, FaCheckCircle,
} from "react-icons/fa";

const ROLES = [
  { value: "CUSTOMER", label: "Customer",      icon: <FaUser />,      desc: "Book rides, deliveries & services",   color: "border-yellow-400 bg-yellow-400/10 text-yellow-400" },
  { value: "DRIVER",   label: "Driver Partner", icon: <FaMotorcycle />, desc: "Drive & earn on your schedule",       color: "border-green-400 bg-green-400/10 text-green-400" },
  { value: "VENDOR",   label: "Vendor / B2B",   icon: <FaBuilding />,  desc: "Manage fleet & business logistics",   color: "border-blue-400 bg-blue-400/10 text-blue-400" },
];

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const digits = phone.replace(/\D/g, "");
    if (!fullName)              { toast.error("Please enter your full name"); return; }
    if (digits.length !== 10)   { toast.error("Enter a valid 10-digit mobile number"); return; }

    try {
      setLoading(true);

      // Always build clean E.164: +91 + 10 digits
      const e164 = `+91${digits}`;

      const confirmationResult = await setupRecaptcha(e164);
      window.confirmationResult = confirmationResult;
      localStorage.setItem("bearride_register_data", JSON.stringify({ fullName, email, phone: e164, role }));
      toast.success(`OTP sent to +91 ${digits}`);
      navigate("/otp", { state: { phone: e164, isRegister: true } });
    } catch (error) {
      console.error(error);
      if (error.code === "auth/invalid-phone-number")    toast.error("Invalid number. Use a valid 10-digit Indian mobile.");
      else if (error.code === "auth/too-many-requests")  toast.error("Too many attempts. Please wait and try again.");
      else if (error.code === "auth/operation-not-allowed") toast.error("Phone auth not enabled. Contact support.");
      else if (error.message?.includes("container"))     toast.error("Page error. Please refresh and try again.");
      else toast.error("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black flex items-center relative overflow-hidden py-20">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80"
            alt="bg"
            className="w-full h-full object-cover opacity-8"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black" />
        </div>

        <div className="container-main px-5 relative z-10 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
              Free to Join · No Credit Card
            </div>
            <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">Create Account</h1>
            <p className="text-gray-400 leading-8 max-w-2xl mx-auto">
              Join India's next-generation mobility ecosystem. Register as a Customer, Driver, or Vendor.
            </p>
          </div>

          <div className="bg-zinc-950 border border-yellow-500/20 rounded-[40px] p-10 md:p-14 shadow-[0_0_80px_rgba(250,204,21,0.08)]">

            {/* Role selector */}
            <div className="mb-10">
              <label className="block mb-5 text-gray-300 font-black text-lg">Select Your Role</label>
              <div className="grid md:grid-cols-3 gap-4">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
                      role === r.value ? r.color : "border-yellow-500/10 bg-black text-gray-400 hover:border-yellow-500/30"
                    }`}
                  >
                    <div className="text-2xl mb-3">{r.icon}</div>
                    <p className="font-black text-lg">{r.label}</p>
                    <p className="text-sm opacity-70 mt-1 leading-5">{r.desc}</p>
                    {role === r.value && (
                      <div className="mt-3">
                        <FaCheckCircle className="text-lg" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block mb-3 text-gray-300 font-medium">Full Name *</label>
                <div className="relative">
                  <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-black border border-yellow-500/20 rounded-2xl pl-14 pr-6 py-5 outline-none text-white focus:border-yellow-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-3 text-gray-300 font-medium">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-yellow-500/20 rounded-2xl pl-14 pr-6 py-5 outline-none text-white focus:border-yellow-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-3 text-gray-300 font-medium">Phone Number *</label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-black border border-yellow-500/20 rounded-2xl px-4 py-5 text-gray-300 font-bold whitespace-nowrap flex-shrink-0">
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    required
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="flex-1 bg-black border border-yellow-500/20 rounded-2xl px-6 py-5 outline-none text-white text-xl font-bold tracking-widest focus:border-yellow-400 transition-all"
                  />
                </div>
                <p className="text-gray-600 text-xs mt-2 ml-1">Digits only — 10 numbers</p>
              </div>

              <div className="flex items-start gap-3 bg-black border border-yellow-500/10 rounded-2xl p-4">
                <input type="checkbox" required className="mt-1 accent-yellow-400 w-5 h-5" />
                <p className="text-gray-400 text-sm leading-7">
                  I agree to the{" "}
                  <span className="text-yellow-400 cursor-pointer">Terms & Conditions</span>
                  {" "}and{" "}
                  <span className="text-yellow-400 cursor-pointer">Privacy Policy</span>
                  {" "}of BearRide.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || phone.replace(/\D/g, "").length !== 10 || !fullName}
                className="w-full flex items-center justify-center gap-3 bg-yellow-400 text-black py-5 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(250,204,21,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending OTP...
                  </span>
                ) : (
                  <>Create Account <FaArrowRight /></>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
              <FaShieldAlt className="text-yellow-400" />
              <span>Secured with Firebase OTP Authentication</span>
            </div>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-[1px] bg-yellow-500/10" />
              <span className="text-gray-500 text-sm">ALREADY A MEMBER?</span>
              <div className="flex-1 h-[1px] bg-yellow-500/10" />
            </div>

            <div className="text-center">
              <Link to="/login" className="inline-flex items-center gap-3 border border-yellow-400 text-yellow-400 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black transition-all">
                Login Instead <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* reCAPTCHA — must be OUTSIDE the form/section, always in DOM */}
      <div id="recaptcha-container" />

      <Footer />
    </>
  );
}

export default Register;
