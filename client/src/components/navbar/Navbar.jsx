import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const getDashboardPath = () => {
    if (!user) return "/login";
    if (user.role === "ADMIN")  return "/admin";
    if (user.role === "DRIVER") return "/dashboard/driver";
    if (user.role === "VENDOR") return "/dashboard/vendor";
    return "/dashboard/customer";
  };

  const getRoleCTA = () => {
    if (!user) return { label: "Book Ride", path: "/booking" };
    if (user.role === "DRIVER") return { label: "Driver Panel", path: "/dashboard/driver" };
    if (user.role === "VENDOR") return { label: "Vendor Panel", path: "/dashboard/vendor" };
    if (user.role === "ADMIN")  return { label: "Admin Panel", path: "/admin" };
    return { label: "Book Ride", path: "/booking" };
  };

  const cta = getRoleCTA();

  return (
    <>
      <nav className="bg-black border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container-main flex justify-between items-center px-5 py-4">

          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="BearRide" className="w-14 h-14 object-contain" />
            <h1 className="text-3xl font-black">
              <span className="text-white">BEAR</span>
              <span className="text-yellow-400">RIDE</span>
            </h1>
          </Link>

          <div className="hidden lg:flex gap-8 text-white font-semibold text-sm">
            <Link to="/" className="hover:text-yellow-400 transition-all">Home</Link>
            <Link to="/about" className="hover:text-yellow-400 transition-all">About</Link>
            <Link to="/services" className="hover:text-yellow-400 transition-all">Services</Link>
            <Link to="/enterprise" className="hover:text-yellow-400 transition-all">Enterprise</Link>
            <Link to="/blog" className="hover:text-yellow-400 transition-all">Blog</Link>
            <Link to="/contact" className="hover:text-yellow-400 transition-all">Contact</Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {/* Avatar + name */}
                <Link to={getDashboardPath()} className="flex items-center gap-2 hover:opacity-80 transition-all">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt={user.fullName}
                      className="w-9 h-9 rounded-full object-cover border-2 border-yellow-400"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black text-sm">
                      {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="text-yellow-400 font-bold text-sm">{user.fullName?.split(" ")[0]}</span>
                </Link>

                <Link
                  to={cta.path}
                  className="bg-yellow-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all"
                >
                  {cta.label}
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-red-400 text-sm font-semibold hover:text-red-300 transition-all"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white font-semibold hover:text-yellow-400 transition-all text-sm">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          <button className="lg:hidden text-yellow-400 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed top-0 right-0 h-screen w-[300px] bg-black border-l border-yellow-500/20 z-[100] transform transition-all duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-8 flex flex-col gap-6 text-white font-semibold h-full overflow-y-auto">
          <button className="self-end text-yellow-400 text-2xl" onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </button>

          {user && (
            <div className="flex items-center gap-3 bg-zinc-900 rounded-2xl p-4 border border-yellow-500/10">
              {user.profilePhoto ? (
                <img src={user.profilePhoto} alt={user.fullName} className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black text-lg">
                  {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <div>
                <p className="font-black text-yellow-400">{user.fullName}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role?.toLowerCase()}</p>
              </div>
            </div>
          )}

          {["Home", "About", "Services", "Enterprise", "Blog", "Contact"].map((item) => (
            <Link key={item} to={`/${item === "Home" ? "" : item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="hover:text-yellow-400 transition-all">
              {item}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to={getDashboardPath()}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-yellow-400 font-bold"
              >
                <FaTachometerAlt /> Dashboard
              </Link>
              <Link
                to={cta.path}
                onClick={() => setMenuOpen(false)}
                className="bg-yellow-400 text-black px-6 py-4 rounded-2xl font-bold text-center hover:scale-105 transition-all"
              >
                {cta.label}
              </Link>
              <button
                onClick={() => { setMenuOpen(false); logout(); }}
                className="flex items-center gap-2 text-red-400 font-bold"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="border border-yellow-400 text-yellow-400 px-6 py-4 rounded-2xl font-bold text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-yellow-400 text-black px-6 py-4 rounded-2xl font-bold text-center"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && <div className="fixed inset-0 bg-black/60 z-[99]" onClick={() => setMenuOpen(false)} />}
    </>
  );
}

export default Navbar;
