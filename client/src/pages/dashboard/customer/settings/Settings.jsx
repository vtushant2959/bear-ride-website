import DashboardLayout from "../../../../components/dashboard/layout/DashboardLayout";
import { useAuth } from "../../../../context/AuthContext";
import { FaShieldAlt, FaBell, FaMoon, FaLanguage, FaTrash, FaSignOutAlt } from "react-icons/fa";

function Settings() {
  const { logout } = useAuth();

  return (
    <DashboardLayout>
      <div>
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3">Settings</h1>
          <p className="text-gray-400">Manage your account preferences and security.</p>
        </div>

        <div className="space-y-8">
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <FaBell className="text-3xl text-yellow-400" />
              <h2 className="text-2xl font-black">Notifications</h2>
            </div>
            <div className="space-y-5">
              {["Ride updates", "Promotions & offers", "Payment alerts", "Safety notifications"].map((item) => (
                <div key={item} className="flex items-center justify-between py-3 border-b border-yellow-500/5">
                  <span className="text-gray-300">{item}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-yellow-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <FaShieldAlt className="text-3xl text-yellow-400" />
              <h2 className="text-2xl font-black">Security</h2>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between py-3 border-b border-yellow-500/5">
                <div>
                  <p className="text-gray-300 font-bold">Two-Factor Authentication</p>
                  <p className="text-gray-500 text-sm">Add an extra layer of security</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-yellow-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <FaMoon className="text-3xl text-yellow-400" />
              <h2 className="text-2xl font-black">Appearance</h2>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-300">Theme</span>
              <span className="px-4 py-2 rounded-full bg-yellow-400/20 text-yellow-400 font-bold text-sm">Dark Mode</span>
            </div>
          </div>

          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <FaLanguage className="text-3xl text-yellow-400" />
              <h2 className="text-2xl font-black">Language</h2>
            </div>
            <select className="bg-black border border-yellow-500/20 rounded-2xl px-6 py-4 outline-none text-white w-full max-w-xs">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <button onClick={logout}
              className="flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 py-4 px-8 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all">
              <FaSignOutAlt /> Logout
            </button>
            <button className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 text-gray-400 py-4 px-8 rounded-2xl font-bold hover:text-red-400 hover:border-red-500/20 transition-all">
              <FaTrash /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
