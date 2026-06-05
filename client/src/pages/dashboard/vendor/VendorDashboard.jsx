import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import StatCard from "../../../components/dashboard/card/StatCard";
import { getDashboardStats } from "../../../services/userService";
import {
  FaCar, FaCheckCircle, FaClock, FaWallet,
  FaBuilding, FaTruck, FaUsers, FaChartLine,
  FaMapMarkerAlt, FaIdCard, FaReceipt,
} from "react-icons/fa";

function VendorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => { if (res.success) setStats(res.stats); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500/20 to-blue-500/5 border border-blue-500/20 rounded-3xl p-8 mb-8 flex items-center gap-6">
          {user?.profilePhoto ? (
            <img src={user.profilePhoto} alt={user.fullName} className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-400 flex-shrink-0" />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-black text-3xl flex-shrink-0">
              {user?.fullName?.charAt(0)?.toUpperCase() || "V"}
            </div>
          )}
          <div>
            <h1 className="text-4xl font-black mb-1">Welcome, {user?.fullName?.split(" ")[0]}</h1>
            {user?.businessName && (
              <div className="flex items-center gap-2 text-blue-400 font-bold text-lg">
                <FaBuilding /> {user.businessName}
              </div>
            )}
            <p className="text-gray-400 text-sm mt-1">Manage your fleet, bookings and business analytics.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Bookings" value={stats?.total || 0}          icon={<FaCar />}         color="bg-yellow-400 text-black" />
          <StatCard title="Completed"      value={stats?.completed || 0}      icon={<FaCheckCircle />} color="bg-green-500 text-white" />
          <StatCard title="Active"         value={stats?.active || 0}         icon={<FaClock />}       color="bg-blue-500 text-white" />
          <StatCard title="Revenue"        value={`₹${stats?.totalEarnings || 0}`} icon={<FaWallet />} color="bg-purple-500 text-white" />
        </div>

        {/* Quick action cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: <FaTruck />,    color: "bg-yellow-400 text-black", title: "Fleet Management",  desc: "Register vehicles, track assignments and monitor fleet performance." },
            { icon: <FaUsers />,   color: "bg-green-500 text-white",  title: "Driver Management", desc: "Onboard drivers, track availability and view performance metrics." },
            { icon: <FaChartLine />,color: "bg-blue-500 text-white",  title: "Analytics",         desc: "Detailed reports on rides, revenue, peak hours and efficiency." },
          ].map(({ icon, color, title, desc }) => (
            <div key={title} className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 hover:border-blue-400/30 transition-all">
              <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-2xl mb-5`}>{icon}</div>
              <h3 className="text-xl font-black mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-6">{desc}</p>
            </div>
          ))}
        </div>

        {/* Business profile card */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            <FaBuilding className="text-blue-400" /> Business Profile
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { label: "Business Name",  value: user?.businessName || "Not set",    icon: <FaBuilding /> },
              { label: "Phone",          value: user?.phone,                         icon: <FaBuilding /> },
              { label: "Email",          value: user?.email || "Not set",            icon: <FaBuilding /> },
              { label: "Address",        value: user?.address || "Not set",          icon: <FaMapMarkerAlt /> },
              { label: "GST Number",     value: user?.gstNumber || "Not provided",   icon: <FaIdCard /> },
              { label: "Wallet",         value: `₹${stats?.walletBalance || 0}`,    icon: <FaReceipt /> },
            ].map(({ label, value }) => (
              <div key={label} className="bg-black rounded-2xl px-5 py-4 border border-yellow-500/10">
                <p className="text-gray-500 text-xs mb-1">{label}</p>
                <p className="font-bold text-sm truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default VendorDashboard;
