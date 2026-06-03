import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import {
  FaLocationArrow, FaTruck, FaMapMarkerAlt, FaClock,
  FaCheckCircle, FaPhoneAlt, FaSearch, FaMotorcycle, FaStar,
} from "react-icons/fa";

const STEPS = [
  { icon: <FaCheckCircle />, label: "Order Confirmed",    desc: "Booking successfully placed",               done: true },
  { icon: <FaLocationArrow />, label: "Driver Assigned",  desc: "Rahul Sharma assigned to your ride",        done: true },
  { icon: <FaTruck />,       label: "In Transit",         desc: "Driver is on the way — 4.2 km away",        done: true, active: true },
  { icon: <FaClock />,       label: "Arriving Soon",      desc: "Estimated arrival: 8 minutes",              done: false },
  { icon: <FaCheckCircle />, label: "Delivered",          desc: "Ride / Parcel delivered successfully",      done: false },
];

function Tracking() {
  const [trackingId, setTrackingId] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative bg-black py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1400&q=80"
            alt="Tracking"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
        </div>
        <div className="container-main px-5 text-center relative z-10">
          <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-8">
            Real-Time Tracking
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            Track Your <span className="gradient-text">Ride & Parcel</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-9">
            Real-time tracking for rides, parcel deliveries, logistics and enterprise shipments across BearRide's network.
          </p>
        </div>
      </section>

      {/* SEARCH BOX */}
      <section className="bg-zinc-950 py-16">
        <div className="container-main px-5 max-w-4xl">
          <div className="bg-black border border-yellow-500/20 rounded-[40px] p-10">
            <h2 className="text-3xl font-black mb-8">Enter Your Tracking Details</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="relative">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Tracking ID (e.g. BR45896)"
                  className="w-full bg-zinc-950 border border-yellow-500/20 rounded-2xl pl-14 pr-5 py-5 outline-none text-white focus:border-yellow-400 transition-all"
                />
              </div>
              <div className="relative">
                <FaPhoneAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full bg-zinc-950 border border-yellow-500/20 rounded-2xl pl-14 pr-5 py-5 outline-none text-white focus:border-yellow-400 transition-all"
                />
              </div>
              <button
                onClick={() => setSearched(true)}
                className="bg-yellow-400 text-black rounded-2xl font-black text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <FaSearch /> Track Now
              </button>
            </div>
            {!searched && (
              <div className="mt-6 flex flex-wrap gap-3">
                <p className="text-gray-500 text-sm mr-2">Try demo:</p>
                {["BR45896321", "PKT78234", "TRK11029"].map((id) => (
                  <button
                    key={id}
                    onClick={() => { setTrackingId(id); setSearched(true); }}
                    className="text-yellow-400 text-sm font-bold bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 rounded-xl hover:bg-yellow-400/20 transition-all"
                  >
                    {id}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LIVE TRACKING RESULT */}
      <section className="section-padding bg-black">
        <div className="container-main px-5">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* PROGRESS STEPS */}
            <div className="lg:col-span-2 bg-zinc-950 border border-yellow-500/10 rounded-3xl p-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-yellow-400 text-black p-4 rounded-2xl">
                  <FaMotorcycle size={26} />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Live Status</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-green-400 text-sm font-bold">In Progress</p>
                  </div>
                </div>
              </div>

              <div className="relative space-y-0">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex gap-5 pb-8 last:pb-0 relative">
                    {/* Vertical line */}
                    {i < STEPS.length - 1 && (
                      <div className={`absolute left-[27px] top-14 w-0.5 h-full -translate-y-2 ${step.done ? "bg-yellow-400/60" : "bg-zinc-800"}`} />
                    )}

                    {/* Icon circle */}
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-xl relative z-10 transition-all ${
                      step.active ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.5)]"
                      : step.done  ? "bg-yellow-400/20 text-yellow-400"
                      : "bg-zinc-900 text-gray-600"
                    }`}>
                      {step.icon}
                      {step.active && (
                        <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-ping" />
                      )}
                    </div>

                    <div className="pt-2">
                      <h3 className={`text-lg font-black ${step.done || step.active ? "text-white" : "text-gray-600"}`}>
                        {step.label}
                      </h3>
                      <p className={`text-sm mt-1 leading-6 ${step.done || step.active ? "text-gray-400" : "text-gray-700"}`}>
                        {step.desc}
                      </p>
                      {step.active && (
                        <span className="inline-block mt-2 text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">
                          Current Status
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DETAILS */}
            <div className="lg:col-span-3 space-y-6">

              {/* Map placeholder */}
              <div className="relative rounded-3xl overflow-hidden border border-yellow-500/10 h-64">
                <img
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80"
                  alt="Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/80 backdrop-blur-md border border-yellow-500/20 rounded-2xl px-8 py-6 text-center">
                    <div className="text-yellow-400 text-4xl mb-3">📍</div>
                    <p className="font-black text-xl">Live Map Tracking</p>
                    <p className="text-gray-400 text-sm mt-1">Google Maps integration coming soon</p>
                  </div>
                </div>
                {/* Driver dot animation */}
                <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-pulse" />
              </div>

              {/* Ride info */}
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
                <h2 className="text-2xl font-black gradient-text mb-8">Tracking ID: BR45896321</h2>
                <div className="grid md:grid-cols-2 gap-y-5 gap-x-8">
                  {[
                    { label: "Driver",         value: "Rahul Sharma" },
                    { label: "Vehicle",        value: "Honda Shine · DL01AB1234" },
                    { label: "Pickup",         value: "Connaught Place, Delhi" },
                    { label: "Destination",    value: "Noida Sector 62" },
                    { label: "Distance",       value: "14.2 km" },
                    { label: "ETA",            value: "~8 Minutes" },
                    { label: "Ride Type",      value: "Bike" },
                    { label: "Fare",           value: "₹142" },
                  ].map((item) => (
                    <div key={item.label} className="border-b border-yellow-500/5 pb-4">
                      <p className="text-gray-500 text-sm">{item.label}</p>
                      <p className={`font-bold mt-1 ${item.label === "ETA" ? "text-yellow-400" : ""}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Driver card */}
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
                <h3 className="text-xl font-black mb-6">Your Driver</h3>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-black">R</div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-black">Rahul Sharma</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {[1,2,3,4,5].map(s => <FaStar key={s} className="text-yellow-400 text-sm" />)}
                      <span className="text-gray-400 text-sm ml-1">4.98 · 1,240 rides</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">Honda Shine · DL01AB1234</p>
                  </div>
                  <button className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
                    <FaPhoneAlt /> Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Tracking;
