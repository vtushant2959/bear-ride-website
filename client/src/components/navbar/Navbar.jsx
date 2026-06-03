import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const getDashboardPath = () => {
    if (!user) return "/login";
    const role = user.role;
    if (role === "ADMIN") return "/admin";
    if (role === "DRIVER") return "/dashboard/driver";
    if (role === "VENDOR") return "/dashboard/vendor";
    return "/dashboard/customer";
  };

  return (
    <>
      <nav className="bg-black border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container-main flex justify-between items-center px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="BearRide" className="w-16 h-16 object-contain" />
            <h1 className="text-3xl font-black">
              <span className="text-white">BEAR</span>
              <span className="text-yellow-400">RIDE</span>
            </h1>
          </Link>

          <div className="hidden lg:flex gap-8 text-white font-semibold">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/enterprise">Enterprise</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="flex items-center gap-2 text-yellow-400 font-bold hover:text-yellow-300 transition-all"
                >
                  <FaUser />
                  {user.fullName?.split(" ")[0] || "Dashboard"}
                </Link>
                <Link
                  to="/booking"
                  className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300"
                >
                  Book Ride
                </Link>
              </>
            ) : (
              <Link to="/login">
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300">
                  Login
                </button>
              </Link>
            )}
          </div>

          <button
            className="lg:hidden text-yellow-400 text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-screen w-[300px] bg-black border-l border-yellow-500/20 z-[100] transform transition-all duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 flex flex-col gap-8 text-white font-semibold">
          <button
            className="self-end text-yellow-400 text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>

          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/enterprise" onClick={() => setMenuOpen(false)}>Enterprise</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          {user ? (
            <>
              <Link
                to={getDashboardPath()}
                onClick={() => setMenuOpen(false)}
                className="text-yellow-400 font-bold"
              >
                Dashboard
              </Link>
              <Link
                to="/booking"
                onClick={() => setMenuOpen(false)}
                className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-center hover:scale-105 transition-all duration-300"
              >
                Book Ride
              </Link>
              <button
                onClick={() => { setMenuOpen(false); logout(); }}
                className="text-red-400 font-bold text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-center mt-5 hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[99]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;
