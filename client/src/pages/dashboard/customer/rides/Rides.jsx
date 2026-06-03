import { useEffect, useState } from "react";
import DashboardLayout from "../../../../components/dashboard/layout/DashboardLayout";
import { getCustomerBookings, cancelBooking } from "../../../../services/bookingService";
import toast from "react-hot-toast";
import {
  FaCar, FaCheckCircle, FaClock, FaTimesCircle, FaSyncAlt, FaBan,
} from "react-icons/fa";

function MyRides() {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await getCustomerBookings();
      if (response.success) {
        setRides(response.bookings);
        setFilteredRides(response.bookings);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load rides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBookings(); }, []);

  useEffect(() => {
    let results = rides;
    if (search) {
      results = results.filter((r) =>
        r.id.toString().includes(search) ||
        r.pickup.toLowerCase().includes(search.toLowerCase()) ||
        r.destination.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      results = results.filter((r) => r.status === statusFilter);
    }
    setFilteredRides(results);
  }, [search, statusFilter, rides]);

  const handleCancel = async (id) => {
    try {
      const res = await cancelBooking(id);
      if (res.success) {
        toast.success("Ride cancelled");
        loadBookings();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel");
    }
  };

  const totalRides = rides.length;
  const completedRides = rides.filter((r) => r.status === "COMPLETED").length;
  const activeRides = rides.filter((r) => ["PENDING", "ACCEPTED", "STARTED"].includes(r.status)).length;
  const cancelledRides = rides.filter((r) => r.status === "CANCELLED").length;

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

  const InfoCard = ({ title, value, icon }) => (
    <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400">{title}</p>
          <h3 className="text-4xl font-black mt-2">{value}</h3>
        </div>
        <div className="text-3xl text-yellow-400">{icon}</div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div>
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-5xl font-black mb-3">My Rides</h1>
            <p className="text-gray-400">Track all your bookings and ride history.</p>
          </div>
          <button onClick={loadBookings} className="flex items-center gap-3 bg-yellow-400 text-black px-6 py-4 rounded-2xl font-bold">
            <FaSyncAlt /> Refresh
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
          <InfoCard title="Total Rides" value={totalRides} icon={<FaCar />} />
          <InfoCard title="Completed" value={completedRides} icon={<FaCheckCircle />} />
          <InfoCard title="Active" value={activeRides} icon={<FaClock />} />
          <InfoCard title="Cancelled" value={cancelledRides} icon={<FaTimesCircle />} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, pickup or destination..."
            className="flex-1 bg-zinc-950 border border-yellow-500/10 rounded-2xl px-6 py-4 outline-none focus:border-yellow-400"
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-950 border border-yellow-500/10 rounded-2xl px-5 py-4 outline-none text-white">
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="STARTED">Started</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {loading && <div className="bg-zinc-950 rounded-3xl p-10 text-center">Loading rides...</div>}

        {!loading && filteredRides.length === 0 && (
          <div className="bg-zinc-950 rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-black mb-3">No Rides Found</h2>
            <p className="text-gray-400">You haven't booked any rides yet.</p>
          </div>
        )}

        {!loading && filteredRides.length > 0 && (
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-yellow-500/10 text-left">
                    <th className="p-5 text-gray-400 font-semibold">ID</th>
                    <th className="p-5 text-gray-400 font-semibold">Pickup</th>
                    <th className="p-5 text-gray-400 font-semibold">Destination</th>
                    <th className="p-5 text-gray-400 font-semibold">Type</th>
                    <th className="p-5 text-gray-400 font-semibold">Driver</th>
                    <th className="p-5 text-gray-400 font-semibold">Fare</th>
                    <th className="p-5 text-gray-400 font-semibold">Status</th>
                    <th className="p-5 text-gray-400 font-semibold">Date</th>
                    <th className="p-5 text-gray-400 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRides.map((ride) => (
                    <tr key={ride.id} className="border-b border-yellow-500/5 hover:bg-zinc-900/50 transition-all">
                      <td className="p-5 font-bold text-yellow-400">#{ride.id}</td>
                      <td className="p-5 max-w-[150px] truncate">{ride.pickup}</td>
                      <td className="p-5 max-w-[150px] truncate">{ride.destination}</td>
                      <td className="p-5">{ride.rideType}</td>
                      <td className="p-5">{ride.driver?.fullName || "Unassigned"}</td>
                      <td className="p-5 font-bold">{`₹${ride.fare}`}</td>
                      <td className="p-5"><span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusStyle(ride.status)}`}>{ride.status}</span></td>
                      <td className="p-5 text-gray-400">{new Date(ride.createdAt).toLocaleDateString()}</td>
                      <td className="p-5">
                        {["PENDING", "ACCEPTED"].includes(ride.status) && (
                          <button onClick={() => handleCancel(ride.id)} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-bold">
                            <FaBan /> Cancel
                          </button>
                        )}
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

export default MyRides;
