import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import { getPendingBookings, acceptBooking } from "../../../services/bookingService";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaHandPaper, FaSyncAlt } from "react-icons/fa";

function PendingRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRides = async () => {
    try {
      setLoading(true);
      const res = await getPendingBookings();
      if (res.success) setRides(res.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRides(); }, []);

  const handleAccept = async (id) => {
    try {
      const res = await acceptBooking(id);
      if (res.success) { toast.success("Ride accepted!"); loadRides(); }
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-black mb-3">Pending Rides</h1>
            <p className="text-gray-400">Accept new ride requests from customers.</p>
          </div>
          <button onClick={loadRides} className="flex items-center gap-3 bg-yellow-400 text-black px-6 py-4 rounded-2xl font-bold">
            <FaSyncAlt /> Refresh
          </button>
        </div>

        {loading && <div className="bg-zinc-950 rounded-3xl p-10 text-center text-gray-400">Loading...</div>}

        {!loading && rides.length === 0 && (
          <div className="bg-zinc-950 rounded-3xl p-10 text-center">
            <h3 className="text-3xl font-black mb-3">No Pending Rides</h3>
            <p className="text-gray-400">New ride requests will appear here.</p>
          </div>
        )}

        <div className="space-y-6">
          {rides.map((ride) => (
            <div key={ride.id} className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 hover:border-yellow-400/30 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-yellow-400 font-bold text-xl">#{ride.id}</span>
                    <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">{ride.rideType}</span>
                    <span className="text-3xl font-black text-yellow-400">{`₹${ride.fare}`}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-400 mt-1.5"></div>
                      <span>{ride.pickup}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-red-400 mt-0.5" />
                      <span>{ride.destination}</span>
                    </div>
                  </div>
                  {ride.distance && <p className="text-gray-400 mt-3">{ride.distance} | {ride.duration}</p>}
                  <p className="text-gray-500 text-sm mt-2">{ride.customer?.fullName} - {ride.customer?.phone}</p>
                </div>
                <button onClick={() => handleAccept(ride.id)}
                  className="flex items-center gap-3 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all">
                  <FaHandPaper /> Accept Ride
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PendingRides;
