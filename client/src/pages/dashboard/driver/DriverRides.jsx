import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import { getDriverBookings, startRide, completeRide } from "../../../services/bookingService";
import toast from "react-hot-toast";
import { FaSyncAlt, FaPlay, FaFlagCheckered } from "react-icons/fa";

function DriverRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const loadRides = async () => {
    try {
      setLoading(true);
      const res = await getDriverBookings();
      if (res.success) setRides(res.bookings);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadRides(); }, []);

  const handleStart = async (id) => {
    try { const r = await startRide(id); if (r.success) { toast.success("Ride started!"); loadRides(); } }
    catch (e) { toast.error(e.response?.data?.message || "Failed"); }
  };

  const handleComplete = async (id) => {
    try { const r = await completeRide(id); if (r.success) { toast.success("Ride completed!"); loadRides(); } }
    catch (e) { toast.error(e.response?.data?.message || "Failed"); }
  };

  const filtered = filter ? rides.filter((r) => r.status === filter) : rides;

  const getStatusStyle = (s) => ({
    ACCEPTED: "bg-blue-500/20 text-blue-400", STARTED: "bg-green-500/20 text-green-400",
    COMPLETED: "bg-emerald-500/20 text-emerald-400", CANCELLED: "bg-red-500/20 text-red-400",
    PENDING: "bg-yellow-500/20 text-yellow-400",
  }[s] || "bg-zinc-700 text-white");

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-black mb-3">My Rides</h1>
            <p className="text-gray-400">View and manage all your assigned rides.</p>
          </div>
          <button onClick={loadRides} className="flex items-center gap-3 bg-yellow-400 text-black px-6 py-4 rounded-2xl font-bold">
            <FaSyncAlt /> Refresh
          </button>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {["", "ACCEPTED", "STARTED", "COMPLETED", "CANCELLED"].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-5 py-2 rounded-xl font-bold transition-all ${filter === s ? "bg-yellow-400 text-black" : "bg-zinc-900 text-gray-400"}`}>
              {s || "All"}
            </button>
          ))}
        </div>

        {loading && <div className="bg-zinc-950 rounded-3xl p-10 text-center text-gray-400">Loading...</div>}

        {!loading && filtered.length === 0 && (
          <div className="bg-zinc-950 rounded-3xl p-10 text-center">
            <h3 className="text-2xl font-black mb-2">No Rides Found</h3>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-yellow-500/10 text-left">
                    <th className="p-5 text-gray-400 font-semibold">ID</th>
                    <th className="p-5 text-gray-400 font-semibold">Customer</th>
                    <th className="p-5 text-gray-400 font-semibold">Pickup</th>
                    <th className="p-5 text-gray-400 font-semibold">Destination</th>
                    <th className="p-5 text-gray-400 font-semibold">Fare</th>
                    <th className="p-5 text-gray-400 font-semibold">Status</th>
                    <th className="p-5 text-gray-400 font-semibold">Date</th>
                    <th className="p-5 text-gray-400 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((ride) => (
                    <tr key={ride.id} className="border-b border-yellow-500/5 hover:bg-zinc-900/50 transition-all">
                      <td className="p-5 text-yellow-400 font-bold">#{ride.id}</td>
                      <td className="p-5">{ride.customer?.fullName || "-"}</td>
                      <td className="p-5 max-w-[150px] truncate">{ride.pickup}</td>
                      <td className="p-5 max-w-[150px] truncate">{ride.destination}</td>
                      <td className="p-5 font-bold">{`₹${ride.fare}`}</td>
                      <td className="p-5"><span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusStyle(ride.status)}`}>{ride.status}</span></td>
                      <td className="p-5 text-gray-400">{new Date(ride.createdAt).toLocaleDateString()}</td>
                      <td className="p-5">
                        <div className="flex gap-2">
                          {ride.status === "ACCEPTED" && (
                            <button onClick={() => handleStart(ride.id)} className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-2 rounded-lg text-sm font-bold hover:bg-green-500/40"><FaPlay /> Start</button>
                          )}
                          {ride.status === "STARTED" && (
                            <button onClick={() => handleComplete(ride.id)} className="flex items-center gap-1 bg-yellow-400/20 text-yellow-400 px-3 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400/40"><FaFlagCheckered /> Complete</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DriverRides;
