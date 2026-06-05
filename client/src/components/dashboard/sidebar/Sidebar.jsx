import {
  FaHome, FaCar, FaUser, FaWallet, FaCog, FaSignOutAlt,
  FaClipboardList, FaUsers, FaChartBar, FaMotorcycle,
  FaBuilding, FaBoxes, FaExchangeAlt, FaPlusCircle,
} from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ALL_ROLES = ["CUSTOMER", "DRIVER", "VENDOR"];

const ROLE_ICONS = {
  CUSTOMER: <FaUser className="text-yellow-400" />,
  DRIVER:   <FaMotorcycle className="text-green-400" />,
  VENDOR:   <FaBuilding className="text-blue-400" />,
};

function Sidebar() {
  const { user, activeRole, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const roles = Array.isArray(user?.roles) ? user.roles : [user?.role || "CUSTOMER"];

  const customerMenu = [
    { icon: <FaHome />,       title: "Dashboard",  path: "/dashboard/customer" },
    { icon: <FaMotorcycle />, title: "Book Ride",  path: "/booking" },
    { icon: <FaCar />,        title: "My Rides",   path: "/dashboard/customer/rides" },
    { icon: <FaWallet />,     title: "Payments",   path: "/dashboard/customer/payments" },
    { icon: <FaUser />,       title: "Profile",    path: "/dashboard/customer/profile" },
    { icon: <FaCog />,        title: "Settings",   path: "/dashboard/customer/settings" },
  ];

  const driverMenu = [
    { icon: <FaHome />,          title: "Dashboard",     path: "/dashboard/driver" },
    { icon: <FaClipboardList />, title: "Pending Rides", path: "/dashboard/driver/pending" },
    { icon: <FaCar />,           title: "My Rides",      path: "/dashboard/driver/rides" },
    { icon: <FaWallet />,        title: "Earnings",      path: "/dashboard/driver/earnings" },
    { icon: <FaUser />,          title: "Profile",       path: "/dashboard/driver/profile" },
  ];

  const vendorMenu = [
    { icon: <FaHome />,    title: "Dashboard", path: "/dashboard/vendor" },
    { icon: <FaBoxes />,   title: "My Fleet",  path: "/dashboard/vendor/fleet" },
    { icon: <FaCar />,     title: "Bookings",  path: "/dashboard/vendor/bookings" },
    { icon: <FaChartBar />,title: "Analytics", path: "/dashboard/vendor/analytics" },
    { icon: <FaUser />,    title: "Profile",   path: "/dashboard/vendor/profile" },
  ];

  const adminMenu = [
    { icon: <FaHome />,    title: "Dashboard", path: "/admin" },
    { icon: <FaUsers />,   title: "Users",     path: "/admin" },
    { icon: <FaCar />,     title: "Bookings",  path: "/admin" },
    { icon: <FaChartBar />,title: "Analytics", path: "/admin" },
    { icon: <FaCog />,     title: "Settings",  path: "/admin" },
  ];

  let menu = customerMenu;
  if (activeRole === "DRIVER") menu = driverMenu;
  else if (activeRole === "VENDOR") menu = vendorMenu;
  else if (activeRole === "ADMIN")  menu = adminMenu;

  const missingRoles = ALL_ROLES.filter((r) => !roles.includes(r));

  const handleSwitch = (role) => {
    const dest = { CUSTOMER: "/dashboard/customer", DRIVER: "/dashboard/driver", VENDOR: "/dashboard/vendor" };
    switchRole(role);
    navigate(dest[role] || "/dashboard/customer");
  };

  return (
    <aside className="w-[280px] min-h-screen bg-black border-r border-yellow-500/10 p-6 hidden lg:flex flex-col justify-between">
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-black gradient-text">BearRide</h1>
          <p className="text-gray-500 text-xs mt-1 capitalize">{activeRole?.toLowerCase()} Panel</p>
        </div>

        <div className="space-y-1">
          {menu.map((item) => (
            <SidebarItem key={item.path} icon={item.icon} title={item.title} path={item.path} />
          ))}
        </div>

        {/* Switch Role */}
        {roles.length > 1 && (
          <div className="mt-6">
            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2 px-3">Switch Role</p>
            <div className="space-y-1">
              {roles.filter((r) => r !== activeRole).map((r) => (
                <button
                  key={r}
                  onClick={() => handleSwitch(r)}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-gray-400 hover:bg-yellow-400/10 hover:text-yellow-400 transition-all text-sm"
                >
                  {ROLE_ICONS[r]}
                  <span className="capitalize font-semibold">{r.toLowerCase()} Panel</span>
                  <FaExchangeAlt className="ml-auto text-xs opacity-50" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add Role */}
        {missingRoles.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2 px-3">Add Role</p>
            <div className="space-y-1">
              {missingRoles.map((r) => (
                <Link
                  key={r}
                  to={`/add-role?role=${r}`}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-gray-500 hover:bg-green-400/10 hover:text-green-400 transition-all text-sm"
                >
                  <FaPlusCircle className="text-green-400/60" />
                  <span className="capitalize font-semibold">Become a {r.toLowerCase()}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {/* User card */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-2xl p-4 flex items-center gap-3">
          {user?.profilePhoto ? (
            <img src={user.profilePhoto} alt={user.fullName} className="w-11 h-11 rounded-full object-cover border-2 border-yellow-400 flex-shrink-0" />
          ) : (
            <div className="w-11 h-11 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black flex-shrink-0">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-bold text-yellow-400 truncate text-sm">{user?.fullName || "User"}</p>
            <p className="text-xs text-gray-500 capitalize">{activeRole?.toLowerCase()}</p>
          </div>
        </div>

        {/* Role picker shortcut */}
        {roles.length > 1 && (
          <Link
            to="/role-picker"
            className="flex items-center justify-center gap-2 w-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 py-3 rounded-2xl font-bold text-sm hover:bg-yellow-400/20 transition-all"
          >
            <FaExchangeAlt /> All Roles
          </Link>
        )}

        <button
          onClick={logout}
          className="flex items-center justify-center gap-3 w-full bg-red-500/10 text-red-400 border border-red-500/20 py-4 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
