import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import api from "../../../services/api";
import toast from "react-hot-toast";
import {
  FaMotorcycle, FaBuilding, FaUser, FaIdCard,
  FaFileAlt, FaUpload, FaCheckCircle, FaArrowLeft,
  FaMapMarkerAlt, FaArrowRight,
} from "react-icons/fa";

const VEHICLE_TYPES = ["Two Wheeler", "Three Wheeler", "Four Wheeler", "Truck", "Van", "Mini Truck"];

function PhotoUpload({ label, hint, name, file, onChange, icon, required }) {
  const ref = useRef(null);
  const preview = file ? URL.createObjectURL(file) : null;

  return (
    <div>
      <label className="block mb-2 text-gray-300 font-medium text-sm">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div
        onClick={() => ref.current?.click()}
        className="relative cursor-pointer border-2 border-dashed border-yellow-500/30 hover:border-yellow-400/60 rounded-2xl bg-black transition-all overflow-hidden"
        style={{ minHeight: "130px" }}
      >
        {preview ? (
          <img src={preview} alt={label} className="w-full h-32 object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-32 gap-2 text-gray-500">
            <span className="text-3xl text-yellow-500/30">{icon}</span>
            <FaUpload />
            <p className="text-xs text-center px-3">{hint}</p>
          </div>
        )}
        {preview && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
            <p className="text-white text-xs font-bold flex gap-1 items-center"><FaUpload /> Change</p>
          </div>
        )}
      </div>
      <input
        ref={ref} type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => onChange(name, e.target.files[0] || null)}
      />
      {file && <p className="text-green-400 text-xs mt-1 flex items-center gap-1"><FaCheckCircle /> {file.name}</p>}
    </div>
  );
}

