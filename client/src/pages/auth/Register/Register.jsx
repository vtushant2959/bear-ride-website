import { useState, useRef } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import toast from "react-hot-toast";
import { setupRecaptcha } from "../../../services/authService";
import { setTempFiles, setTempExtra } from "../../../services/tempStore";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaPhoneAlt, FaMotorcycle, FaBuilding,
  FaArrowRight, FaCheckCircle, FaCamera, FaFileAlt, FaUpload,
  FaShieldAlt, FaIdCard, FaMapMarkerAlt,
} from "react-icons/fa";

const ROLES = [
  {
    value: "CUSTOMER",
    label: "Customer",
    icon: <FaUser />,
    desc: "Book rides, deliveries & services",
    color: "border-yellow-400 bg-yellow-400/10 text-yellow-400",
  },
  {
    value: "DRIVER",
    label: "Driver Partner",
    icon: <FaMotorcycle />,
    desc: "Drive & earn on your schedule",
    color: "border-green-400 bg-green-400/10 text-green-400",
  },
  {
    value: "VENDOR",
    label: "Vendor / B2B",
    icon: <FaBuilding />,
    desc: "Manage fleet & business logistics",
    color: "border-blue-400 bg-blue-400/10 text-blue-400",
  },
];

const VEHICLE_TYPES = [
  "Two Wheeler", "Three Wheeler", "Four Wheeler", "Truck", "Van", "Mini Truck",
];

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
        style={{ minHeight: "140px" }}
      >
        {preview ? (
          <img src={preview} alt={label} className="w-full h-36 object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-36 gap-2 text-gray-500">
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
        ref={ref}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => onChange(name, e.target.files[0] || null)}
      />
      {file && (
        <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
          <FaCheckCircle /> {file.name}
        </p>
      )}
    </div>
  );
}

