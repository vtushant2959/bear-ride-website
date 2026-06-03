import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaUserShield, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

/* ── Master password for demo/offline admin access ── */
const ADMIN_PASSPHRASE = "bearride@admin2026";

function AdminAccess() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [pass, setPass]       = useState("");
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAccess = async (e) => {
    e.preventDefault();
    if (!pass) { toast.error("Enter the admin passphrase"); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // UX delay

    if (pass !== ADMIN_PASSPHRASE) {
      toast.error("❌ Incorrect passphrase");
      setLoading(false);
      return;
    }

    /* Grant admin role in local session */
    const adminUser = {
      ...(user || {}),
      id:       user?.id   || "admin-local",
      fullName: user?.fullName || "Admin",
      phone:    user?.phone || "+91 00000 00000",
      role:     "ADMIN",
      isVerified: true,
    };

    const token = localStorage.getItem("bearride_token") || "admin-bypass-token";
    login(adminUser, token);

    /* Also mark admin bypass so RoleProtectedRoute lets it through */
    localStorage.setItem("bearride_admin_bypass", "true");

    toast.success("✅ Admin access granted!");
    navigate("/admin");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
          alt="admin"
          className="w-full h-full object-cover opacity-8"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black" />
      </div>

      <div className="relative z-10 bg-zinc-950 border border-yellow-500/20 rounded-[40px] p-12 w-full max-w-md shadow-[0_0_80px_rgba(250,204,21,0.1)]">

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-yellow-400/10 border border-yellow-400/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FaUserShield className="text-yellow-400 text-4xl" />
          </div>
          <h1 className="text-4xl font-black gradient-text mb-3">Admin Access</h1>
          <p className="text-gray-400 text-sm leading-7">
            Enter the admin passphrase to access the BearRide admin panel.
            <br />
            <span className="text-yellow-400/60 text-xs">
              (Demo passphrase: <code className="bg-zinc-900 px-2 py-0.5 rounded">bearride@admin2026</code>)
            </span>
          </p>
        </div>

        <form onSubmit={handleAccess} className="space-y-6">
          <div>
            <label className="block mb-3 text-gray-300 font-medium text-sm">Admin Passphrase</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                type={show ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter passphrase..."
                className="w-full bg-black border border-yellow-500/20 rounded-2xl pl-12 pr-12 py-5 outline-none text-white focus:border-yellow-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-all"
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !pass}
            className="w-full flex items-center justify-center gap-3 bg-yellow-400 text-black py-5 rounded-2xl font-black hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              <><FaUserShield /> Enter Admin Panel</>
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-8">
          When backend is deployed, admin access is automatic for users with ADMIN role.
        </p>
      </div>
    </div>
  );
}

export default AdminAccess;