function AddRole() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const targetRole = params.get("role")?.toUpperCase() || "DRIVER";

  const [loading, setLoading] = useState(false);

  // Driver fields
  const [vehicleType,   setVehicleType]   = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  // Vendor fields
  const [businessName, setBusinessName] = useState("");
  const [gstNumber,    setGstNumber]    = useState("");
  const [address,      setAddress]      = useState("");

  // Files
  const [files, setFiles] = useState({ profilePhoto: null, vehicleRC: null });
  const setFile = (n, f) => setFiles((p) => ({ ...p, [n]: f }));

  const currentRoles = Array.isArray(user?.roles) ? user.roles : [user?.role];

  if (currentRoles.includes(targetRole)) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <FaCheckCircle className="text-5xl text-green-400" />
          <h2 className="text-2xl font-black">You already have the {targetRole} role!</h2>
          <button onClick={() => navigate(-1)} className="text-yellow-400 font-bold flex items-center gap-2 mt-2">
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const validate = () => {
    if (targetRole === "DRIVER") {
      if (!vehicleType)         { toast.error("Select vehicle type"); return false; }
      if (!vehicleNumber.trim()) { toast.error("Enter vehicle number"); return false; }
      const vn = vehicleNumber.toUpperCase().replace(/\s/g, "");
      if (!/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/.test(vn)) {
        toast.error("Invalid vehicle number (e.g. HR26AB1234)"); return false;
      }
      if (!files.vehicleRC) { toast.error("Vehicle RC is required"); return false; }
    }
    if (targetRole === "VENDOR") {
      if (!businessName.trim()) { toast.error("Business name is required"); return false; }
      if (!address.trim())      { toast.error("Address is required"); return false; }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("role", targetRole);

      if (targetRole === "DRIVER") {
        formData.append("vehicleType",   vehicleType);
        formData.append("vehicleNumber", vehicleNumber);
        if (licenseNumber) formData.append("licenseNumber", licenseNumber);
        formData.append("vehicleRC", files.vehicleRC);
        if (files.profilePhoto) formData.append("profilePhoto", files.profilePhoto);
      }

      if (targetRole === "VENDOR") {
        formData.append("businessName", businessName);
        if (gstNumber) formData.append("gstNumber", gstNumber);
        formData.append("address", address);
        if (files.profilePhoto) formData.append("profilePhoto", files.profilePhoto);
      }

      if (targetRole === "CUSTOMER") {
        // No extra data needed
      }

      const res = await api.post("/users/add-role", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        updateUser(res.data.user);
        toast.success(res.data.message);
        // Go to role picker so they can switch to the new role
        navigate("/role-picker");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add role. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-yellow-400 transition-all">
            <FaArrowLeft className="text-xl" />
          </button>
          <div>
            <h1 className="text-3xl font-black">
              {targetRole === "DRIVER" && <><FaMotorcycle className="inline text-green-400 mr-3" />Add Driver Role</>}
              {targetRole === "VENDOR" && <><FaBuilding className="inline text-blue-400 mr-3" />Add Vendor Role</>}
              {targetRole === "CUSTOMER" && <><FaUser className="inline text-yellow-400 mr-3" />Add Customer Role</>}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Fill in the details below to add this role to your account.
            </p>
          </div>
        </div>

        <div className="bg-zinc-950 border border-yellow-500/20 rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ── CUSTOMER — instant ── */}
            {targetRole === "CUSTOMER" && (
              <div className="text-center py-8">
                <FaUser className="text-6xl text-yellow-400 mx-auto mb-5" />
                <h2 className="text-2xl font-black mb-3">Add Customer Role</h2>
                <p className="text-gray-400 text-sm mb-6">
                  No extra information needed. You'll be able to book rides and services instantly.
                </p>
              </div>
            )}

            {/* ── DRIVER fields ── */}
            {targetRole === "DRIVER" && (
              <>
                <div>
                  <label className="block mb-3 text-gray-300 font-medium text-sm">
                    Vehicle Type <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {VEHICLE_TYPES.map((vt) => (
                      <button
                        key={vt} type="button"
                        onClick={() => setVehicleType(vt)}
                        className={`py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all ${
                          vehicleType === vt
                            ? "border-green-400 bg-green-400/10 text-green-400"
                            : "border-yellow-500/10 bg-black text-gray-500 hover:border-yellow-500/30"
                        }`}
                      >
                        {vt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium text-sm">
                    Vehicle Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FaIdCard className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text" placeholder="HR26AB1234"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                      className="w-full bg-black border border-yellow-500/20 rounded-2xl pl-14 pr-5 py-4 text-white font-bold tracking-widest uppercase focus:border-yellow-400 outline-none transition-all"
                      maxLength={12}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium text-sm">
                    Driving License Number (optional)
                  </label>
                  <div className="relative">
                    <FaIdCard className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text" placeholder="HR-0620110012345"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
                      className="w-full bg-black border border-yellow-500/20 rounded-2xl pl-14 pr-5 py-4 text-white uppercase focus:border-yellow-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <PhotoUpload
                    label="Profile Photo" hint="Clear selfie (skip if already set)"
                    name="profilePhoto" file={files.profilePhoto}
                    onChange={setFile} icon={<FaUser />}
                  />
                  <PhotoUpload
                    label="Vehicle RC" hint="Registration certificate"
                    name="vehicleRC" file={files.vehicleRC}
                    onChange={setFile} icon={<FaFileAlt />} required
                  />
                </div>
              </>
            )}

            {/* ── VENDOR fields ── */}
            {targetRole === "VENDOR" && (
              <>
                <div>
                  <label className="block mb-2 text-gray-300 font-medium text-sm">
                    Business Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text" placeholder="Sharma Logistics Pvt. Ltd."
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-black border border-yellow-500/20 rounded-2xl pl-14 pr-5 py-4 text-white focus:border-yellow-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium text-sm">GST Number (optional)</label>
                  <div className="relative">
                    <FaIdCard className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text" placeholder="29ABCDE1234F1Z5"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                      maxLength={15}
                      className="w-full bg-black border border-yellow-500/20 rounded-2xl pl-14 pr-5 py-4 text-white uppercase focus:border-yellow-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium text-sm">
                    Business Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-5 top-5 text-gray-500" />
                    <textarea
                      rows={3}
                      placeholder="Plot 12, Industrial Area, Gurugram, Haryana 122001"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-black border border-yellow-500/20 rounded-2xl pl-14 pr-5 py-4 text-white focus:border-yellow-400 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <PhotoUpload
                  label="Profile / Owner Photo (optional — skip if already set)"
                  hint="Only needed if you don't have a profile photo yet"
                  name="profilePhoto" file={files.profilePhoto}
                  onChange={setFile} icon={<FaUser />}
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-yellow-400 text-black py-5 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(250,204,21,0.2)] disabled:opacity-50 disabled:scale-100"
            >
              {loading ? (
                <><span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />Saving...</>
              ) : (
                <>Add {targetRole.charAt(0) + targetRole.slice(1).toLowerCase()} Role <FaArrowRight /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddRole;
