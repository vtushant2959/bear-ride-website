import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaUser, FaMotorcycle, FaBuilding, FaArrowRight, FaSignOutAlt } from "react-icons/fa";

const ROLE_META = {
  CUSTOMER: {
    icon:    <FaUser className="text-4xl" />,
    label:   "Customer",
    desc:    "Book rides, deliveries & services",
    color:   "border-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20",
    accent:  "text-yellow-400",
    btn:     "bg-yellow-400 text-black",
  },
  DRIVER: {
    icon:    <FaMotorcycle className="text-4xl" />,
    label:   "Driver Partner",
    desc:    "Accept rides & earn money",
    color:   "border-green-400 bg-green-400/10 hover:bg-green-400/20",
    accent:  "text-green-400",
    btn:     "bg-green-400 text-black",
  },
  VENDOR: {
    icon:    <FaBuilding className="text-4xl" />,
    label:   "Vendor / B2B",
    desc:    "Manage fleet & business logistics",
    color:   "border-blue-400 bg-blue-400/10 hover:bg-blue-400/20",
    accent:  "text-blue-400",
    btn:     "bg-blue-400 text-white",
  },
};

const DASHBOARD = {
  CUSTOMER: "/dashboard/customer",
  DRIVER:   "/dashboard/driver",
  VENDOR:   "/dashboard/vendor",
  ADMIN:    "/admin",
};

function RolePicker() {
  const { user, activeRole, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const roles = Array.isArray(user?.roles) ? user.roles : [user?.role || "CUSTOMER"];

  const handleSelect = (role) => {
    switchRole(role);
    navigate(DASHBOARD[role] || "/dashboard/customer");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5 py-16 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt={user.fullName} className="w-16 h-16 rounded-2xl object-cover border-2 border-yellow-400" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center text-black font-black text-2xl">
                {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <div className="text-left">
              <p className="text-white font-black text-xl">{user?.fullName}</p>
              <p className="text-gray-400 text-sm">{user?.phone}</p>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black gradient-text mb-3">Choose Your Role</h1>
          <p className="text-gray-400 text-sm">
            You have {roles.length} role{roles.length > 1 ? "s" : ""} — pick which dashboard to open.
          </p>
        </div>

        {/* Role cards */}
        <div className={`grid gap-5 ${roles.length === 1 ? "max-w-sm mx-auto" : roles.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {roles.map((role) => {
            const meta = ROLE_META[role];
            if (!meta) return null;
            const isActive = activeRole === role;

            return (
              <button
                key={role}
                onClick={() => handleSelect(role)}
                className={`relative p-8 rounded-3xl border-2 text-left transition-all duration-300 hover:scale-[1.03] cursor-pointer ${meta.color} ${isActive ? "ring-2 ring-yellow-400/50" : ""}`}
              >
                {isActive && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full">
                    Current
                  </span>
                )}
                <div className={`mb-5 ${meta.accent}`}>{meta.icon}</div>
                <h2 className={`text-2xl font-black mb-2 ${meta.accent}`}>{meta.label}</h2>
                <p className="text-gray-400 text-sm mb-6 leading-6">{meta.desc}</p>
                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm ${meta.btn}`}>
                  Enter <FaArrowRight />
                </div>
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <div className="text-center mt-10">
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 text-red-400 text-sm font-semibold hover:text-red-300 transition-all"
          >
            <FaSignOutAlt /> Sign out
          </button>
        </div>

      </div>
    </div>
  );
}

export default RolePicker;
