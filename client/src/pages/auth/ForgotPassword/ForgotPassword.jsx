import { useState } from "react";

import Navbar from "../../../components/navbar/Navbar";

import Footer from "../../../components/footer/Footer";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

function ForgotPassword() {

  const [phone, setPhone] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleReset = async (
    e
  ) => {

    e.preventDefault();

    if (!phone) {

      toast.error(
        "Enter phone number"
      );

      return;
    }

    try {

      setLoading(true);

      setTimeout(() => {

        toast.success(
          "Password reset link/process initiated"
        );

        setLoading(false);

      }, 2000);

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black flex items-center justify-center px-5 py-24 overflow-hidden">

        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-400/10 blur-[120px] rounded-full"></div>

        <div
          className="
            relative z-10
            bg-zinc-950
            border border-yellow-500/20
            rounded-[40px]
            p-10 md:p-14
            w-full
            max-w-xl
            shadow-[0_0_80px_rgba(250,204,21,0.05)]
          "
        >

          {/* HEADING */}
          <div className="text-center mb-10">

            <h1 className="text-5xl font-black gradient-text mb-5">
              Forgot Password
            </h1>

            <p className="text-gray-400 leading-8 text-lg">
              Enter your registered phone number
              to recover your BearRide account.
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleReset}
            className="space-y-7"
          >

            {/* PHONE INPUT */}
            <div>

              <label className="block mb-3 text-gray-300 font-medium">
                Registered Phone Number
              </label>

              <input
                type="tel"

                placeholder="+91 9876543210"

                value={phone}

                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }

                className="
                  w-full
                  bg-black
                  border border-yellow-500/20
                  rounded-2xl
                  px-6 py-5
                  outline-none
                  text-white
                  focus:border-yellow-400
                  transition-all duration-300
                "
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"

              disabled={loading}

              className="
                w-full
                bg-yellow-400
                text-black
                py-5
                rounded-2xl
                font-bold
                hover:scale-[1.02]
                transition-all duration-300
                shadow-[0_0_40px_rgba(250,204,21,0.15)]
              "
            >
              {
                loading
                  ? "Processing..."
                  : "Recover Account"
              }
            </button>

          </form>

          {/* EXTRA LINKS */}
          <div className="mt-10 text-center space-y-5">

            <p className="text-gray-400">
              Remember your account details?
            </p>

            <Link
              to="/login"

              className="
                inline-block
                border border-yellow-400
                text-yellow-400
                px-8 py-4
                rounded-2xl
                font-bold
                hover:bg-yellow-400
                hover:text-black
                transition-all duration-300
              "
            >
              Back To Login
            </Link>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default ForgotPassword;