import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import StatCard from "../../../components/dashboard/card/StatCard";
import { getDashboardStats } from "../../../services/userService";
import { getDriverBookings, getPendingBookings, acceptBooking, startRide, completeRide } from "../../../services/bookingService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  FaCar, FaCheckCircle, FaClock, FaWallet,
  FaMapMarkerAlt, FaPhoneAlt, FaPlay, FaFlagCheckered,
  FaHandPaper, FaSyncAlt, FaExclamationTriangle, FaArrowRight,
} from "react-icons/fa";

function DriverDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [pendingRides, setPendingRides] = useState([]);
  const [myRides, setMyRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pending");

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, pendingRes, ridesRes] = await Promise.all([
        getDashboardStats(),
        getPendingBookings(),
        getDriverBookings(),
      ]);
      if (statsRes.success) setStats(statsRes.stats);
      if (pendingRes.success) setPendingRides(pendingRes.bookings);
      if (ridesRes.success) setMyRides(ridesRes.bookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleAccept = async (id) => {
    try {
      const res = await acceptBooking(id);
      if (res.success) { toast.success("Ride accepted!"); loadData(); }
    } catch (err) { toast.error(err.response?.data?.message || "Failed to accept"); }
  };

  const handleStart = async (id) => {
    try {
      const res = await startRide(id);
      if (res.success) { toast.success("Ride started!"); loadData(); }
    } catch (err) { toast.error(err.response?.data?.message || "Failed to start"); }
  };

  const handleComplete = async (id) => {
    try {
      const res = await completeRide(id);
      if (res.success) { toast.success("Ride completed!"); loadData(); }
    } catch (err) { toast.error(err.response?.data?.message || "Failed to complete"); }
  };

  const getStatusStyle = (status) => {
    const styles = {
      PENDING: "bg-yellow-500/20 text-yellow-400",
      ACCEPTED: "bg-blue-500/20 text-blue-400",
      STARTED: "bg-green-500/20 text-green-400",
      COMPLETED: "bg-emerald-500/20 text-emerald-400",
      CANCELLED: "bg-red-500/20 text-red-400",
    };
    return styles[status] || "bg-zinc-700 text-white";
  };

  const activeRides = myRides.filter((r) => ["ACCEPTED", "STARTED"].includes(r.status));

  return (
    <DashboardLayout>
      <div>
        {/* Driver status banner */}
        {user?.driverStatus === "INCOMPLETE" && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 text-red-400">
              <FaExclamationTriangle className="text-xl flex-shrink-0" />
              <div>
                <p className="font-bold">Documents Required</p>
                <p className="text-sm text-red-300/70">Upload your vehicle and license documents to start accepting rides.</p>
              </div>
            </div>
            <Link to="/driver-onboarding" className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-400 transition-all flex-shrink-0">
              Complete Now <FaArrowRight />
            </Link>
          </div>
        )}

        {user?.driverStatus === "PENDING" && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 mb-6 flex items-center gap-3">
            <FaClock className="text-yellow-400 text-xl flex-shrink-0" />
            <div>
              <p className="text-yellow-400 font-bold">Verification in Progress</p>
              <p className="text-sm text-gray-400">Your documents are under review. You'll be notified within 24 hours.</p>
            </div>
          </div>
        )}

        {user?.driverStatus === "APPROVED" && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <FaCheckCircle className="text-green-400 text-xl" />
            <p className="text-green-400 font-semibold text-sm">Account Verified — You're ready to accept rides!</p>
          </div>
        )}

        {user?.driverStatus === "REJECTED" && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 text-red-400">
              <FaExclamationTriangle className="text-xl flex-shrink-0" />
              <div>
                <p className="font-bold">Verification Rejected</p>
                <p className="text-sm text-red-300/70">Your documents were rejected. Please re-upload with clear, valid documents.</p>
              </div>
            </div>
            <Link to="/driver-onboarding" className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-400 transition-all flex-shrink-0">
              Re-submit <FaArrowRight />
            </Link>
          </div>
        )}

        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border border-yellow-500/10 rounded-3xl p-8 mb-10">
          <h1 className="text-5xl font-black mb-3">Welcome, {user?.fullName?.split(" ")[0]}</h1>
          <p className="text-gray-300 text-lg">Manage your rides, earnings and accept new bookings.</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Rides" value={stats?.total || 0} icon={<FaCar />} color="bg-yellow-400 text-black" />
          <StatCard title="Completed" value={stats?.completed || 0} icon={<FaCheckCircle />} color="bg-green-500 text-white" />
          <StatCard title="Active" value={stats?.active || 0} icon={<FaClock />} color="bg-blue-500 text-white" />
          <StatCard title="Earnings" value={`₹${stats?.totalEarnings || 0}`} icon={<FaWallet />} color="bg-purple-500 text-white" />
        </div>

        {activeRides.length > 0 && (
          <div className="mb-10">
            <h2 className="text-3xl font-black mb-6">Active Rides</h2>
            <div className="space-y-6">
              {activeRides.map((ride) => (
                <div key={ride.id} className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-yellow-400 font-bold text-lg">#{ride.id}</span>
                      <span className={`ml-4 px-3 py-1 rounded-full text-sm font-bold ${getStatusStyle(ride.status)}`}>{ride.status}</span>
                    </div>
                    <span className="text-3xl font-black text-yellow-400">{`₹${ride.fare}`}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-400 mt-1.5"></div>
                      <div>
                        <p className="text-gray-400 text-sm">Pickup</p>
                        <p className="font-semibold">{ride.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-red-400 mt-1" />
                      <div>
                        <p className="text-gray-400 text-sm">Destination</p>
                        <p className="font-semibold">{ride.destination}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-6 text-gray-400">
                    <FaPhoneAlt className="text-yellow-400" />
                    <span>{ride.customer?.fullName} - {ride.customer?.phone}</span>
                  </div>
                  <div className="flex gap-4">
                    {ride.status === "ACCEPTED" && (
                      <button onClick={() => handleStart(ride.id)} className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition-all">
                        <FaPlay /> Start Ride
                      </button>
                    )}
                    {ride.status === "STARTED" && (
                      <button onClick={() => handleComplete(ride.id)} className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold hover:bg-yellow-300 transition-all">
                        <FaFlagCheckered /> Complete Ride
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setTab("pending")} className={`px-6 py-3 rounded-2xl font-bold transition-all ${tab === "pending" ? "bg-yellow-400 text-black" : "bg-zinc-900 text-gray-400 hover:text-white"}`}>
            Pending Rides ({pendingRides.length})
          </button>
          <button onClick={() => setTab("history")} className={`px-6 py-3 rounded-2xl font-bold transition-all ${tab === "history" ? "bg-yellow-400 text-black" : "bg-zinc-900 text-gray-400 hover:text-white"}`}>
            Ride History
          </button>
          <button onClick={loadData} className="ml-auto flex items-center gap-2 text-yellow-400 font-bold hover:text-yellow-300 transition-all">
            <FaSyncAlt /> Refresh
          </button>
        </div>

        {loading && <div className="bg-zinc-950 rounded-3xl p-10 text-center text-gray-400">Loading...</div>}

        {!loading && tab === "pending" && (
          <div className="space-y-6">
            {pendingRides.length === 0 ? (
              <div className="bg-zinc-950 rounded-3xl p-10 text-center">
                <h3 className="text-2xl font-black mb-2">No Pending Rides</h3>
                <p className="text-gray-400">New ride requests will appear here.</p>
              </div>
            ) : (
              pendingRides.map((ride) => (
                <div key={ride.id} className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 hover:border-yellow-400/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-yellow-400 font-bold text-lg">#{ride.id}</span>
                        <span className="text-gray-400">{ride.rideType}</span>
                        <span className="text-2xl font-black text-yellow-400">{`₹${ride.fare}`}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 rounded-full bg-green-400 mt-1.5"></div>
                          <span>{ride.pickup}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <FaMapMarkerAlt className="text-red-400 mt-0.5" />
                          <span>{ride.destination}</span>
                        </div>
                      </div>
                      {ride.distance && <p className="text-gray-400 mt-3 text-sm">{ride.distance} | {ride.duration}</p>}
                      <p className="text-gray-500 text-sm mt-1">{ride.customer?.fullName} - {ride.customer?.phone}</p>
                    </div>
                    <button onClick={() => handleAccept(ride.id)} className="flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all">
                      <FaHandPaper /> Accept Ride
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {!loading && tab === "history" && (
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden">
            {myRides.length === 0 ? (
              <div className="p-10 text-center">
                <h3 className="text-2xl font-black mb-2">No Ride History</h3>
                <p className="text-gray-400">Your completed rides will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-yellow-500/10 text-left">
                      <th className="p-5 text-gray-400 font-semibold">ID</th>
                      <th className="p-5 text-gray-400 font-semibold">Customer</th>
                      <th className="p-5 text-gray-400 font-semibold">Pickup</th>
                      <th className="p-5 text-gray-400 font-semibold">Destination</th>
                      <th className="p-5 text-gray-400 font-semibold">Fare</th>
                      <th className="p-5 text-gray-400 font-semibold">Status</th>
                      <th className="p-5 text-gray-400 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myRides.map((ride) => (
                      <tr key={ride.id} className="border-b border-yellow-500/5 hover:bg-zinc-900/50 transition-all">
                        <td className="p-5 text-yellow-400 font-bold">#{ride.id}</td>
                        <td className="p-5">{ride.customer?.fullName || "-"}</td>
                        <td className="p-5 max-w-[200px] truncate">{ride.pickup}</td>
                        <td className="p-5 max-w-[200px] truncate">{ride.destination}</td>
                        <td className="p-5 font-bold">{`₹${ride.fare}`}</td>
                        <td className="p-5"><span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusStyle(ride.status)}`}>{ride.status}</span></td>
                        <td className="p-5 text-gray-400">{new Date(ride.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DriverDashboard;
