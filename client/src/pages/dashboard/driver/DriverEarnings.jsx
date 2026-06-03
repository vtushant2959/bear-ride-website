import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import { getDashboardStats } from "../../../services/userService";
import { getDriverBookings } from "../../../services/bookingService";
import StatCard from "../../../components/dashboard/card/StatCard";
import { FaWallet, FaCheckCircle, FaCar, FaChartLine } from "react-icons/fa";

function DriverEarnings() {
  const [stats, setStats] = useState(null);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, r] = await Promise.all([getDashboardStats(), getDriverBookings()]);
        if (s.success) setStats(s.stats);
        if (r.success) setRides(r.bookings.filter((b) => b.status === "COMPLETED"));
      } catch (e) { console.error(e); }
    };
    load();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3">Earnings</h1>
          <p className="text-gray-400">Track your ride earnings and income summary.</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Earnings" value={`₹${stats?.totalEarnings || 0}`} icon={<FaWallet />} color="bg-yellow-400 text-black" />
          <StatCard title="Completed Rides" value={stats?.completed || 0} icon={<FaCheckCircle />} color="bg-green-500 text-white" />
          <StatCard title="Total Rides" value={stats?.total || 0} icon={<FaCar />} color="bg-blue-500 text-white" />
          <StatCard title="Avg per Ride" value={`₹${stats?.completed ? Math.round(stats.totalEarnings / stats.completed) : 0}`} icon={<FaChartLine />} color="bg-purple-500 text-white" />
        </div>

        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-10">
          <h2 className="text-3xl font-black mb-2">Wallet Balance</h2>
          <h3 className="text-6xl font-black text-yellow-400 mt-4">{`₹${stats?.walletBalance || 0}`}</h3>
        </div>

        {rides.length > 0 && (
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-black">Completed Rides</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-yellow-500/10 text-left">
                    <th className="p-5 text-gray-400 font-semibold">ID</th>
                    <th className="p-5 text-gray-400 font-semibold">Route</th>
                    <th className="p-5 text-gray-400 font-semibold">Fare Earned</th>
                    <th className="p-5 text-gray-400 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rides.map((r) => (
                    <tr key={r.id} className="border-b border-yellow-500/5">
                      <td className="p-5 text-yellow-400 font-bold">#{r.id}</td>
                      <td className="p-5 max-w-[250px] truncate">{r.pickup} → {r.destination}</td>
                      <td className="p-5 font-bold text-green-400">{`₹${r.fare}`}</td>
                      <td className="p-5 text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</td>
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

export default DriverEarnings;
