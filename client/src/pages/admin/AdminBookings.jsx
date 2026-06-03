import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import { getAllBookings } from "../../services/adminService";
import { FaSyncAlt } from "react-icons/fa";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const loadBookings = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter) params.status = statusFilter;
      const res = await getAllBookings(params);
      if (res.success) setBookings(res.bookings);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadBookings(); }, [statusFilter]);

  const getStatusStyle = (s) => ({
    PENDING: "bg-yellow-500/20 text-yellow-400", ACCEPTED: "bg-blue-500/20 text-blue-400",
    STARTED: "bg-green-500/20 text-green-400", COMPLETED: "bg-emerald-500/20 text-emerald-400",
    CANCELLED: "bg-red-500/20 text-red-400",
  }[s] || "bg-zinc-700 text-white");

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-black mb-3">All Bookings</h1>
            <p className="text-gray-400">View and manage all platform bookings.</p>
          </div>
          <button onClick={loadBookings} className="flex items-center gap-3 bg-yellow-400 text-black px-6 py-4 rounded-2xl font-bold">
            <FaSyncAlt /> Refresh
          </button>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {["", "PENDING", "ACCEPTED", "STARTED", "COMPLETED", "CANCELLED"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-5 py-2 rounded-xl font-bold transition-all ${statusFilter === s ? "bg-yellow-400 text-black" : "bg-zinc-900 text-gray-400"}`}>
              {s || "All"}
            </button>
          ))}
        </div>

        {loading ? <div className="bg-zinc-950 rounded-3xl p-10 text-center text-gray-400">Loading...</div> : (
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="border-b border-yellow-500/10 text-left">
                    <th className="p-5 text-gray-400 font-semibold">ID</th>
                    <th className="p-5 text-gray-400 font-semibold">Customer</th>
                    <th className="p-5 text-gray-400 font-semibold">Driver</th>
                    <th className="p-5 text-gray-400 font-semibold">Pickup</th>
                    <th className="p-5 text-gray-400 font-semibold">Destination</th>
                    <th className="p-5 text-gray-400 font-semibold">Type</th>
                    <th className="p-5 text-gray-400 font-semibold">Fare</th>
                    <th className="p-5 text-gray-400 font-semibold">Status</th>
                    <th className="p-5 text-gray-400 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-yellow-500/5 hover:bg-zinc-900/50 transition-all">
                      <td className="p-5 text-yellow-400 font-bold">#{b.id}</td>
                      <td className="p-5">{b.customer?.fullName || "-"}<br /><span className="text-gray-500 text-sm">{b.customer?.phone}</span></td>
                      <td className="p-5">{b.driver?.fullName || <span className="text-gray-500">Unassigned</span>}</td>
                      <td className="p-5 max-w-[150px] truncate">{b.pickup}</td>
                      <td className="p-5 max-w-[150px] truncate">{b.destination}</td>
                      <td className="p-5">{b.rideType}</td>
                      <td className="p-5 font-bold">{`₹${b.fare}`}</td>
                      <td className="p-5"><span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusStyle(b.status)}`}>{b.status}</span></td>
                      <td className="p-5 text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {bookings.length === 0 && <div className="p-10 text-center text-gray-400">No bookings found</div>}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AdminBookings;
