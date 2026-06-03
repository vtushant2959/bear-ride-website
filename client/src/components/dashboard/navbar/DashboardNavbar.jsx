import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaBell, FaSignOutAlt, FaUser, FaTimes, FaHome, FaCar, FaWallet, FaCog, FaMotorcycle, FaClipboardList, FaChartBar, FaUsers, FaBoxes } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

function DashboardNavbar() {
  const { user, logout } = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);
  const role = user?.role;

  const getMenuItems = () => {
    if (role === "DRIVER") return [
      { icon: <FaHome />, title: "Dashboard", path: "/dashboard/driver" },
      { icon: <FaClipboardList />, title: "Pending Rides", path: "/dashboard/driver/pending" },
      { icon: <FaCar />, title: "My Rides", path: "/dashboard/driver/rides" },
      { icon: <FaWallet />, title: "Earnings", path: "/dashboard/driver/earnings" },
      { icon: <FaUser />, title: "Profile", path: "/dashboard/driver/profile" },
    ];
    if (role === "VENDOR") return [
      { icon: <FaHome />, title: "Dashboard", path: "/dashboard/vendor" },
      { icon: <FaBoxes />, title: "My Fleet", path: "/dashboard/vendor/fleet" },
      { icon: <FaCar />, title: "Bookings", path: "/dashboard/vendor/bookings" },
      { icon: <FaChartBar />, title: "Analytics", path: "/dashboard/vendor/analytics" },
      { icon: <FaUser />, title: "Profile", path: "/dashboard/vendor/profile" },
    ];
    if (role === "ADMIN") return [
      { icon: <FaHome />, title: "Dashboard", path: "/admin" },
      { icon: <FaUsers />, title: "Users", path: "/admin/users" },
      { icon: <FaCar />, title: "Bookings", path: "/admin/bookings" },
      { icon: <FaChartBar />, title: "Analytics", path: "/admin/analytics" },
      { icon: <FaCog />, title: "Settings", path: "/admin/settings" },
    ];
    return [
      { icon: <FaHome />, title: "Dashboard", path: "/dashboard/customer" },
      { icon: <FaMotorcycle />, title: "Book Ride", path: "/booking" },
      { icon: <FaCar />, title: "My Rides", path: "/dashboard/customer/rides" },
      { icon: <FaWallet />, title: "Payments", path: "/dashboard/customer/payments" },
      { icon: <FaUser />, title: "Profile", path: "/dashboard/customer/profile" },
      { icon: <FaCog />, title: "Settings", path: "/dashboard/customer/settings" },
    ];
  };

  return (
    <>
      <div className="h-[80px] bg-zinc-950 border-b border-yellow-500/10 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-yellow-400 text-2xl" onClick={() => setMobileMenu(true)}>
            <FaBars />
          </button>
          <h2 className="text-2xl font-black capitalize">{role?.toLowerCase()} Dashboard</h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-gray-400 hover:text-yellow-400 transition-all text-xl">
            <FaBell />
          </button>
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black text-lg">
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>
      </div>

      {mobileMenu && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileMenu(false)} />
          <div className="absolute left-0 top-0 h-full w-[280px] bg-black border-r border-yellow-500/10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-black gradient-text">BearRide</h1>
                <button className="text-yellow-400 text-xl" onClick={() => setMobileMenu(false)}>
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-2">
                {getMenuItems().map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-400 transition-all"
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <button
              onClick={() => { setMobileMenu(false); logout(); }}
              className="flex items-center justify-center gap-3 bg-red-500/10 text-red-400 border border-red-500/20 py-4 rounded-2xl font-bold"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardNavbar;