function InputField({ label, icon, required, ...props }) {
  return (
    <div>
      <label className="block mb-2 text-gray-300 font-medium text-sm">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500">{icon}</span>
        <input
          {...props}
          className="w-full bg-black border border-yellow-500/20 rounded-2xl pl-14 pr-5 py-4 outline-none text-white focus:border-yellow-400 transition-all"
        />
      </div>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("CUSTOMER");
  const [loading, setLoading] = useState(false);

  // Common fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Driver-specific
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  // Vendor-specific
  const [businessName, setBusinessName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");

  // Files
  const [files, setFiles] = useState({ profilePhoto: null, vehicleRC: null });
  const setFile = (name, file) => setFiles((prev) => ({ ...prev, [name]: file }));

  const validate = () => {
    if (!fullName.trim())            { toast.error("Full name is required"); return false; }
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10)        { toast.error("Enter a valid 10-digit mobile number"); return false; }
    if (!files.profilePhoto)         { toast.error("Profile photo is required"); return false; }

    if (role === "DRIVER") {
      if (!vehicleType)              { toast.error("Select vehicle type"); return false; }
      if (!vehicleNumber.trim())     { toast.error("Vehicle number is required"); return false; }
      const vn = vehicleNumber.toUpperCase().replace(/\s/g, "");
      if (!/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/.test(vn)) {
        toast.error("Invalid vehicle number format (e.g. HR26AB1234)"); return false;
      }
      if (!files.vehicleRC)          { toast.error("Vehicle RC is required"); return false; }
    }

    if (role === "VENDOR") {
      if (!businessName.trim())      { toast.error("Business name is required"); return false; }
      if (!address.trim())           { toast.error("Address is required"); return false; }
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const digits = phone.replace(/\D/g, "");
    const e164 = `+91${digits}`;

    try {
      setLoading(true);

      const confirmationResult = await setupRecaptcha(e164);
      window.confirmationResult = confirmationResult;

      // Store text data in localStorage
      const registerData = {
        fullName: fullName.trim(),
        email: email.trim() || null,
        phone: e164,
        role,
        vehicleType:   role === "DRIVER" ? vehicleType : undefined,
        vehicleNumber: role === "DRIVER" ? vehicleNumber.toUpperCase().replace(/\s/g, "") : undefined,
        licenseNumber: role === "DRIVER" ? licenseNumber.trim() || undefined : undefined,
        businessName:  role === "VENDOR" ? businessName.trim() : undefined,
        gstNumber:     role === "VENDOR" ? gstNumber.trim() || undefined : undefined,
        address:       role === "VENDOR" ? address.trim() : undefined,
      };
      localStorage.setItem("bearride_register_data", JSON.stringify(registerData));

      // Store files in temp store (cannot go in localStorage)
      setTempFiles(files);
      setTempExtra(registerData);

      toast.success(`OTP sent to +91 ${digits}`);
      navigate("/otp", { state: { phone: e164, isRegister: true } });
    } catch (error) {
      console.error(error);
      if (error.code === "auth/invalid-phone-number")     toast.error("Invalid number.");
      else if (error.code === "auth/too-many-requests")   toast.error("Too many attempts. Please wait.");
      else if (error.message?.includes("container"))      toast.error("Page error. Please refresh.");
      else toast.error("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const activeRole = ROLES.find((r) => r.value === role);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black flex items-start relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black" />
        </div>

        <div className="container-main px-5 relative z-10 max-w-3xl mx-auto w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6 text-sm">
              Free to Join · No Credit Card
            </div>
            <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">Create Account</h1>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-7">
              Join India's next-generation mobility ecosystem.
            </p>
          </div>

          <div className="bg-zinc-950 border border-yellow-500/20 rounded-[40px] p-8 md:p-12 shadow-[0_0_80px_rgba(250,204,21,0.06)]">

            {/* Role selector */}
            <div className="mb-8">
              <label className="block mb-4 text-gray-300 font-black text-lg">Select Your Role</label>
              <div className="grid md:grid-cols-3 gap-4">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] ${
                      role === r.value ? r.color : "border-yellow-500/10 bg-black text-gray-400 hover:border-yellow-500/30"
                    }`}
                  >
                    <div className="text-2xl mb-3">{r.icon}</div>
                    <p className="font-black text-base">{r.label}</p>
                    <p className="text-xs opacity-70 mt-1 leading-5">{r.desc}</p>
                    {role === r.value && <FaCheckCircle className="mt-3" />}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">

              {/* ── COMMON FIELDS ── */}
              <InputField
                label="Full Name" icon={<FaUser />} required
                type="text" placeholder="Rahul Sharma"
                value={fullName} onChange={(e) => setFullName(e.target.value)}
              />

              <InputField
                label="Email Address" icon={<FaEnvelope />}
                type="email" placeholder="rahul@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <label className="block mb-2 text-gray-300 font-medium text-sm">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-black border border-yellow-500/20 rounded-2xl px-4 py-4 text-gray-300 font-bold whitespace-nowrap flex-shrink-0 text-sm">
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel" inputMode="numeric" required
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="flex-1 bg-black border border-yellow-500/20 rounded-2xl px-5 py-4 outline-none text-white text-lg font-bold tracking-widest focus:border-yellow-400 transition-all"
                  />
                </div>
              </div>

              {/* ── CUSTOMER FIELDS ── */}
              {role === "CUSTOMER" && (
                <PhotoUpload
                  label="Profile Photo" hint="Clear front-facing photo"
                  name="profilePhoto" file={files.profilePhoto}
                  onChange={setFile} icon={<FaCamera />} required
                />
              )}

              {/* ── DRIVER FIELDS ── */}
              {role === "DRIVER" && (
                <>
                  <div>
                    <label className="block mb-2 text-gray-300 font-medium text-sm">
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

                  <InputField
                    label="Vehicle Number" icon={<FaIdCard />} required
                    type="text" placeholder="HR26AB1234"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    maxLength={12}
                  />

                  <InputField
                    label="Driving License Number (optional)" icon={<FaIdCard />}
                    type="text" placeholder="HR-0620110012345"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <PhotoUpload
                      label="Profile Photo" hint="Clear selfie"
                      name="profilePhoto" file={files.profilePhoto}
                      onChange={setFile} icon={<FaCamera />} required
                    />
                    <PhotoUpload
                      label="Vehicle RC" hint="Registration certificate"
                      name="vehicleRC" file={files.vehicleRC}
                      onChange={setFile} icon={<FaFileAlt />} required
                    />
                  </div>
                </>
              )}

              {/* ── VENDOR FIELDS ── */}
              {role === "VENDOR" && (
                <>
                  <InputField
                    label="Business Name" icon={<FaBuilding />} required
                    type="text" placeholder="Sharma Logistics Pvt. Ltd."
                    value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                  />

                  <InputField
                    label="GST Number (if available)" icon={<FaIdCard />}
                    type="text" placeholder="29ABCDE1234F1Z5"
                    value={gstNumber} onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    maxLength={15}
                  />

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
                        className="w-full bg-black border border-yellow-500/20 rounded-2xl pl-14 pr-5 py-4 outline-none text-white focus:border-yellow-400 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <PhotoUpload
                    label="Profile / Owner Photo" hint="Clear front-facing photo"
                    name="profilePhoto" file={files.profilePhoto}
                    onChange={setFile} icon={<FaCamera />} required
                  />
                </>
              )}

              {/* Terms */}
              <div className="flex items-start gap-3 bg-black border border-yellow-500/10 rounded-2xl p-4">
                <input type="checkbox" required className="mt-1 accent-yellow-400 w-5 h-5 flex-shrink-0" />
                <p className="text-gray-400 text-sm leading-7">
                  I agree to the{" "}
                  <span className="text-yellow-400 cursor-pointer">Terms & Conditions</span>
                  {" "}and{" "}
                  <span className="text-yellow-400 cursor-pointer">Privacy Policy</span>
                  {" "}of BearRide.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || phone.replace(/\D/g, "").length !== 10 || !fullName}
                className="w-full flex items-center justify-center gap-3 bg-yellow-400 text-black py-5 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(250,204,21,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>Create Account <FaArrowRight /></>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
              <FaShieldAlt className="text-yellow-400" />
              Secured with Firebase OTP Authentication
            </div>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-[1px] bg-yellow-500/10" />
              <span className="text-gray-500 text-sm">ALREADY A MEMBER?</span>
              <div className="flex-1 h-[1px] bg-yellow-500/10" />
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-3 border border-yellow-400 text-yellow-400 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black transition-all"
              >
                Login Instead <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div id="recaptcha-container" />
      <Footer />
    </>
  );
}

export default Register;
