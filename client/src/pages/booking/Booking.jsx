import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import LocationInput from "../../components/maps/LocationInput";
import BookingMap from "../../components/maps/BookingMap";
import { createBooking } from "../../services/bookingService";
import { useAuth } from "../../context/AuthContext";
import {
  FaMotorcycle, FaTaxi, FaCar, FaMapMarkerAlt, FaClock,
  FaLocationArrow, FaRoad,
} from "react-icons/fa";

function Booking() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedRide, setSelectedRide] = useState("BIKE");
  const [loading, setLoading] = useState(false);
  const [calculatingFare, setCalculatingFare] = useState(false);
  const [fares, setFares] = useState({ bike: 0, auto: 0, cab: 0 });

  const resetBooking = () => {
    setPickup("");
    setDrop("");
    setDistance("");
    setDuration("");
    setSelectedRide("BIKE");
    setFares({ bike: 0, auto: 0, cab: 0 });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (!window.google || !window.google.maps) {
          toast.error("Google Maps not loaded");
          return;
        }

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results[0]) {
            setPickup(results[0].formatted_address);
            toast.success("Current location selected");
          } else {
            toast.error("Address not found");
          }
        });
      },
      () => toast.error("Unable to fetch location")
    );
  };

  const calculateRoute = async () => {
    try {
      if (!pickup || !drop) {
        toast.error("Please select pickup and destination");
        return;
      }
      if (pickup.trim() === drop.trim()) {
        toast.error("Pickup and destination cannot be same");
        return;
      }
      if (!window.google || !window.google.maps) {
        toast.error("Google Maps not loaded");
        return;
      }

      setCalculatingFare(true);
      const directionsService = new window.google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: pickup,
        destination: drop,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      const route = result.routes[0].legs[0];
      setDistance(route.distance.text);
      setDuration(route.duration.text);

      const km = route.distance.value / 1000;
      setFares({
        bike: Math.round(km * 10),
        auto: Math.round(km * 15),
        cab: Math.round(km * 20),
      });

      toast.success("Fare calculated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to calculate route");
    } finally {
      setCalculatingFare(false);
    }
  };

  const getSelectedFare = () => {
    if (selectedRide === "AUTO") return fares.auto;
    if (selectedRide === "CAB") return fares.cab;
    return fares.bike;
  };

  const handleBooking = async () => {
    try {
      if (!pickup || !drop) { toast.error("Please select locations"); return; }
      if (!distance) { toast.error("Please calculate fare first"); return; }

      setLoading(true);

      const response = await createBooking({
        pickup,
        destination: drop,
        rideType: selectedRide,
        fare: getSelectedFare(),
        distance,
        duration,
      });

      if (response.success) {
        toast.success("Ride booked successfully");
        resetBooking();
        navigate("/dashboard/customer/rides");
      } else {
        toast.error(response.message || "Booking failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const rideOptions = [
    { type: "BIKE", icon: <FaMotorcycle />, fare: fares.bike, time: "2 mins away" },
    { type: "AUTO", icon: <FaTaxi />, fare: fares.auto, time: "4 mins away" },
    { type: "CAB", icon: <FaCar />, fare: fares.cab, time: "6 mins away" },
  ];

  return (
    <DashboardLayout>
      <div className="pb-20">
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3">Book Ride</h1>
          <p className="text-gray-400 text-lg">Book rides instantly with real-time tracking and fare estimates.</p>
        </div>

        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-3xl font-black mb-2">Ride Locations</h2>
              <p className="text-gray-400">Select pickup and destination</p>
            </div>
            <button
              onClick={getCurrentLocation}
              className="bg-green-500 hover:bg-green-600 transition-all px-6 py-4 rounded-2xl font-bold flex items-center gap-3"
            >
              <FaLocationArrow /> Use Current Location
            </button>
          </div>

          <div className="space-y-5">
            <LocationInput placeholder="Pickup Location" onSelect={setPickup} />
            <LocationInput placeholder="Drop Location" onSelect={setDrop} />

            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Manual Pickup Location"
              className="w-full bg-black border border-yellow-500/10 rounded-2xl px-5 py-4 outline-none"
            />
            <input
              type="text"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="Manual Destination"
              className="w-full bg-black border border-yellow-500/10 rounded-2xl px-5 py-4 outline-none"
            />
          </div>

          <button
            onClick={calculateRoute}
            disabled={calculatingFare}
            className="mt-6 bg-yellow-400 hover:bg-yellow-300 transition-all text-black px-10 py-4 rounded-2xl font-black"
          >
            {calculatingFare ? "Calculating..." : "Calculate Fare"}
          </button>
        </div>

        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden mb-10">
          <BookingMap pickup={pickup} drop={drop} />
        </div>

        {distance && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
                <FaRoad className="text-yellow-400 text-3xl mb-4" />
                <p className="text-gray-400 mb-2">Distance</p>
                <h3 className="text-4xl font-black">{distance}</h3>
              </div>
              <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
                <FaClock className="text-yellow-400 text-3xl mb-4" />
                <p className="text-gray-400 mb-2">Estimated Time</p>
                <h3 className="text-4xl font-black">{duration}</h3>
              </div>
              <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
                <FaCar className="text-yellow-400 text-3xl mb-4" />
                <p className="text-gray-400 mb-2">Selected Ride</p>
                <h3 className="text-4xl font-black text-yellow-400">{selectedRide}</h3>
              </div>
            </div>

            <h2 className="text-4xl font-black mb-8">Choose Ride</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {rideOptions.map((ride) => (
                <div
                  key={ride.type}
                  onClick={() => setSelectedRide(ride.type)}
                  className={`cursor-pointer p-8 rounded-3xl border transition-all duration-300 ${
                    selectedRide === ride.type
                      ? "border-yellow-400 bg-yellow-400/5 scale-[1.02]"
                      : "border-yellow-500/10 hover:border-yellow-400/40"
                  }`}
                >
                  <div className="text-5xl text-yellow-400 mb-5">{ride.icon}</div>
                  <h3 className="text-3xl font-black mb-2">{ride.type}</h3>
                  <p className="text-gray-400 mb-4">{ride.time}</p>
                  <h4 className="text-4xl font-black text-yellow-400">{`₹${ride.fare}`}</h4>
                </div>
              ))}
            </div>

            <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-10">
              <h2 className="text-3xl font-black mb-6">Booking Summary</h2>
              <div className="space-y-4 text-lg">
                <p><span className="text-gray-400">Pickup:</span> {pickup}</p>
                <p><span className="text-gray-400">Destination:</span> {drop}</p>
                <p><span className="text-gray-400">Distance:</span> {distance}</p>
                <p><span className="text-gray-400">Duration:</span> {duration}</p>
                <p><span className="text-gray-400">Ride Type:</span> {selectedRide}</p>
                <p className="text-yellow-400 text-3xl font-black pt-3">{`₹${getSelectedFare()}`}</p>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading || !distance}
              className="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-black px-12 py-5 rounded-2xl font-black text-xl"
            >
              {loading ? "Booking Ride..." : `Book ${selectedRide} • ₹${getSelectedFare()}`}
            </button>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Booking;
