import { useState } from "react";
import DashboardLayout from "../../../../components/dashboard/layout/DashboardLayout";
import { useAuth } from "../../../../context/AuthContext";
import { updateProfile } from "../../../../services/userService";
import toast from "react-hot-toast";
import { FaUser, FaPhone, FaEnvelope, FaSave } from "react-icons/fa";

function Profile() {
  const { user, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateProfile({ fullName, email });
      if (res.success) {
        updateUser(res.user);
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3">My Profile</h1>
          <p className="text-gray-400">Manage your personal information.</p>
        </div>

        <div className="grid xl:grid-cols-3 gap-10">
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 text-center">
            <div className="w-32 h-32 rounded-full bg-yellow-400 flex items-center justify-center text-black text-6xl font-black mx-auto mb-6">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <h2 className="text-3xl font-black mb-2">{user?.fullName}</h2>
            <p className="text-gray-400 mb-2">{user?.phone}</p>
            <span className="inline-block px-4 py-2 rounded-full bg-yellow-400/20 text-yellow-400 font-bold text-sm capitalize">{user?.role?.toLowerCase()}</span>
            <div className="mt-8 space-y-4 text-left">
              <div className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-yellow-400" />
                <span>{user?.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-yellow-400" />
                <span>{user?.email || "Not set"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaUser className="text-yellow-400" />
                <span className="capitalize">{user?.role?.toLowerCase()} Account</span>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
            <h2 className="text-3xl font-black mb-8">Edit Profile</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block mb-3 text-gray-300 font-medium">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-5 outline-none text-white focus:border-yellow-400 transition-all" />
              </div>
              <div>
                <label className="block mb-3 text-gray-300 font-medium">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
                  className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-5 outline-none text-white focus:border-yellow-400 transition-all" />
              </div>
              <div>
                <label className="block mb-3 text-gray-300 font-medium">Phone Number</label>
                <input type="text" value={user?.phone || ""} disabled
                  className="w-full bg-black border border-yellow-500/10 rounded-2xl px-6 py-5 text-gray-500 cursor-not-allowed" />
                <p className="text-gray-500 text-sm mt-2">Phone number cannot be changed</p>
              </div>
              <button type="submit" disabled={loading}
                className="flex items-center gap-3 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all">
                <FaSave /> {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
