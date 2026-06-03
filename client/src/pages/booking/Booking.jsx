import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import LocationInput from "../../components/maps/LocationInput";
import BookingMap from "../../components/maps/BookingMap";
import { createBooking } from "../../services/bookingService";
import { useAuth } from "../../context/AuthContext";
import {
  FaMotorcycle, FaTaxi, FaCar, FaMapMarkerAlt,
  FaClock, FaLocationArrow, FaRoad, FaCheckCircle,
  FaArrowRight, FaStar,
} from "react-icons/fa";

const RIDE_RATES = { BIKE: 10, AUTO: 15, CAB: 20 };
const RIDE_META = {
  BIKE: { label: "BearBike",  eta: "~2 min", desc: "Fastest, most affordable",     icon: <FaMotorcycle /> },
  AUTO: { label: "BearAuto",  eta: "~4 min", desc: "Comfortable 3-seater",         icon: <FaTaxi /> },
  CAB:  { label: "BearCab",   eta: "~6 min", desc: "Premium AC sedan",              icon: <FaCar /> },
};

function Booking() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const mapsLoaded = !!(window.google?.maps);

  const [pickup,   setPickup]   = useState("");
  const [drop,     setDrop]     = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedRide, setSelectedRide] = useState("BIKE");
  const [loading,          setLoading]          = useState(false);
  const [calculatingFare,  setCalculatingFare]  = useState(false);
  const [fares,    setFares]    = useState({ BIKE: 0, AUTO: 0, CAB: 0 });
  const [fareError, setFareError] = useState("");

  const selectedFare = fares[selectedRide] || 0;

  /* ─── Get current location ─── */
  const getCurrentLocation = () => {
    if (!navigator.geolocation) { toast.error("Geolocation not supported"); return; }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        if (!mapsLoaded) {
          setPickup(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
          toast.success("Location set (coordinates)");
          return;
        }
        new window.google.maps.Geocoder().geocode(
          { location: { lat, lng } },
          (results, status) => {
            if (status === "OK" && results[0]) {
              setPickup(results[0].formatted_address);
              toast.success("Current location set");
            } else {
              toast.error("Could not find your address");
            }
          }
        );
      },
      () => toast.error("Location access denied")
    );
  };

  /* ─── Calculate route & fare ─── */
  const calculateRoute = async () => {
    if (!pickup.trim() || !drop.trim()) { toast.error("Enter both pickup and destination"); return; }
    if (pickup.trim() === drop.trim()) { toast.error("Pickup and destination cannot be the same"); return; }

    setFareError("");

    /* If Google Maps is loaded — use Directions API */
    if (mapsLoaded) {
      try {
        setCalculatingFare(true);
        const result = await new window.google.maps.DirectionsService().route({
          origin: pickup,
          destination: drop,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
        const leg = result.routes[0].legs[0];
        const km  = leg.distance.value / 1000;

        setDistance(leg.distance.text);
        setDuration(leg.duration.text);
        setFares({
          BIKE: Math.max(20,  Math.round(km * RIDE_RATES.BIKE)),
          AUTO: Math.max(30,  Math.round(km * RIDE_RATES.AUTO)),
          CAB:  Math.max(50,  Math.round(km * RIDE_RATES.CAB)),
        });
        toast.success("Fare calculated!");
      } catch (err) {
        console.error(err);
        setFareError("Could not find route. Check your locations and try again.");
        toast.error("Route not found");
      } finally {
        setCalculatingFare(false);
      }
      return;
    }

    /* Fallback — estimate based on straight-line distance or fixed estimate */
    setCalculatingFare(true);
    await new Promise(r => setTimeout(r, 600)); // small UX delay
    // Rough estimate when Maps not loaded
    const estimate = Math.floor(Math.random() * 8) + 5; // 5-12 km estimate
    setDistance(`~${estimate} km`);
    setDuration(`~${Math.round(estimate * 3)} min`);
    setFares({
      BIKE: Math.max(20,  Math.round(estimate * RIDE_RATES.BIKE)),
      AUTO: Math.max(30,  Math.round(estimate * RIDE_RATES.AUTO)),
      CAB:  Math.max(50,  Math.round(estimate * RIDE_RATES.CAB)),
    });
    toast.success("Fare estimated (offline mode)");
    setCalculatingFare(false);
  };

  /* ─── Book ride ─── */
  const handleBooking = async () => {
    if (!pickup.trim() || !drop.trim()) { toast.error("Enter pickup and destination"); return; }
    if (!distance)                      { toast.error("Calculate fare first"); return; }

    try {
      setLoading(true);

      const bookingPayload = {
        pickup:      pickup.trim(),
        destination: drop.trim(),
        rideType:    selectedRide,
        fare:        selectedFare,
        distance,
        duration,
      };

      let confirmedBooking = null;

      /* Try backend */
      try {
        const res = await createBooking(bookingPayload);
        if (res.success) confirmedBooking = res.booking;
      } catch (backendErr) {
        console.warn("Backend offline — saving booking locally:", backendErr.message);

        /* Local booking fallback */
        const localId = Date.now();
        confirmedBooking = {
          id:          localId,
          localId:     localId,
          ...bookingPayload,
          customerId:  user?.id || user?.uid || "local",
          status:      "PENDING",
          createdAt:   new Date().toISOString(),
          isLocal:     true,
        };

        const existing = JSON.parse(localStorage.getItem("bearride_local_bookings") || "[]");
        localStorage.setItem("bearride_local_bookings", JSON.stringify([confirmedBooking, ...existing]));
      }

      toast.success("🎉 Ride booked successfully!");
      navigate("/booking/confirmation", { state: { booking: confirmedBooking } });

    } catch (err) {
      console.error(err);
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="pb-20">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-2">Book a Ride</h1>
          <p className="text-gray-400">Instant booking with real-time fare estimates.</p>
          {!mapsLoaded && (
            <div className="mt-3 inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 rounded-full text-yellow-400 text-sm font-medium">
              ⚡ Running in manual mode — enter addresses directly
            </div>
          )}
        </div>

        {/* ── Location inputs ── */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-black mb-1">Set Your Locations</h2>
              <p className="text-gray-400 text-sm">Enter pickup and drop point</p>
            </div>
            <button
              onClick={getCurrentLocation}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl font-bold transition-all text-sm"
            >
              <FaLocationArrow /> Use My Location
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs mb-2 block">Pickup Location</label>
              <LocationInput
                placeholder="Where are you? Enter city, area or address"
                onSelect={setPickup}
                value={pickup}
                icon={<div className="w-3 h-3 bg-green-400 rounded-full" />}
              />
              {pickup && (
                <p className="text-green-400 text-xs mt-1.5 ml-1 truncate">📍 {pickup}</p>
              )}
            </div>

            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 border-t border-dashed border-yellow-500/10" />
              <div className="text-yellow-400/40 text-xs">↕</div>
              <div className="flex-1 border-t border-dashed border-yellow-500/10" />
            </div>

            <div>
              <label className="text-gray-400 text-xs mb-2 block">Drop Location</label>
              <LocationInput
                placeholder="Where are you going? Enter destination"
                onSelect={setDrop}
                value={drop}
                icon={<FaMapMarkerAlt className="text-red-400 text-sm" />}
              />
              {drop && (
                <p className="text-red-400 text-xs mt-1.5 ml-1 truncate">🔴 {drop}</p>
              )}
            </div>
          </div>

          <button
            onClick={calculateRoute}
            disabled={calculatingFare || !pickup || !drop}
            className="mt-6 w-full flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black px-10 py-4 rounded-2xl font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {calculatingFare ? (
              <>
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Calculating Fare...
              </>
            ) : (
              <>🔍 Calculate Fare</>
            )}
          </button>

          {fareError && (
            <p className="text-red-400 text-sm mt-3 text-center">{fareError}</p>
          )}
        </div>

        {/* ── Map ── */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden mb-6">
          <BookingMap pickup={pickup} drop={drop} />
        </div>

        {/* ── Fare results + ride selection ── */}
        {distance && (
          <>
            {/* Trip summary strip */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-2xl p-5 text-center">
                <FaRoad className="text-yellow-400 text-2xl mx-auto mb-2" />
                <p className="text-gray-400 text-xs mb-1">Distance</p>
                <p className="font-black text-lg">{distance}</p>
              </div>
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-2xl p-5 text-center">
                <FaClock className="text-yellow-400 text-2xl mx-auto mb-2" />
                <p className="text-gray-400 text-xs mb-1">Est. Time</p>
                <p className="font-black text-lg">{duration}</p>
              </div>
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-2xl p-5 text-center">
                <span className="text-yellow-400 text-2xl mx-auto mb-2 block">₹</span>
                <p className="text-gray-400 text-xs mb-1">Selected Fare</p>
                <p className="font-black text-lg text-yellow-400">₹{selectedFare}</p>
              </div>
            </div>

            {/* Ride type selector */}
            <h2 className="text-3xl font-black mb-4">Choose Your Ride</h2>
            <div className="grid md:grid-cols-3 gap-5 mb-6">
              {Object.entries(RIDE_META).map(([type, meta]) => (
                <button
                  key={type}
                  onClick={() => setSelectedRide(type)}
                  className={`relative text-left p-6 rounded-3xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                    selectedRide === type
                      ? "border-yellow-400 bg-yellow-400/8 shadow-[0_0_30px_rgba(250,204,21,0.15)]"
                      : "border-yellow-500/10 bg-zinc-950 hover:border-yellow-400/40"
                  }`}
                >
                  {selectedRide === type && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-black rounded-full p-1">
                      <FaCheckCircle className="text-xs" />
                    </div>
                  )}
                  <div className="text-yellow-400 text-4xl mb-4">{meta.icon}</div>
                  <p className="font-black text-xl mb-0.5">{meta.label}</p>
                  <p className="text-gray-400 text-sm mb-3">{meta.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-400 font-black text-2xl">₹{fares[type]}</p>
                      <p className="text-gray-500 text-xs">total fare</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">{meta.eta}</p>
                      <div className="flex items-center gap-1 justify-end mt-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 text-xs">Near you</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Booking summary card */}
            <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-6">
              <h2 className="text-2xl font-black mb-5">Booking Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-yellow-500/5">
                  <span className="text-gray-400">Pickup</span>
                  <span className="font-bold text-right max-w-[60%] text-sm leading-snug">{pickup}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-yellow-500/5">
                  <span className="text-gray-400">Destination</span>
                  <span className="font-bold text-right max-w-[60%] text-sm leading-snug">{drop}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-yellow-500/5">
                  <span className="text-gray-400">Vehicle</span>
                  <span className="font-bold">{RIDE_META[selectedRide].label}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-yellow-500/5">
                  <span className="text-gray-400">Distance</span>
                  <span className="font-bold">{distance}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-yellow-500/5">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-bold">{duration}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-xl font-black">Total Fare</span>
                  <span className="text-yellow-400 font-black text-3xl">₹{selectedFare}</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs text-center mt-2">
                Pay after ride • No upfront payment required
              </p>
            </div>

            {/* Safety note */}
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-6">
              <span className="text-2xl">🛡️</span>
              <div>
                <p className="text-green-400 font-bold text-sm">Safe Ride Guarantee</p>
                <p className="text-gray-400 text-xs mt-0.5">All drivers are verified • Real-time GPS tracking • SOS emergency button</p>
              </div>
            </div>

            {/* Confirm booking button */}
            <button
              onClick={handleBooking}
              disabled={loading}
              className="
                w-full flex items-center justify-center gap-4
                bg-yellow-400 hover:bg-yellow-300
                disabled:opacity-50 disabled:cursor-not-allowed
                text-black px-12 py-6 rounded-2xl
                font-black text-xl
                transition-all duration-300 hover:scale-[1.02]
                shadow-[0_0_50px_rgba(250,204,21,0.25)]
              "
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                  Confirming Ride...
                </span>
              ) : (
                <>
                  Confirm {RIDE_META[selectedRide].label} • ₹{selectedFare}
                  <FaArrowRight />
                </>
              )}
            </button>
          </>
        )}

        {/* Empty state when no fare calculated */}
        {!distance && !calculatingFare && (
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-12 text-center">
            <div className="text-6xl mb-5">🏍️</div>
            <h3 className="text-2xl font-black mb-3">Ready to Ride?</h3>
            <p className="text-gray-400 leading-7 max-w-md mx-auto">
              Enter your pickup and destination above, then click <strong className="text-yellow-400">Calculate Fare</strong> to see available rides and prices.
            </p>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default Booking;
