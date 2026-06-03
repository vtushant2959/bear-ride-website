import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  getAdminStats, getAllUsers, getAllBookings,
  updateUserRole, toggleUserStatus, deleteUser,
} from "../../services/adminService";
import toast from "react-hot-toast";
import {
  FaUsers, FaCar, FaCheckCircle, FaClock, FaTimesCircle, FaWallet,
  FaMotorcycle, FaBuilding, FaUserShield, FaSyncAlt, FaSearch,
  FaTrash, FaBan, FaCheck, FaChartLine, FaCog, FaEye, FaTimes,
  FaRupeeSign, FaArrowUp, FaArrowDown, FaExclamationTriangle,
} from "react-icons/fa";

/* ═══════════════════════════════════════
   MOCK DATA — used when backend is offline
═══════════════════════════════════════ */
const MOCK_STATS = {
  totalUsers: 1247, totalCustomers: 1089, totalDrivers: 134, totalVendors: 24,
  totalBookings: 8432, pendingBookings: 47, activeBookings: 23,
  completedBookings: 7891, cancelledBookings: 471, totalRevenue: 482350,
};
const MOCK_RECENT_USERS = [
  { id: 1, fullName: "Rahul Sharma",   phone: "+917819092959", role: "CUSTOMER", isActive: true,  createdAt: "2026-05-28" },
  { id: 2, fullName: "Priya Mehta",    phone: "+919876543210", role: "DRIVER",   isActive: true,  createdAt: "2026-05-27" },
  { id: 3, fullName: "Aman Verma",     phone: "+919988776655", role: "CUSTOMER", isActive: true,  createdAt: "2026-05-27" },
  { id: 4, fullName: "Sneha Kapoor",   phone: "+917766554433", role: "VENDOR",   isActive: false, createdAt: "2026-05-26" },
  { id: 5, fullName: "Vikram Singh",   phone: "+916655443322", role: "DRIVER",   isActive: true,  createdAt: "2026-05-25" },
];
const MOCK_RECENT_BOOKINGS = [
  { id: 1042, pickup: "Connaught Place", destination: "Noida Sector 62",  fare: 342, status: "COMPLETED", rideType: "CAB",  customer: { fullName: "Rahul Sharma" }, driver: { fullName: "Priya Mehta" }, createdAt: "2026-05-28" },
  { id: 1041, pickup: "Andheri Metro",   destination: "Bandra Kurla Complex", fare: 148, status: "STARTED",   rideType: "BIKE", customer: { fullName: "Aman Verma"   }, driver: null, createdAt: "2026-05-28" },
  { id: 1040, pickup: "Delhi Airport",   destination: "Cyber City Gurugram",  fare: 690, status: "PENDING",   rideType: "CAB",  customer: { fullName: "Sneha Kapoor" }, driver: null, createdAt: "2026-05-28" },
  { id: 1039, pickup: "Lajpat Nagar",    destination: "Saket",                fare: 89,  status: "COMPLETED", rideType: "AUTO", customer: { fullName: "Vikram Singh" }, driver: { fullName: "Ravi Kumar" }, createdAt: "2026-05-27" },
  { id: 1038, pickup: "Dwarka Sector 12",destination: "Rajouri Garden",       fare: 127, status: "CANCELLED", rideType: "BIKE", customer: { fullName: "Anjali Nair"  }, driver: null, createdAt: "2026-05-27" },
];
const CHART_RIDES = [
  { day: "Mon", rides: 312, revenue: 38200 },
  { day: "Tue", rides: 287, revenue: 34100 },
  { day: "Wed", rides: 398, revenue: 51300 },
  { day: "Thu", rides: 421, revenue: 56700 },
  { day: "Fri", rides: 512, revenue: 69400 },
  { day: "Sat", rides: 634, revenue: 87200 },
  { day: "Sun", rides: 589, revenue: 78600 },
];
const CHART_VEHICLE = [
  { type: "BearBike", bookings: 4120, revenue: 124800, color: "#facc15" },
  { type: "BearAuto", bookings: 2341, revenue: 187600, color: "#22c55e" },
  { type: "BearCab",  bookings: 1971, revenue: 169950, color: "#3b82f6" },
];
const CHART_STATUS = [
  { name: "Completed", value: 7891, color: "#10b981" },
  { name: "Pending",   value: 47,   color: "#facc15" },
  { name: "Active",    value: 23,   color: "#3b82f6" },
  { name: "Cancelled", value: 471,  color: "#ef4444" },
];
const MOCK_DRIVERS = [
  { id: 2,  fullName: "Priya Mehta",   phone: "+919876543210", vehicleType: "Bike", vehicleNumber: "DL01AB1234", rating: 4.98, rides: 312, earnings: 43200, isActive: true },
  { id: 5,  fullName: "Vikram Singh",  phone: "+916655443322", vehicleType: "Car",  vehicleNumber: "HR26CD5678", rating: 4.95, rides: 287, earnings: 67800, isActive: true },
  { id: 8,  fullName: "Ravi Kumar",    phone: "+919123456789", vehicleType: "Auto", vehicleNumber: "UP15EF9012", rating: 4.92, rides: 198, earnings: 38400, isActive: true },
  { id: 11, fullName: "Suresh Yadav",  phone: "+918765432109", vehicleType: "Car",  vehicleNumber: "MH04GH3456", rating: 4.87, rides: 156, earnings: 42100, isActive: false },
  { id: 14, fullName: "Arjun Patel",   phone: "+917654321098", vehicleType: "Bike", vehicleNumber: "GJ01IJ7890", rating: 4.90, rides: 234, earnings: 28900, isActive: true },
];

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */
const STATUS_STYLE = {
  PENDING:   "bg-yellow-500/20 text-yellow-400",
  ACCEPTED:  "bg-blue-500/20 text-blue-400",
  STARTED:   "bg-green-500/20 text-green-400",
  COMPLETED: "bg-emerald-500/20 text-emerald-400",
  CANCELLED: "bg-red-500/20 text-red-400",
};
const ROLE_STYLE = {
  CUSTOMER: "bg-blue-500/20 text-blue-400",
  DRIVER:   "bg-green-500/20 text-green-400",
  VENDOR:   "bg-purple-500/20 text-purple-400",
  ADMIN:    "bg-yellow-500/20 text-yellow-400",
};
const ss = (s) => STATUS_STYLE[s] || "bg-zinc-700 text-white";
const rs = (r) => ROLE_STYLE[r]   || "bg-zinc-700 text-white";

