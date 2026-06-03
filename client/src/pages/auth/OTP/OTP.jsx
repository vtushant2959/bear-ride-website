import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import toast from "react-hot-toast";
import api from "../../../services/api";
import { useNavigate, Link, useLocation } from "react-router-dom";

function OTP() {
  const { login } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = location.state?.isRegister || false;

  const verifyOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const result = await window.confirmationResult.confirm(otp);
      const firebaseToken = await result.user.getIdToken();

      let registerData = null;
      if (isRegister) {
        const stored = localStorage.getItem("bearride_register_data");
        if (stored) {
          registerData = JSON.parse(stored);
          localStorage.removeItem("bearride_register_data");
        }
      }

      const response = await api.post("/auth/firebase-login", {
        token: firebaseToken,
        registerData,
      });

      const data = response.data;

      if (!data.success) {
        toast.error(data.message || "Authentication Failed");
        return;
      }

      login(data.user, data.token);
      toast.success(isRegister ? "Account Created Successfully" : "Login Successful");

      const role = data.user.role;
      if (role === "CUSTOMER") navigate("/dashboard/customer");
      else if (role === "DRIVER") navigate("/dashboard/driver");
      else if (role === "VENDOR") navigate("/dashboard/vendor");
      else if (role === "ADMIN") navigate("/admin");
      else navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black flex items-center justify-center px-5 py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 blur-[140px] rounded-full"></div>

        <div className="relative z-10 bg-zinc-950 border border-yellow-500/20 rounded-[40px] p-10 md:p-14 w-full max-w-xl shadow-[0_0_80px_rgba(250,204,21,0.05)]">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">
              Verify OTP
            </h1>
            <p className="text-gray-400 leading-8">
              Enter the verification code sent to your mobile number.
            </p>
          </div>

          <form onSubmit={verifyOTP} className="space-y-6">
            <div>
              <label className="block mb-3 text-gray-300 font-medium">Enter OTP</label>
              <input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-5 outline-none text-white tracking-[10px] text-center text-2xl font-bold focus:border-yellow-400 transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-5 rounded-2xl font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(250,204,21,0.15)]"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-400 mb-4">Didn't receive the OTP?</p>
            <button className="text-yellow-400 font-semibold hover:text-yellow-300 transition-all duration-300">
              Resend OTP
            </button>
          </div>

          <div className="text-center mt-10">
            <Link to="/login" className="text-gray-500 hover:text-yellow-400 transition-all duration-300">
              &larr; Back to Login
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default OTP;
