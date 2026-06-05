import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import StatCard from "../../../components/dashboard/card/StatCard";
import QuickActionCard from "../../../components/dashboard/card/QuickActionCard";
import { getDashboardStats } from "../../../services/userService";
import { getCustomerBookings } from "../../../services/bookingService";
import {
  FaCar, FaWallet, FaMapMarkerAlt, FaRoad,
  FaMotorcycle, FaMapMarkedAlt, FaTruck, FaHotel,
  FaHome, FaPlane, FaBoxes, FaBuilding,
  FaBell, FaGift, FaShieldAlt, FaCheckCircle,
} from "react-icons/fa";

function CustomerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentRides, setRecentRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, ridesRes] = await Promise.all([
          getDashboardStats(),
          getCustomerBookings(),
        ]);
        if (statsRes.success) setStats(statsRes.stats);
        if (ridesRes.success) setRecentRides(ridesRes.bookings.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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

  const activeRide = recentRides.find((r) => ["ACCEPTED", "STARTED"].includes(r.status));

  return (
    <DashboardLayout>
      <div>
        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border border-yellow-500/10 rounded-3xl p-8 mb-10 flex items-center gap-6">
          {user?.profilePhoto ? (
            <img src={user.profilePhoto} alt={user.fullName} className="w-20 h-20 rounded-2xl object-cover border-2 border-yellow-400 flex-shrink-0" />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-yellow-400 flex items-center justify-center text-black font-black text-3xl flex-shrink-0">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
          <div>
            <h1 className="text-4xl font-black mb-1">Welcome Back, {user?.fullName?.split(" ")[0] || "User"}</h1>
            <p className="text-gray-300 text-sm">Manage rides, deliveries, bookings, wallet and payments.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          <StatCard title="Total Rides" value={stats?.total || 0} icon={<FaCar />} color="bg-yellow-400 text-black" />
          <StatCard title="Active Rides" value={stats?.active || 0} icon={<FaRoad />} color="bg-green-500 text-white" />
          <StatCard title="Wallet Balance" value={`₹${stats?.walletBalance || 0}`} icon={<FaWallet />} color="bg-blue-500 text-white" />
          <StatCard title="Completed" value={stats?.completed || 0} icon={<FaCheckCircle />} color="bg-purple-500 text-white" />
        </div>

        {activeRide && (
          <div className="mt-10 bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 relative">
            <div className="absolute top-6 right-6 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Live Ride
            </div>
            <h2 className="text-3xl font-black mb-6">Active Ride</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Pickup</p>
                <p className="font-bold text-lg">{activeRide.pickup}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Destination</p>
                <p className="font-bold text-lg">{activeRide.destination}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusStyle(activeRide.status)}`}>{activeRide.status}</span>
              <span className="text-yellow-400 font-black text-2xl">{`₹${activeRide.fare}`}</span>
              {activeRide.driver && <span className="text-gray-400">Driver: {activeRide.driver.fullName}</span>}
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-4xl font-black mb-3">Quick Actions</h2>
          <p className="text-gray-400 mb-8">Access all BearRide services instantly.</p>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            <QuickActionCard title="Book Ride" subtitle="Bike, Auto and Cab" icon={<FaMotorcycle />} color="bg-yellow-400 text-black" path="/booking" />
            <QuickActionCard title="Track Ride" subtitle="Live tracking" icon={<FaMapMarkedAlt />} color="bg-green-500 text-white" path="/tracking" />
            <QuickActionCard title="Wallet" subtitle="Manage payments" icon={<FaWallet />} color="bg-blue-500 text-white" path="/wallet" />
            <QuickActionCard title="Parcel" subtitle="Fast delivery" icon={<FaBoxes />} color="bg-purple-500 text-white" path="/parcel" />
            <QuickActionCard title="Hotels" subtitle="Book hotels" icon={<FaHotel />} color="bg-pink-500 text-white" path="/hotels" />
            <QuickActionCard title="Villas" subtitle="Luxury stays" icon={<FaHome />} color="bg-indigo-500 text-white" path="/villas" />
            <QuickActionCard title="Airport Lounge" subtitle="Travel comfort" icon={<FaPlane />} color="bg-cyan-500 text-white" path="/lounge" />
            <QuickActionCard title="Truck Booking" subtitle="Goods transport" icon={<FaTruck />} color="bg-orange-500 text-white" path="/truck-booking" />
            <QuickActionCard title="Enterprise" subtitle="Business rides" icon={<FaBuilding />} color="bg-emerald-500 text-white" path="/enterprise-booking" />
            <QuickActionCard title="House Shifting" subtitle="Packers & movers" icon={<FaBoxes />} color="bg-red-500 text-white" path="/house-shifting" />
          </div>
        </div>

        <div className="mt-10 bg-green-500/10 border border-green-500/20 rounded-3xl p-8">
          <h2 className="text-3xl font-black text-green-400 mb-2">50% OFF on Your Next Ride</h2>
          <p className="text-gray-300">Use coupon code: <span className="font-bold text-green-400">BEAR50</span></p>
        </div>

        {recentRides.length > 0 && (
          <div className="mt-10 bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 overflow-hidden">
            <h2 className="text-3xl font-black mb-6">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-yellow-500/10 text-left">
                    <th className="pb-5 text-gray-400 font-semibold">ID</th>
                    <th className="pb-5 text-gray-400 font-semibold">Pickup</th>
                    <th className="pb-5 text-gray-400 font-semibold">Destination</th>
                    <th className="pb-5 text-gray-400 font-semibold">Driver</th>
                    <th className="pb-5 text-gray-400 font-semibold">Fare</th>
                    <th className="pb-5 text-gray-400 font-semibold">Status</th>
                    <th className="pb-5 text-gray-400 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRides.map((ride) => (
                    <tr key={ride.id} className="border-b border-yellow-500/5 hover:bg-zinc-900/50 transition-all">
                      <td className="py-5 font-bold text-yellow-400">#{ride.id}</td>
                      <td className="py-5 max-w-[150px] truncate">{ride.pickup}</td>
                      <td className="py-5 max-w-[150px] truncate">{ride.destination}</td>
                      <td className="py-5">{ride.driver?.fullName || "Unassigned"}</td>
                      <td className="py-5 font-bold">{`₹${ride.fare}`}</td>
                      <td className="py-5"><span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusStyle(ride.status)}`}>{ride.status}</span></td>
                      <td className="py-5 text-gray-400">{new Date(ride.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="grid xl:grid-cols-2 gap-10 mt-10">
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-5">
              <FaGift className="text-4xl text-yellow-400" />
              <h2 className="text-3xl font-black">Rewards</h2>
            </div>
            <h3 className="text-5xl font-black text-yellow-400">{(stats?.completed || 0) * 100}</h3>
            <p className="text-gray-400 mt-2">Points earned</p>
          </div>

          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-5">
              <FaBell className="text-4xl text-blue-400" />
              <h2 className="text-3xl font-black">Notifications</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              {stats?.active > 0 && <li>You have {stats.active} active ride(s)</li>}
              {stats?.completed > 0 && <li>{stats.completed} ride(s) completed successfully</li>}
              <li>Welcome to BearRide Dashboard</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 bg-red-500/10 border border-red-500/20 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-3">
            <FaShieldAlt className="text-4xl text-red-400" />
            <h2 className="text-3xl font-black">Emergency SOS</h2>
          </div>
          <p className="text-gray-300">Share live location instantly and contact emergency support.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CustomerDashboard;