/* ─── Confirm Dialog ─── */
function Confirm({ message, onYes, onNo }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onNo} />
      <div className="relative bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 max-w-sm w-full text-center">
        <FaExclamationTriangle className="text-yellow-400 text-4xl mx-auto mb-4" />
        <p className="text-white font-bold text-lg mb-6">{message}</p>
        <div className="flex gap-4">
          <button onClick={onNo}  className="flex-1 bg-zinc-800 py-3 rounded-2xl font-bold hover:bg-zinc-700 transition-all">Cancel</button>
          <button onClick={onYes} className="flex-1 bg-red-500 py-3 rounded-2xl font-bold hover:bg-red-600 transition-all">Confirm</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   STAT MINI CARD
═══════════════════════════════════════ */
function MiniStat({ label, value, sub, color = "text-yellow-400", trend }) {
  return (
    <div className="bg-zinc-950 border border-yellow-500/10 rounded-2xl p-5 hover:border-yellow-400/20 transition-all">
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${trend >= 0 ? "text-green-400" : "text-red-400"}`}>
          {trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
          {Math.abs(trend)}% vs last week
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab]             = useState("overview");
  const [stats, setStats]         = useState(null);
  const [recentUsers, setRU]      = useState([]);
  const [recentBooks, setRB]      = useState([]);
  const [users, setUsers]         = useState([]);
  const [bookings, setBookings]   = useState([]);
  const [drivers, setDrivers]     = useState(MOCK_DRIVERS);
  const [loading, setLoading]     = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  /* search / filter state */
  const [uSearch, setUS]          = useState("");
  const [uRole, setUR]            = useState("");
  const [bStatus, setBS]          = useState("");

  /* confirm dialog */
  const [confirm, setConfirm]     = useState(null);

  /* ── Load overview ── */
  const loadOverview = async () => {
    setLoading(true);
    try {
      const res = await getAdminStats();
      if (res.success) {
        setStats(res.stats);
        setRU(res.recentUsers || []);
        setRB(res.recentBookings || []);
        setIsOffline(false);
      }
    } catch {
      setStats(MOCK_STATS);
      setRU(MOCK_RECENT_USERS);
      setRB(MOCK_RECENT_BOOKINGS);
      setIsOffline(true);
    } finally { setLoading(false); }
  };

  /* ── Load users ── */
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers({ role: uRole || undefined, search: uSearch || undefined });
      if (res.success) setUsers(res.users);
    } catch {
      setUsers(MOCK_RECENT_USERS);
      setIsOffline(true);
    } finally { setLoading(false); }
  };

  /* ── Load bookings ── */
  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await getAllBookings({ status: bStatus || undefined });
      if (res.success) setBookings(res.bookings);
    } catch {
      setBookings(MOCK_RECENT_BOOKINGS);
      setIsOffline(true);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadOverview(); }, []);
  useEffect(() => { if (tab === "users")    loadUsers();    }, [tab, uRole]);
  useEffect(() => { if (tab === "bookings") loadBookings(); }, [tab, bStatus]);

  /* ── Actions ── */
  const doChangeRole = async (id, role) => {
    try {
      if (!isOffline) await updateUserRole(id, role);
      setUsers(u => u.map(x => x.id === id ? { ...x, role } : x));
      toast.success("Role updated");
    } catch { toast.error("Backend offline — change not saved"); }
  };

  const doToggle = async (id) => {
    try {
      if (!isOffline) await toggleUserStatus(id);
      setUsers(u => u.map(x => x.id === id ? { ...x, isActive: !x.isActive } : x));
      toast.success("Status updated");
    } catch { toast.error("Backend offline — change not saved"); }
  };

  const doDelete = async (id) => {
    setConfirm({
      message: `Are you sure you want to delete user #${id}? This cannot be undone.`,
      onYes: async () => {
        setConfirm(null);
        try {
          if (!isOffline) await deleteUser(id);
          setUsers(u => u.filter(x => x.id !== id));
          toast.success("User deleted");
        } catch { toast.error("Backend offline — deletion not saved"); }
      },
      onNo: () => setConfirm(null),
    });
  };

  /* ── Refresh helper ── */
  const refresh = () => {
    if (tab === "overview") loadOverview();
    if (tab === "users")    loadUsers();
    if (tab === "bookings") loadBookings();
  };

  const TABS = [
    { id: "overview",  label: "Overview",   icon: "📊" },
    { id: "users",     label: "Users",      icon: "👥" },
    { id: "bookings",  label: "Bookings",   icon: "🚗" },
    { id: "drivers",   label: "Drivers",    icon: "🏍️" },
    { id: "analytics", label: "Analytics",  icon: "📈" },
    { id: "settings",  label: "Settings",   icon: "⚙️" },
  ];

  return (
    <DashboardLayout>
      <div className="pb-20">

        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border border-yellow-500/10 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <FaUserShield className="text-yellow-400 text-4xl" />
              <div>
                <h1 className="text-4xl font-black">Admin Panel</h1>
                <p className="text-gray-400 text-sm mt-1">Manage users, bookings and platform performance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isOffline && (
                <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                  Demo Mode (backend offline)
                </div>
              )}
              <button onClick={refresh} className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold hover:scale-105 transition-all text-sm">
                <FaSyncAlt /> Refresh
              </button>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex flex-wrap gap-2 mb-8 bg-zinc-950 border border-yellow-500/10 rounded-2xl p-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                tab === t.id ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.2)]" : "text-gray-400 hover:text-white"
              }`}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="bg-zinc-950 rounded-3xl p-12 text-center">
            <div className="w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading data...</p>
          </div>
        )}

        {/* ══════════════════════════════
            OVERVIEW TAB
        ══════════════════════════════ */}
        {!loading && tab === "overview" && stats && (
          <>
            {/* Top KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <MiniStat label="Total Users"     value={stats.totalUsers.toLocaleString()}    sub={`${stats.totalDrivers} drivers · ${stats.totalVendors} vendors`} trend={12} />
              <MiniStat label="Total Bookings"  value={stats.totalBookings.toLocaleString()} sub={`${stats.activeBookings} active now`}  trend={8}  />
              <MiniStat label="Total Revenue"   value={`₹${(stats.totalRevenue/1000).toFixed(0)}K`} color="text-green-400" sub="from completed rides" trend={15} />
              <MiniStat label="Completion Rate" value={`${((stats.completedBookings/Math.max(stats.totalBookings,1))*100).toFixed(1)}%`} color="text-blue-400" trend={3} />
            </div>

            {/* Second row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <MiniStat label="Pending"   value={stats.pendingBookings}   color="text-yellow-400" />
              <MiniStat label="Active"    value={stats.activeBookings}    color="text-blue-400"   />
              <MiniStat label="Completed" value={stats.completedBookings.toLocaleString()} color="text-emerald-400" />
              <MiniStat label="Cancelled" value={stats.cancelledBookings} color="text-red-400"    />
              <MiniStat label="Customers" value={stats.totalCustomers}    color="text-purple-400" />
            </div>

            {/* Revenue highlight */}
            <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <FaRupeeSign className="text-yellow-400 text-2xl" />
                <h2 className="text-2xl font-black">Total Platform Revenue</h2>
              </div>
              <div className="flex items-end gap-4 mt-3">
                <h3 className="text-6xl font-black text-yellow-400">₹{stats.totalRevenue.toLocaleString()}</h3>
                <div className="mb-2">
                  <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                    <FaArrowUp /> +15.3% vs last month
                  </div>
                  <p className="text-gray-500 text-xs">From {stats.completedBookings.toLocaleString()} completed rides</p>
                </div>
              </div>
            </div>

            {/* Recent activity grid */}
            <div className="grid xl:grid-cols-2 gap-6">
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
                <h2 className="text-xl font-black mb-5">Recent Users</h2>
                <div className="space-y-3">
                  {recentUsers.map((u, i) => (
                    <div key={u.id ?? i} className="flex items-center justify-between p-4 bg-black rounded-2xl hover:bg-zinc-900 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black">
                          {u.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{u.fullName}</p>
                          <p className="text-gray-500 text-xs">{u.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${rs(u.role)}`}>{u.role}</span>
                        <span className={`w-2 h-2 rounded-full ${u.isActive ? "bg-green-400" : "bg-red-400"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
                <h2 className="text-xl font-black mb-5">Recent Bookings</h2>
                <div className="space-y-3">
                  {recentBooks.map((b, i) => (
                    <div key={b.id ?? i} className="flex items-center justify-between p-4 bg-black rounded-2xl hover:bg-zinc-900 transition-all">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-yellow-400 font-bold text-xs">#{b.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${ss(b.status)}`}>{b.status}</span>
                          <span className="text-gray-500 text-xs">{b.rideType}</span>
                        </div>
                        <p className="text-gray-400 text-xs truncate max-w-[220px]">{b.pickup} → {b.destination}</p>
                        <p className="text-gray-600 text-xs mt-0.5">{b.customer?.fullName}</p>
                      </div>
                      <span className="text-yellow-400 font-black text-lg">₹{b.fare}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════
            USERS TAB
        ══════════════════════════════ */}
        {!loading && tab === "users" && (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  value={uSearch}
                  onChange={(e) => setUS(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && loadUsers()}
                  placeholder="Search by name, phone or email..."
                  className="w-full bg-zinc-950 border border-yellow-500/10 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-yellow-400 text-sm"
                />
              </div>
              <select value={uRole} onChange={(e) => setUR(e.target.value)}
                className="bg-zinc-950 border border-yellow-500/10 rounded-2xl px-5 py-4 outline-none text-white text-sm">
                <option value="">All Roles</option>
                <option value="CUSTOMER">Customer</option>
                <option value="DRIVER">Driver</option>
                <option value="VENDOR">Vendor</option>
                <option value="ADMIN">Admin</option>
              </select>
              <button onClick={loadUsers} className="bg-yellow-400 text-black px-5 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-all flex items-center gap-2">
                <FaSearch /> Search
              </button>
            </div>

            <div className="mb-4 text-gray-400 text-sm">{users.length} user(s) found</div>

            <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-yellow-500/10 text-left bg-black">
                      <th className="p-4 text-gray-400 font-semibold text-sm">User</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Phone</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Role</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Status</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Joined</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-yellow-500/5 hover:bg-zinc-900/50 transition-all">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black text-sm flex-shrink-0">
                              {u.fullName?.charAt(0)?.toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-sm">{u.fullName}</p>
                              <p className="text-gray-500 text-xs">{u.email || "No email"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{u.phone}</td>
                        <td className="p-4">
                          <select
                            value={u.role}
                            onChange={(e) => doChangeRole(u.id, e.target.value)}
                            className="bg-black border border-yellow-500/20 rounded-xl px-3 py-2 text-xs outline-none"
                          >
                            <option value="CUSTOMER">Customer</option>
                            <option value="DRIVER">Driver</option>
                            <option value="VENDOR">Vendor</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                            {u.isActive ? "Active" : "Blocked"}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => doToggle(u.id)}
                              title={u.isActive ? "Block user" : "Unblock user"}
                              className={`p-2 rounded-lg transition-all text-sm ${u.isActive ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/40" : "bg-green-500/20 text-green-400 hover:bg-green-500/40"}`}
                            >
                              {u.isActive ? <FaBan /> : <FaCheck />}
                            </button>
                            <button
                              onClick={() => doDelete(u.id)}
                              title="Delete user"
                              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all text-sm"
                            >
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

        {/* ══════════════════════════════
            BOOKINGS TAB
        ══════════════════════════════ */}
        {!loading && tab === "bookings" && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {["", "PENDING", "ACCEPTED", "STARTED", "COMPLETED", "CANCELLED"].map((s) => (
                <button
                  key={s}
                  onClick={() => setBS(s)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${bStatus === s ? "bg-yellow-400 text-black" : "bg-zinc-900 text-gray-400 hover:text-white"}`}
                >
                  {s || "All"}
                </button>
              ))}
            </div>

            <div className="mb-4 text-gray-400 text-sm">{bookings.length} booking(s)</div>

            <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-yellow-500/10 text-left bg-black">
                      <th className="p-4 text-gray-400 font-semibold text-sm">ID</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Customer</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Driver</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Route</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Type</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Fare</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Status</th>
                      <th className="p-4 text-gray-400 font-semibold text-sm">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-b border-yellow-500/5 hover:bg-zinc-900/50 transition-all">
                        <td className="p-4 text-yellow-400 font-bold text-sm">#{b.id}</td>
                        <td className="p-4 text-sm">
                          <p className="font-bold">{b.customer?.fullName || "-"}</p>
                          <p className="text-gray-500 text-xs">{b.customer?.phone}</p>
                        </td>
                        <td className="p-4 text-sm">{b.driver?.fullName || <span className="text-gray-500 text-xs">Unassigned</span>}</td>
                        <td className="p-4 text-sm">
                          <p className="truncate max-w-[140px] text-xs">{b.pickup}</p>
                          <p className="truncate max-w-[140px] text-xs text-gray-500">{b.destination}</p>
                        </td>
                        <td className="p-4 text-sm">{b.rideType}</td>
                        <td className="p-4 font-bold text-sm">₹{b.fare}</td>
                        <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${ss(b.status)}`}>{b.status}</span></td>
                        <td className="p-4 text-gray-400 text-xs">{new Date(b.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {bookings.length === 0 && <div className="p-10 text-center text-gray-400">No bookings found</div>}
            </div>
          </>
        )}

        {/* ══════════════════════════════
            DRIVERS TAB
        ══════════════════════════════ */}
        {!loading && tab === "drivers" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-black mb-1">Driver Management</h2>
                <p className="text-gray-400 text-sm">{drivers.length} registered drivers</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">
                  {drivers.filter(d => d.isActive).length} Online
                </span>
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-bold">
                  {drivers.filter(d => !d.isActive).length} Offline
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {drivers.map((d) => (
                <div key={d.id} className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-6 hover:border-yellow-400/20 transition-all">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-black text-xl font-black">
                        {d.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-lg">{d.fullName}</p>
                        <p className="text-gray-400 text-sm">{d.phone}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${d.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {d.isActive ? "Online" : "Offline"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-black rounded-xl p-3">
                      <p className="text-gray-500 text-xs mb-1">Vehicle</p>
                      <p className="font-bold text-sm">{d.vehicleType}</p>
                      <p className="text-gray-400 text-xs">{d.vehicleNumber}</p>
                    </div>
                    <div className="bg-black rounded-xl p-3">
                      <p className="text-gray-500 text-xs mb-1">Rating</p>
                      <p className="font-bold text-yellow-400 text-lg">★ {d.rating}</p>
                    </div>
                    <div className="bg-black rounded-xl p-3">
                      <p className="text-gray-500 text-xs mb-1">Total Rides</p>
                      <p className="font-bold text-sm">{d.rides}</p>
                    </div>
                    <div className="bg-black rounded-xl p-3">
                      <p className="text-gray-500 text-xs mb-1">Earnings</p>
                      <p className="font-bold text-green-400 text-sm">₹{d.earnings.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setDrivers(prev => prev.map(x => x.id === d.id ? { ...x, isActive: !x.isActive } : x))}
                      className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${d.isActive ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30" : "bg-green-500/20 text-green-400 hover:bg-green-500/30"}`}
                    >
                      {d.isActive ? "Suspend" : "Activate"}
                    </button>
                    <button className="flex-1 bg-yellow-400/10 text-yellow-400 py-2 rounded-xl font-bold text-sm hover:bg-yellow-400/20 transition-all flex items-center justify-center gap-2">
                      <FaEye /> View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════
            ANALYTICS TAB
        ══════════════════════════════ */}
        {!loading && tab === "analytics" && (
          <>
            <div className="mb-6 flex items-center gap-3">
              <h2 className="text-3xl font-black">Platform Analytics</h2>
              {isOffline && <span className="text-orange-400 text-xs bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">Demo Data</span>}
            </div>

            {/* Rides over week */}
            <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-6">
              <h3 className="text-xl font-black mb-6">Weekly Ride Volume & Revenue</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={CHART_RIDES}>
                  <defs>
                    <linearGradient id="ridesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#facc15" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#4b5563" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <YAxis stroke="#4b5563" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "#18181b", border: "1px solid rgba(250,204,21,0.2)", borderRadius: 12 }} />
                  <Legend />
                  <Area type="monotone" dataKey="rides"   stroke="#facc15" fill="url(#ridesGrad)" strokeWidth={2} name="Rides" />
                  <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="url(#revGrad)"   strokeWidth={2} name="Revenue (₹)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid xl:grid-cols-2 gap-6 mb-6">
              {/* Vehicle type breakdown */}
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
                <h3 className="text-xl font-black mb-6">Bookings by Vehicle Type</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={CHART_VEHICLE}>
                    <XAxis dataKey="type" stroke="#4b5563" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <YAxis stroke="#4b5563" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#18181b", border: "1px solid rgba(250,204,21,0.2)", borderRadius: 12 }} />
                    <Bar dataKey="bookings" name="Bookings" radius={[6, 6, 0, 0]}>
                      {CHART_VEHICLE.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Status distribution pie */}
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
                <h3 className="text-xl font-black mb-6">Booking Status Distribution</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={CHART_STATUS} cx="50%" cy="50%" outerRadius={90} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {CHART_STATUS.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#18181b", border: "1px solid rgba(250,204,21,0.2)", borderRadius: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue by vehicle */}
            <div className="grid md:grid-cols-3 gap-4">
              {CHART_VEHICLE.map((v) => (
                <div key={v.type} className="bg-zinc-950 border border-yellow-500/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full" style={{ background: v.color }} />
                    <p className="font-black">{v.type}</p>
                  </div>
                  <p className="text-2xl font-black" style={{ color: v.color }}>₹{v.revenue.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm mt-1">{v.bookings.toLocaleString()} bookings</p>
                  <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(v.bookings / 4200 * 100).toFixed(0)}%`, background: v.color }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════
            SETTINGS TAB
        ══════════════════════════════ */}
        {!loading && tab === "settings" && (
          <>
            <h2 className="text-3xl font-black mb-8">Platform Settings</h2>
            <div className="space-y-6">

              {/* Pricing config */}
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
                <h3 className="text-xl font-black mb-6">Ride Pricing (per km)</h3>
                <div className="grid md:grid-cols-3 gap-5">
                  {[["BearBike", "₹10", "#facc15"], ["BearAuto", "₹15", "#22c55e"], ["BearCab", "₹20", "#3b82f6"]].map(([name, price, color]) => (
                    <div key={name} className="bg-black rounded-2xl p-5">
                      <p className="text-gray-400 text-sm mb-2">{name}</p>
                      <input defaultValue={price} className="w-full bg-zinc-900 border border-yellow-500/10 rounded-xl px-4 py-3 outline-none text-white font-bold focus:border-yellow-400 transition-all" />
                    </div>
                  ))}
                </div>
                <button className="mt-5 bg-yellow-400 text-black px-8 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-all">
                  Save Pricing
                </button>
              </div>

              {/* Feature toggles */}
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
                <h3 className="text-xl font-black mb-6">Feature Toggles</h3>
                <div className="space-y-4">
                  {[
                    "Allow new customer registrations",
                    "Allow new driver registrations",
                    "Enable booking (platform-wide)",
                    "Enable parcel delivery",
                    "Show promotional banners",
                    "Email notifications",
                  ].map((item) => (
                    <div key={item} className="flex items-center justify-between py-3 border-b border-yellow-500/5 last:border-0">
                      <span className="text-gray-300 text-sm">{item}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-yellow-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger zone */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
                <h3 className="text-xl font-black text-red-400 mb-6">⚠️ Danger Zone</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">Clear all demo data</p>
                      <p className="text-gray-500 text-sm">Removes all test bookings and users</p>
                    </div>
                    <button onClick={() => toast.error("Not available in demo mode")} className="bg-red-500/20 text-red-400 px-5 py-2 rounded-xl font-bold text-sm hover:bg-red-500/30 transition-all">
                      Clear Data
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">Export all bookings</p>
                      <p className="text-gray-500 text-sm">Download CSV of all booking data</p>
                    </div>
                    <button onClick={() => toast.success("Export started (demo)")} className="bg-yellow-400/10 text-yellow-400 px-5 py-2 rounded-xl font-bold text-sm hover:bg-yellow-400/20 transition-all">
                      Export CSV
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </>
        )}

      </div>

      {/* ── Confirm dialog ── */}
      {confirm && <Confirm message={confirm.message} onYes={confirm.onYes} onNo={confirm.onNo} />}
    </DashboardLayout>
  );
}
