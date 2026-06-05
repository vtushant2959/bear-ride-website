import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars, FaBell, FaSignOutAlt, FaUser, FaTimes,
  FaHome, FaCar, FaWallet, FaCog, FaMotorcycle,
  FaClipboardList, FaChartBar, FaUsers, FaBoxes,
  FaExchangeAlt, FaPlusCircle,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

const ALL_ROLES = ["CUSTOMER", "DRIVER", "VENDOR"];

function DashboardNavbar() {
  const { user, activeRole, switchRole, logout } = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const roles = Array.isArray(user?.roles) ? user.roles : [user?.role || "CUSTOMER"];

  const getMenuItems = () => {
    if (activeRole === "DRIVER") return [
      { icon: <FaHome />,          title: "Dashboard",     path: "/dashboard/driver" },
      { icon: <FaClipboardList />, title: "Pending Rides", path: "/dashboard/driver/pending" },
      { icon: <FaCar />,           title: "My Rides",      path: "/dashboard/driver/rides" },
      { icon: <FaWallet />,        title: "Earnings",      path: "/dashboard/driver/earnings" },
      { icon: <FaUser />,          title: "Profile",       path: "/dashboard/driver/profile" },
    ];
    if (activeRole === "VENDOR") return [
      { icon: <FaHome />,     title: "Dashboard", path: "/dashboard/vendor" },
      { icon: <FaBoxes />,    title: "My Fleet",  path: "/dashboard/vendor/fleet" },
      { icon: <FaCar />,      title: "Bookings",  path: "/dashboard/vendor/bookings" },
      { icon: <FaChartBar />, title: "Analytics", path: "/dashboard/vendor/analytics" },
      { icon: <FaUser />,     title: "Profile",   path: "/dashboard/vendor/profile" },
    ];
    if (activeRole === "ADMIN") return [
      { icon: <FaHome />,     title: "Dashboard", path: "/admin" },
      { icon: <FaUsers />,    title: "Users",     path: "/admin/users" },
      { icon: <FaCar />,      title: "Bookings",  path: "/admin/bookings" },
      { icon: <FaChartBar />, title: "Analytics", path: "/admin/analytics" },
      { icon: <FaCog />,      title: "Settings",  path: "/admin/settings" },
    ];
    return [
      { icon: <FaHome />,       title: "Dashboard", path: "/dashboard/customer" },
      { icon: <FaMotorcycle />, title: "Book Ride", path: "/booking" },
      { icon: <FaCar />,        title: "My Rides",  path: "/dashboard/customer/rides" },
      { icon: <FaWallet />,     title: "Payments",  path: "/dashboard/customer/payments" },
      { icon: <FaUser />,       title: "Profile",   path: "/dashboard/customer/profile" },
      { icon: <FaCog />,        title: "Settings",  path: "/dashboard/customer/settings" },
    ];
  };

  const handleSwitch = (role) => {
    const dest = { CUSTOMER: "/dashboard/customer", DRIVER: "/dashboard/driver", VENDOR: "/dashboard/vendor" };
    switchRole(role);
    setMobileMenu(false);
    navigate(dest[role] || "/dashboard/customer");
  };

  const missingRoles = ALL_ROLES.filter((r) => !roles.includes(r));

  return (
    <>
      <div className="h-[72px] bg-zinc-950 border-b border-yellow-500/10 px-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-yellow-400 text-2xl" onClick={() => setMobileMenu(true)}>
            <FaBars />
          </button>
          <div>
            <h2 className="text-xl font-black capitalize">{activeRole?.toLowerCase()} Dashboard</h2>
            {roles.length > 1 && (
              <p className="text-xs text-gray-500">{roles.length} roles · <Link to="/role-picker" className="text-yellow-400 hover:underline">switch</Link></p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative text-gray-400 hover:text-yellow-400 transition-all text-xl">
            <FaBell />
          </button>
          {user?.profilePhoto ? (
            <img src={user.profilePhoto} alt={user.fullName} className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileMenu(false)} />
          <div className="absolute left-0 top-0 h-full w-[280px] bg-black border-r border-yellow-500/10 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black gradient-text">BearRide</h1>
                <button className="text-yellow-400 text-xl" onClick={() => setMobileMenu(false)}>
                  <FaTimes />
                </button>
              </div>

              {/* User info */}
              <div className="flex items-center gap-3 bg-zinc-900 rounded-2xl p-3 mb-5 border border-yellow-500/10">
                {user?.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.fullName} className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black">
                    {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <p className="text-yellow-400 font-bold text-sm">{user?.fullName}</p>
                  <p className="text-gray-500 text-xs capitalize">{activeRole?.toLowerCase()}</p>
                </div>
              </div>

              {/* Menu items */}
              <div className="space-y-1 mb-5">
                {getMenuItems().map((item) => (
                  <Link
                    key={item.path} to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-400 transition-all text-sm"
                  >
                    <span>{item.icon}</span>{item.title}
                  </Link>
                ))}
              </div>

              {/* Switch role */}
              {roles.length > 1 && (
                <div className="mb-4">
                  <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2 px-2">Switch Role</p>
                  {roles.filter((r) => r !== activeRole).map((r) => (
                    <button
                      key={r} onClick={() => handleSwitch(r)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-gray-400 hover:bg-yellow-400/10 hover:text-yellow-400 transition-all text-sm"
                    >
                      <FaExchangeAlt className="text-yellow-400/60" />
                      <span className="capitalize font-semibold">{r.toLowerCase()} Panel</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Add role */}
              {missingRoles.length > 0 && (
                <div>
                  <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2 px-2">Add Role</p>
                  {missingRoles.map((r) => (
                    <Link
                      key={r} to={`/add-role?role=${r}`}
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-gray-500 hover:bg-green-400/10 hover:text-green-400 transition-all text-sm"
                    >
                      <FaPlusCircle className="text-green-400/60" />
                      <span className="capitalize font-semibold">Become a {r.toLowerCase()}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => { setMobileMenu(false); logout(); }}
              className="flex items-center justify-center gap-3 bg-red-500/10 text-red-400 border border-red-500/20 py-4 rounded-2xl font-bold"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardNavbar;
