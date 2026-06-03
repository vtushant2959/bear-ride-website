import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import StatCard from "../../../components/dashboard/card/StatCard";
import { getDashboardStats } from "../../../services/userService";
import {
  FaCar, FaCheckCircle, FaClock, FaWallet,
  FaBuilding, FaTruck, FaUsers, FaChartLine,
} from "react-icons/fa";

function VendorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getDashboardStats();
        if (res.success) setStats(res.stats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border border-yellow-500/10 rounded-3xl p-8 mb-10">
          <h1 className="text-5xl font-black mb-3">Welcome, {user?.fullName?.split(" ")[0]}</h1>
          <p className="text-gray-300 text-lg">Manage your fleet, bookings and analytics.</p>
          {user?.businessName && (
            <div className="mt-4 flex items-center gap-3">
              <FaBuilding className="text-yellow-400" />
              <span className="text-yellow-400 font-bold">{user.businessName}</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Bookings" value={stats?.total || 0} icon={<FaCar />} color="bg-yellow-400 text-black" />
          <StatCard title="Completed" value={stats?.completed || 0} icon={<FaCheckCircle />} color="bg-green-500 text-white" />
          <StatCard title="Active" value={stats?.active || 0} icon={<FaClock />} color="bg-blue-500 text-white" />
          <StatCard title="Revenue" value={`₹${stats?.totalEarnings || 0}`} icon={<FaWallet />} color="bg-purple-500 text-white" />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 hover:border-yellow-400/30 transition-all">
            <div className="bg-yellow-400 text-black w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6">
              <FaTruck />
            </div>
            <h3 className="text-2xl font-black mb-3">Fleet Management</h3>
            <p className="text-gray-400 leading-7">Register and manage your vehicles, track driver assignments, and monitor fleet performance.</p>
          </div>

          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 hover:border-yellow-400/30 transition-all">
            <div className="bg-green-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6">
              <FaUsers />
            </div>
            <h3 className="text-2xl font-black mb-3">Driver Management</h3>
            <p className="text-gray-400 leading-7">Onboard new drivers, track their availability and performance metrics in real-time.</p>
          </div>

          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 hover:border-yellow-400/30 transition-all">
            <div className="bg-blue-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6">
              <FaChartLine />
            </div>
            <h3 className="text-2xl font-black mb-3">Analytics</h3>
            <p className="text-gray-400 leading-7">View detailed analytics on rides, revenue, peak hours and driver efficiency.</p>
          </div>
        </div>

        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
          <h2 className="text-3xl font-black mb-6">Business Profile</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Business Name</p>
              <p className="text-lg font-bold">{user?.businessName || "Not set"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Business Type</p>
              <p className="text-lg font-bold">{user?.businessType || "Not set"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Contact</p>
              <p className="text-lg font-bold">{user?.phone}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <p className="text-lg font-bold">{user?.email || "Not set"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Wallet Balance</p>
              <p className="text-lg font-bold text-yellow-400">{`₹${stats?.walletBalance || 0}`}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Member Since</p>
              <p className="text-lg font-bold">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default VendorDashboard;
