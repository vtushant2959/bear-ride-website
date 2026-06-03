import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import StatCard from "../../components/dashboard/card/StatCard";
import { getAdminStats, getAllUsers, getAllBookings, updateUserRole, toggleUserStatus, deleteUser } from "../../services/adminService";
import toast from "react-hot-toast";
import {
  FaUsers, FaCar, FaCheckCircle, FaClock, FaTimesCircle,
  FaWallet, FaMotorcycle, FaBuilding, FaUserShield,
  FaSyncAlt, FaSearch, FaTrash, FaBan, FaCheck,
} from "react-icons/fa";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [tab, setTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await getAdminStats();
      if (res.success) {
        setStats(res.stats);
        setRecentBookings(res.recentBookings);
        setRecentUsers(res.recentUsers);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (roleFilter) params.role = roleFilter;
      if (userSearch) params.search = userSearch;
      const res = await getAllUsers(params);
      if (res.success) setUsers(res.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadBookings = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter) params.status = statusFilter;
      const res = await getAllBookings(params);
      if (res.success) setBookings(res.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDashboard(); }, []);

  useEffect(() => {
    if (tab === "users") loadUsers();
    if (tab === "bookings") loadBookings();
  }, [tab, roleFilter, statusFilter]);

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole(id, newRole);
      toast.success("Role updated");
      loadUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleUserStatus(id);
      toast.success("Status toggled");
      loadUsers();
    } catch (err) {
      toast.error("Failed to toggle status");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted");
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    }
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

  const getRoleStyle = (role) => {
    const styles = {
      CUSTOMER: "bg-blue-500/20 text-blue-400",
      DRIVER: "bg-green-500/20 text-green-400",
      VENDOR: "bg-purple-500/20 text-purple-400",
      ADMIN: "bg-yellow-500/20 text-yellow-400",
    };
    return styles[role] || "bg-zinc-700 text-white";
  };

  return (
    <DashboardLayout>
      <div>
        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border border-yellow-500/10 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-4 mb-3">
            <FaUserShield className="text-yellow-400 text-4xl" />
            <h1 className="text-5xl font-black">Admin Panel</h1>
          </div>
          <p className="text-gray-300 text-lg">Manage users, bookings, and monitor platform performance.</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {["overview", "users", "bookings"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 rounded-2xl font-bold capitalize transition-all ${
                tab === t ? "bg-yellow-400 text-black" : "bg-zinc-900 text-gray-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
          <button onClick={() => { loadDashboard(); if (tab === "users") loadUsers(); if (tab === "bookings") loadBookings(); }}
            className="ml-auto flex items-center gap-2 text-yellow-400 font-bold hover:text-yellow-300">
            <FaSyncAlt /> Refresh
          </button>
        </div>

        {loading && <div className="bg-zinc-950 rounded-3xl p-10 text-center text-gray-400">Loading...</div>}

        {!loading && tab === "overview" && stats && (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
              <StatCard title="Total Users" value={stats.totalUsers} icon={<FaUsers />} color="bg-yellow-400 text-black" />
              <StatCard title="Customers" value={stats.totalCustomers} icon={<FaUsers />} color="bg-blue-500 text-white" />
              <StatCard title="Drivers" value={stats.totalDrivers} icon={<FaMotorcycle />} color="bg-green-500 text-white" />
              <StatCard title="Vendors" value={stats.totalVendors} icon={<FaBuilding />} color="bg-purple-500 text-white" />
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">
              <StatCard title="Total Bookings" value={stats.totalBookings} icon={<FaCar />} color="bg-yellow-400 text-black" />
              <StatCard title="Pending" value={stats.pendingBookings} icon={<FaClock />} color="bg-orange-500 text-white" />
              <StatCard title="Active" value={stats.activeBookings} icon={<FaCar />} color="bg-blue-500 text-white" />
              <StatCard title="Completed" value={stats.completedBookings} icon={<FaCheckCircle />} color="bg-green-500 text-white" />
              <StatCard title="Cancelled" value={stats.cancelledBookings} icon={<FaTimesCircle />} color="bg-red-500 text-white" />
            </div>

            <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-10">
              <div className="flex items-center gap-3 mb-2">
                <FaWallet className="text-yellow-400 text-3xl" />
                <h2 className="text-3xl font-black">Total Revenue</h2>
              </div>
              <h3 className="text-6xl font-black text-yellow-400 mt-4">{`₹${stats.totalRevenue.toLocaleString()}`}</h3>
              <p className="text-gray-400 mt-2">From {stats.completedBookings} completed rides</p>
            </div>

            <div className="grid xl:grid-cols-2 gap-10">
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 overflow-hidden">
                <h2 className="text-2xl font-black mb-6">Recent Users</h2>
                <div className="space-y-4">
                  {recentUsers.map((u) => (
                    <div key={u.id} className="flex items-center justify-between p-4 bg-black rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black">
                          {u.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold">{u.fullName}</p>
                          <p className="text-gray-500 text-sm">{u.phone}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleStyle(u.role)}`}>{u.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 overflow-hidden">
                <h2 className="text-2xl font-black mb-6">Recent Bookings</h2>
                <div className="space-y-4">
                  {recentBookings.map((b) => (
                    <div key={b.id} className="flex items-center justify-between p-4 bg-black rounded-2xl">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-yellow-400 font-bold">#{b.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStatusStyle(b.status)}`}>{b.status}</span>
                        </div>
                        <p className="text-gray-400 text-sm truncate max-w-[250px]">{b.pickup} → {b.destination}</p>
                      </div>
                      <span className="text-yellow-400 font-black text-lg">{`₹${b.fare}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {!loading && tab === "users" && (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && loadUsers()}
                  placeholder="Search by name, phone or email..."
                  className="w-full bg-zinc-950 border border-yellow-500/10 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-yellow-400"
                />
              </div>
              <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-zinc-950 border border-yellow-500/10 rounded-2xl px-5 py-4 outline-none text-white">
                <option value="">All Roles</option>
                <option value="CUSTOMER">Customer</option>
                <option value="DRIVER">Driver</option>
                <option value="VENDOR">Vendor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-yellow-500/10 text-left">
                      <th className="p-5 text-gray-400 font-semibold">ID</th>
                      <th className="p-5 text-gray-400 font-semibold">Name</th>
                      <th className="p-5 text-gray-400 font-semibold">Phone</th>
                      <th className="p-5 text-gray-400 font-semibold">Role</th>
                      <th className="p-5 text-gray-400 font-semibold">Status</th>
                      <th className="p-5 text-gray-400 font-semibold">Bookings</th>
                      <th className="p-5 text-gray-400 font-semibold">Joined</th>
                      <th className="p-5 text-gray-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-yellow-500/5 hover:bg-zinc-900/50 transition-all">
                        <td className="p-5 text-yellow-400 font-bold">#{u.id}</td>
                        <td className="p-5">
                          <p className="font-bold">{u.fullName}</p>
                          <p className="text-gray-500 text-sm">{u.email || "-"}</p>
                        </td>
                        <td className="p-5">{u.phone}</td>
                        <td className="p-5">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="bg-black border border-yellow-500/20 rounded-xl px-3 py-2 text-sm outline-none"
                          >
                            <option value="CUSTOMER">Customer</option>
                            <option value="DRIVER">Driver</option>
                            <option value="VENDOR">Vendor</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </td>
                        <td className="p-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                            {u.isActive ? "Active" : "Blocked"}
                          </span>
                        </td>
                        <td className="p-5">{u._count?.customerBookings || u._count?.driverBookings || 0}</td>
                        <td className="p-5 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td className="p-5">
                          <div className="flex gap-2">
                            <button onClick={() => handleToggleStatus(u.id)} title={u.isActive ? "Block" : "Unblock"}
                              className={`p-2 rounded-lg transition-all ${u.isActive ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/40" : "bg-green-500/20 text-green-400 hover:bg-green-500/40"}`}>
                              {u.isActive ? <FaBan /> : <FaCheck />}
                            </button>
                            <button onClick={() => handleDeleteUser(u.id)} title="Delete"
                              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {users.length === 0 && <div className="p-10 text-center text-gray-400">No users found</div>}
            </div>
          </>
        )}

        {!loading && tab === "bookings" && (
          <>
            <div className="flex gap-4 mb-8">
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

            <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
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
                        <td className="p-5"><span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(b.status)}`}>{b.status}</span></td>
                        <td className="p-5 text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {bookings.length === 0 && <div className="p-10 text-center text-gray-400">No bookings found</div>}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
