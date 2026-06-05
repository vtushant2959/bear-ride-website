import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import { getDriverBookings } from "../../../services/bookingService";
import { getTransactions } from "../../../services/featureService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { FaWallet, FaStar, FaChartLine, FaCoins } from "react-icons/fa";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-900 border border-yellow-500/20 rounded-xl px-3 py-2 text-sm">
      <p className="text-gray-400">{label}</p>
      <p className="text-yellow-400 font-bold">₹{payload[0]?.value}</p>
    </div>
  );
};

export default function DriverEarnings() {
  const { user }  = useAuth();
  const [bookings, setBookings] = useState([]);
  const [txns,     setTxns]     = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([getDriverBookings(), getTransactions()])
      .then(([b, t]) => { setBookings(b.bookings || []); setTxns(t.transactions || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const completed = bookings.filter((b) => b.status === "COMPLETED");

  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const earnings = completed
      .filter((b) => new Date(b.updatedAt).toDateString() === d.toDateString())
      .reduce((s, b) => s + (b.finalFare || b.fare) * 0.8, 0);
    return { day: d.toLocaleDateString("en-IN", { weekday: "short" }), earnings: Math.round(earnings) };
  });

  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(); d.setMonth(d.getMonth() - (5 - i));
    const m = d.getMonth(); const y = d.getFullYear();
    const earnings = completed
      .filter((b) => { const bd = new Date(b.updatedAt); return bd.getMonth() === m && bd.getFullYear() === y; })
      .reduce((s, b) => s + (b.finalFare || b.fare) * 0.8, 0);
    return { month: d.toLocaleDateString("en-IN", { month: "short" }), earnings: Math.round(earnings) };
  });

  const totalEarnings = completed.reduce((s, b) => s + (b.finalFare || b.fare) * 0.8, 0);
  const todayEarnings = completed
    .filter((b) => new Date(b.updatedAt).toDateString() === new Date().toDateString())
    .reduce((s, b) => s + (b.finalFare || b.fare) * 0.8, 0);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-black mb-8">Earnings & Analytics</h1>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Wallet Balance",   value: `₹${(user?.walletBalance || 0).toFixed(0)}`, icon: <FaWallet />,    color: "bg-yellow-400 text-black" },
            { label: "Total Earnings",   value: `₹${Math.round(totalEarnings)}`,              icon: <FaCoins />,     color: "bg-green-500 text-white" },
            { label: "Today",            value: `₹${Math.round(todayEarnings)}`,              icon: <FaChartLine />, color: "bg-blue-500 text-white" },
            { label: "Avg Rating",       value: user?.averageRating ? `${user.averageRating} ⭐` : "N/A", icon: <FaStar />, color: "bg-purple-500 text-white" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="bg-zinc-950 border border-yellow-500/10 rounded-2xl p-5">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-lg mb-3`}>{icon}</div>
              <p className="text-2xl font-black">{value}</p>
              <p className="text-gray-400 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-6 mb-6">
          <h2 className="text-xl font-black mb-5">This Week</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 12 }} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="earnings" fill="#FACC15" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-6 mb-6">
          <h2 className="text-xl font-black mb-5">Last 6 Months</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="earnings" stroke="#FACC15" strokeWidth={2} dot={{ fill: "#FACC15" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-6">
          <h2 className="text-xl font-black mb-5">Recent Transactions</h2>
          {txns.length === 0 ? (
            <p className="text-gray-500 text-sm">No transactions yet</p>
          ) : (
            <div className="space-y-3">
              {txns.slice(0, 10).map((t) => (
                <div key={t.id} className="flex items-center justify-between bg-black rounded-xl px-4 py-3 border border-yellow-500/10">
                  <div>
                    <p className="font-semibold text-sm">{t.description}</p>
                    <p className="text-gray-500 text-xs">{new Date(t.createdAt).toLocaleDateString("en-IN")}</p>
                  </div>
                  <p className={`font-black ${t.type === "CREDIT" ? "text-green-400" : "text-red-400"}`}>
                    {t.type === "CREDIT" ? "+" : "-"}₹{t.amount}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
