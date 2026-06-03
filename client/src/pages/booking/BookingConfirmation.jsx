import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import {
  FaCheckCircle, FaMapMarkerAlt, FaMotorcycle, FaTaxi, FaCar,
  FaClock, FaRoad, FaRupeeSign, FaHome, FaPhoneAlt, FaShareAlt,
} from "react-icons/fa";

const VEHICLE_ICONS = {
  BIKE: <FaMotorcycle className="text-4xl text-yellow-400" />,
  AUTO: <FaTaxi className="text-4xl text-yellow-400" />,
  CAB:  <FaCar className="text-4xl text-yellow-400" />,
};

const VEHICLE_NAMES = { BIKE: "BearBike", AUTO: "BearAuto", CAB: "BearCab" };

const DRIVER_POOL = [
  { name: "Rahul Sharma",  vehicle: "Honda Activa • HR26AB1234", rating: "4.98", rides: "1,240" },
  { name: "Aman Verma",    vehicle: "Bajaj Auto • DL01CD5678",  rating: "4.95", rides: "980" },
  { name: "Suresh Kumar",  vehicle: "Maruti Swift • UP16EF9012", rating: "4.97", rides: "2,100" },
  { name: "Vikram Singh",  vehicle: "Honda City • HR01GH3456",  rating: "4.92", rides: "760" },
];

function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const [status, setStatus] = useState("SEARCHING");  // SEARCHING → ACCEPTED
  const [driver] = useState(() => DRIVER_POOL[Math.floor(Math.random() * DRIVER_POOL.length)]);
  const [eta, setEta] = useState(Math.floor(Math.random() * 4) + 2);  // 2-5 min

  /* Simulate driver assignment after 3 seconds */
  useEffect(() => {
    if (!booking) return;
    const t = setTimeout(() => setStatus("ACCEPTED"), 3000);
    return () => clearTimeout(t);
  }, [booking]);

  /* Redirect if no booking data */
  if (!booking) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-3xl font-black mb-4">No booking found</h2>
          <Link to="/booking" className="text-yellow-400 font-bold underline">Book a Ride</Link>
        </div>
      </DashboardLayout>
    );
  }

  const bookingId = `BR${String(booking.id || booking.localId).padStart(6, "0")}`;

  return (
    <DashboardLayout>
      <div className="pb-20 max-w-3xl mx-auto">

        {/* ── Success Header ── */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <FaCheckCircle className="text-green-400 text-5xl" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-xs animate-bounce">
              ✓
            </div>
          </div>
          <h1 className="text-5xl font-black mb-3">Ride Booked!</h1>
          <p className="text-gray-400 text-lg">Your ride has been confirmed.</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-bold">
            Booking ID: {bookingId}
          </div>
        </div>

        {/* ── Driver Assignment Card ── */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-6 relative overflow-hidden">
          {status === "SEARCHING" ? (
            <div className="text-center py-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
              <p className="text-xl font-black text-white">Finding your driver...</p>
              <p className="text-gray-400 mt-2 text-sm">Connecting you with the nearest {VEHICLE_NAMES[booking.rideType]}</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-2xl font-black">Driver Assigned</h2>
                <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-sm font-bold">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  On the way
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">Your driver is heading to pickup</p>

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black text-2xl font-black flex-shrink-0">
                  {driver.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-xl font-black">{driver.name}</p>
                  <p className="text-gray-400 text-sm mt-0.5">{driver.vehicle}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-yellow-400 font-bold text-sm">★ {driver.rating}</span>
                    <span className="text-gray-500 text-sm">{driver.rides} rides</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">Arriving in</p>
                  <p className="text-yellow-400 font-black text-3xl">{eta} min</p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button className="flex-1 flex items-center justify-center gap-3 bg-yellow-400 text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all">
                  <FaPhoneAlt /> Call Driver
                </button>
                <button className="flex-1 flex items-center justify-center gap-3 bg-zinc-900 border border-yellow-500/10 py-4 rounded-2xl font-bold hover:border-yellow-400/40 transition-all">
                  <FaShareAlt /> Share Trip
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Trip Details ── */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-6">
          <h2 className="text-2xl font-black mb-6">Trip Details</h2>

          {/* Route */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <div className="w-0.5 h-12 bg-yellow-500/20 mt-1" />
                <FaMapMarkerAlt className="text-red-400 text-sm" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Pickup</p>
                  <p className="font-bold text-white leading-snug">{booking.pickup}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Destination</p>
                  <p className="font-bold text-white leading-snug">{booking.destination}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-yellow-500/10">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {VEHICLE_ICONS[booking.rideType]}
              </div>
              <p className="text-white font-black">{VEHICLE_NAMES[booking.rideType]}</p>
              <p className="text-gray-500 text-xs">Vehicle Type</p>
            </div>
            <div className="text-center">
              <FaRoad className="text-yellow-400 text-3xl mx-auto mb-2" />
              <p className="text-white font-black">{booking.distance || "Calculating..."}</p>
              <p className="text-gray-500 text-xs">Distance</p>
            </div>
            <div className="text-center">
              <FaClock className="text-yellow-400 text-3xl mx-auto mb-2" />
              <p className="text-white font-black">{booking.duration || "Calculating..."}</p>
              <p className="text-gray-500 text-xs">Est. Time</p>
            </div>
          </div>
        </div>

        {/* ── Fare Breakdown ── */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-6">
          <h2 className="text-2xl font-black mb-6">Fare Summary</h2>
          <div className="space-y-3">
            {[
              { label: "Base Fare",      value: `₹${Math.round(booking.fare * 0.7)}` },
              { label: "Distance Charge", value: `₹${Math.round(booking.fare * 0.25)}` },
              { label: "Platform Fee",    value: `₹${Math.round(booking.fare * 0.05)}` },
              { label: "Taxes & Levies", value: "₹0" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-yellow-500/5 last:border-0">
                <span className="text-gray-400">{item.label}</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-4">
              <span className="text-xl font-black">Total Fare</span>
              <span className="text-yellow-400 font-black text-3xl">₹{booking.fare}</span>
            </div>
          </div>
          <div className="mt-5 bg-green-500/10 border border-green-500/20 rounded-2xl px-5 py-3 text-green-400 text-sm font-bold text-center">
            💵 Pay after ride completion — No upfront payment
          </div>
        </div>

        {/* ── Safety ── */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🛡️</span>
            <h3 className="text-lg font-black">Safety Features Active</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Real-time GPS tracking", "SOS emergency button", "Driver verified ID", "Trip share with family"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-gray-400 text-sm">
                <FaCheckCircle className="text-green-400 text-xs flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/tracking"
            className="flex items-center justify-center gap-3 bg-yellow-400 text-black py-5 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(250,204,21,0.2)]"
          >
            📍 Track Live Ride
          </Link>
          <Link
            to="/dashboard/customer/rides"
            className="flex items-center justify-center gap-3 bg-zinc-900 border border-yellow-500/10 py-5 rounded-2xl font-bold hover:border-yellow-400/40 transition-all"
          >
            <FaHome /> My Rides
          </Link>
        </div>

        {/* ── New booking ── */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/booking")}
            className="text-yellow-400 font-bold hover:text-yellow-300 transition-all"
          >
            + Book another ride
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default BookingConfirmation;
