import { useState } from "react";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import { useAuth } from "../../../context/AuthContext";
import { updateProfile } from "../../../services/userService";
import toast from "react-hot-toast";
import { FaSave, FaCar, FaIdCard } from "react-icons/fa";

function DriverProfile() {
  const { user, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [vehicleType, setVehicleType] = useState(user?.vehicleType || "");
  const [vehicleNumber, setVehicleNumber] = useState(user?.vehicleNumber || "");
  const [licenseNumber, setLicenseNumber] = useState(user?.licenseNumber || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateProfile({ fullName, email, vehicleType, vehicleNumber, licenseNumber });
      if (res.success) { updateUser(res.user); toast.success("Profile updated"); }
    } catch (err) { toast.error("Failed to update"); }
    finally { setLoading(false); }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3">Driver Profile</h1>
          <p className="text-gray-400">Update your personal and vehicle information.</p>
        </div>

        <div className="grid xl:grid-cols-3 gap-10">
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 text-center">
            <div className="w-32 h-32 rounded-full bg-yellow-400 flex items-center justify-center text-black text-6xl font-black mx-auto mb-6">
              {user?.fullName?.charAt(0)?.toUpperCase() || "D"}
            </div>
            <h2 className="text-3xl font-black mb-2">{user?.fullName}</h2>
            <p className="text-gray-400 mb-4">{user?.phone}</p>
            <span className="inline-block px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm">Driver Partner</span>
            {user?.vehicleType && (
              <div className="mt-6 space-y-3 text-left">
                <div className="flex items-center gap-3 text-gray-400">
                  <FaCar className="text-yellow-400" />
                  <span>{user.vehicleType} - {user.vehicleNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FaIdCard className="text-yellow-400" />
                  <span>License: {user.licenseNumber || "Not set"}</span>
                </div>
              </div>
            )}
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
                <label className="block mb-3 text-gray-300 font-medium">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"
                  className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-5 outline-none text-white focus:border-yellow-400 transition-all" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-3 text-gray-300 font-medium">Vehicle Type</label>
                  <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-5 outline-none text-white focus:border-yellow-400 transition-all">
                    <option value="">Select</option>
                    <option value="Bike">Bike</option>
                    <option value="Auto">Auto</option>
                    <option value="Car">Car</option>
                    <option value="Truck">Truck</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-3 text-gray-300 font-medium">Vehicle Number</label>
                  <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} placeholder="e.g. HR26AB1234"
                    className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-5 outline-none text-white focus:border-yellow-400 transition-all" />
                </div>
              </div>
              <div>
                <label className="block mb-3 text-gray-300 font-medium">License Number</label>
                <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} placeholder="Driving License Number"
                  className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-5 outline-none text-white focus:border-yellow-400 transition-all" />
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

export default DriverProfile;
