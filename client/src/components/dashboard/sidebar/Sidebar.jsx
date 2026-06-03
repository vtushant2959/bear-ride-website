import {
  FaHome, FaCar, FaUser, FaWallet, FaCog, FaSignOutAlt,
  FaClipboardList, FaUsers, FaChartBar, FaMotorcycle,
  FaBuilding, FaBoxes,
} from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { useAuth } from "../../../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const role = user?.role;

  const customerMenu = [
    { icon: <FaHome />, title: "Dashboard", path: "/dashboard/customer" },
    { icon: <FaMotorcycle />, title: "Book Ride", path: "/booking" },
    { icon: <FaCar />, title: "My Rides", path: "/dashboard/customer/rides" },
    { icon: <FaWallet />, title: "Payments", path: "/dashboard/customer/payments" },
    { icon: <FaUser />, title: "Profile", path: "/dashboard/customer/profile" },
    { icon: <FaCog />, title: "Settings", path: "/dashboard/customer/settings" },
  ];

  const driverMenu = [
    { icon: <FaHome />, title: "Dashboard", path: "/dashboard/driver" },
    { icon: <FaClipboardList />, title: "Pending Rides", path: "/dashboard/driver/pending" },
    { icon: <FaCar />, title: "My Rides", path: "/dashboard/driver/rides" },
    { icon: <FaWallet />, title: "Earnings", path: "/dashboard/driver/earnings" },
    { icon: <FaUser />, title: "Profile", path: "/dashboard/driver/profile" },
  ];

  const vendorMenu = [
    { icon: <FaHome />, title: "Dashboard", path: "/dashboard/vendor" },
    { icon: <FaBoxes />, title: "My Fleet", path: "/dashboard/vendor/fleet" },
    { icon: <FaCar />, title: "Bookings", path: "/dashboard/vendor/bookings" },
    { icon: <FaChartBar />, title: "Analytics", path: "/dashboard/vendor/analytics" },
    { icon: <FaUser />, title: "Profile", path: "/dashboard/vendor/profile" },
  ];

  const adminMenu = [
    { icon: <FaHome />, title: "Dashboard", path: "/admin" },
    { icon: <FaUsers />, title: "Users", path: "/admin" },
    { icon: <FaCar />, title: "Bookings", path: "/admin" },
    { icon: <FaChartBar />, title: "Analytics", path: "/admin" },
    { icon: <FaCog />, title: "Settings", path: "/admin" },
  ];

  let menu = customerMenu;
  if (role === "DRIVER") menu = driverMenu;
  else if (role === "VENDOR") menu = vendorMenu;
  else if (role === "ADMIN") menu = adminMenu;

  return (
    <aside className="w-[280px] min-h-screen bg-black border-r border-yellow-500/10 p-6 hidden lg:flex flex-col justify-between">
      <div>
        <div className="mb-10">
          <h1 className="text-3xl font-black gradient-text">BearRide</h1>
          <p className="text-gray-500 text-sm mt-1 capitalize">{role?.toLowerCase()} Panel</p>
        </div>

        <div className="space-y-2">
          {menu.map((item) => (
            <SidebarItem key={item.path} icon={item.icon} title={item.title} path={item.path} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-2xl p-4">
          <p className="text-sm text-gray-400">Logged in as</p>
          <p className="font-bold text-yellow-400 truncate">{user?.fullName || "User"}</p>
          <p className="text-xs text-gray-500">{user?.phone}</p>
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center gap-3 w-full bg-red-500/10 text-red-400 border border-red-500/20 py-4 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
