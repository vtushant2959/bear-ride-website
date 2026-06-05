import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import api from "../../../services/api";
import toast from "react-hot-toast";
import {
  FaMotorcycle, FaIdCard, FaCamera, FaFileAlt,
  FaCheckCircle, FaArrowRight, FaArrowLeft, FaShieldAlt,
  FaUpload, FaUser, FaCar,
} from "react-icons/fa";

const VEHICLE_TYPES = ["Bike", "Auto", "Car", "Truck", "Van"];

const STEPS = [
  { id: 1, label: "Vehicle Info",  icon: <FaMotorcycle /> },
  { id: 2, label: "Your Photo",    icon: <FaCamera /> },
  { id: 3, label: "Documents",     icon: <FaFileAlt /> },
  { id: 4, label: "Review",        icon: <FaCheckCircle /> },
];

function ImageUploadBox({ label, hint, fieldName, file, onChange, icon }) {
  const inputRef = useRef(null);
  const preview = file ? URL.createObjectURL(file) : null;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-300 font-semibold text-sm">{label} *</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative cursor-pointer border-2 border-dashed border-yellow-500/30 hover:border-yellow-400/60 rounded-2xl overflow-hidden bg-black transition-all"
        style={{ minHeight: "160px" }}
      >
        {preview ? (
          <img src={preview} alt={label} className="w-full h-40 object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-gray-500">
            <span className="text-3xl text-yellow-500/40">{icon}</span>
            <FaUpload className="text-xl" />
            <p className="text-xs text-center px-4">{hint}</p>
          </div>
        )}
        {preview && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
            <p className="text-white text-sm font-semibold flex items-center gap-2">
              <FaUpload /> Change Photo
            </p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => onChange(fieldName, e.target.files[0] || null)}
      />
      {file && (
        <p className="text-green-400 text-xs flex items-center gap-1">
          <FaCheckCircle /> {file.name}
        </p>
      )}
    </div>
  );
}

function DriverOnboarding() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
  });

  const [files, setFiles] = useState({
    ownPhoto:     null,
    vehiclePhoto: null,
    licensePhoto: null,
    vehicleRC:    null,
  });

  const setFile = (name, file) => setFiles((prev) => ({ ...prev, [name]: file }));
  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const validateStep = () => {
    if (step === 1) {
      if (!form.vehicleType)    { toast.error("Select vehicle type"); return false; }
      if (!form.vehicleNumber)  { toast.error("Enter vehicle number"); return false; }
      if (!form.licenseNumber)  { toast.error("Enter license number"); return false; }
      const vnClean = form.vehicleNumber.toUpperCase().replace(/\s/g, "");
      if (!/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/.test(vnClean)) {
        toast.error("Invalid vehicle number (e.g. HR26AB1234)");
        return false;
      }
    }
    if (step === 2) {
      if (!files.ownPhoto) { toast.error("Upload your photo"); return false; }
    }
    if (step === 3) {
      if (!files.vehiclePhoto) { toast.error("Upload vehicle photo"); return false; }
      if (!files.licensePhoto) { toast.error("Upload license photo"); return false; }
      if (!files.vehicleRC)    { toast.error("Upload Vehicle RC"); return false; }
    }
    return true;
  };

  const next = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const submit = async () => {
    if (!validateStep()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("vehicleType",    form.vehicleType);
      formData.append("vehicleNumber",  form.vehicleNumber);
      formData.append("licenseNumber",  form.licenseNumber);
      formData.append("ownPhoto",     files.ownPhoto);
      formData.append("vehiclePhoto", files.vehiclePhoto);
      formData.append("licensePhoto", files.licensePhoto);
      formData.append("vehicleRC",    files.vehicleRC);

      const res = await api.post("/drivers/submit-documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        // Update context with new driverStatus
        login({ ...user, ...res.data.user }, localStorage.getItem("bearride_token"));
        toast.success("Documents submitted! Awaiting admin approval.");
        navigate("/dashboard/driver");
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Submission failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black py-20 px-5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-400/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">

          {/* Heading */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-400/10 border border-green-400/20 px-5 py-2 rounded-full text-green-400 font-semibold text-sm mb-6">
              <FaMotorcycle /> Driver Verification
            </div>
            <h1 className="text-4xl md:text-5xl font-black gradient-text mb-3">
              Complete Your Profile
            </h1>
            <p className="text-gray-400 text-sm">
              Welcome, <span className="text-yellow-400 font-bold">{user?.fullName}</span>! Upload your documents to start driving.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-between mb-10 px-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                    step > s.id  ? "bg-green-400 text-black" :
                    step === s.id ? "bg-yellow-400 text-black" :
                    "bg-zinc-800 text-gray-500"
                  }`}>
                    {step > s.id ? <FaCheckCircle /> : s.icon}
                  </div>
                  <span className={`text-xs font-semibold hidden md:block ${step === s.id ? "text-yellow-400" : "text-gray-600"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all ${step > s.id ? "bg-green-400" : "bg-zinc-800"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-zinc-950 border border-yellow-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_60px_rgba(250,204,21,0.06)]">

            {/* ── STEP 1: Vehicle Info ── */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                  <FaCar className="text-yellow-400" /> Vehicle Details
                </h2>

                <div>
                  <label className="block text-gray-300 font-semibold text-sm mb-3">Vehicle Type *</label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {VEHICLE_TYPES.map((vt) => (
                      <button
                        key={vt}
                        type="button"
                        onClick={() => setField("vehicleType", vt)}
                        className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                          form.vehicleType === vt
                            ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                            : "border-yellow-500/10 bg-black text-gray-500 hover:border-yellow-500/30"
                        }`}
                      >
                        {vt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold text-sm mb-3">Vehicle Number *</label>
                  <input
                    type="text"
                    placeholder="HR26AB1234"
                    value={form.vehicleNumber}
                    onChange={(e) => setField("vehicleNumber", e.target.value.toUpperCase())}
                    className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-4 text-white tracking-widest font-bold uppercase focus:border-yellow-400 outline-none transition-all"
                    maxLength={12}
                  />
                  <p className="text-gray-600 text-xs mt-2">Format: XX99XX9999 (e.g. HR26AB1234)</p>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold text-sm mb-3">Driving License Number *</label>
                  <input
                    type="text"
                    placeholder="HR-0620110012345"
                    value={form.licenseNumber}
                    onChange={(e) => setField("licenseNumber", e.target.value.toUpperCase())}
                    className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-4 text-white font-bold uppercase focus:border-yellow-400 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* ── STEP 2: Own Photo ── */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                  <FaUser className="text-yellow-400" /> Your Photo
                </h2>
                <p className="text-gray-400 text-sm -mt-4">Upload a clear, front-facing photo of yourself (selfie or passport-style).</p>
                <ImageUploadBox
                  label="Profile / Selfie Photo"
                  hint="Clear face photo — no sunglasses, good lighting"
                  fieldName="ownPhoto"
                  file={files.ownPhoto}
                  onChange={setFile}
                  icon={<FaCamera />}
                />
              </div>
            )}

            {/* ── STEP 3: Documents ── */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                  <FaFileAlt className="text-yellow-400" /> Upload Documents
                </h2>

                <ImageUploadBox
                  label="Vehicle Photo"
                  hint="Full vehicle photo showing registration plate"
                  fieldName="vehiclePhoto"
                  file={files.vehiclePhoto}
                  onChange={setFile}
                  icon={<FaMotorcycle />}
                />

                <ImageUploadBox
                  label="Driving License"
                  hint="Front side of your driving license"
                  fieldName="licensePhoto"
                  file={files.licensePhoto}
                  onChange={setFile}
                  icon={<FaIdCard />}
                />

                <ImageUploadBox
                  label="Vehicle RC (Registration Certificate)"
                  hint="Vehicle RC card — front side"
                  fieldName="vehicleRC"
                  file={files.vehicleRC}
                  onChange={setFile}
                  icon={<FaFileAlt />}
                />
              </div>
            )}

            {/* ── STEP 4: Review ── */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                  <FaCheckCircle className="text-yellow-400" /> Review & Submit
                </h2>

                <div className="space-y-3">
                  {[
                    { label: "Vehicle Type",    value: form.vehicleType },
                    { label: "Vehicle Number",  value: form.vehicleNumber },
                    { label: "License Number",  value: form.licenseNumber },
                    { label: "Your Photo",      value: files.ownPhoto?.name },
                    { label: "Vehicle Photo",   value: files.vehiclePhoto?.name },
                    { label: "License Photo",   value: files.licensePhoto?.name },
                    { label: "Vehicle RC",      value: files.vehicleRC?.name },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between bg-black rounded-xl px-5 py-3 border border-yellow-500/10">
                      <span className="text-gray-400 text-sm">{label}</span>
                      <span className="text-yellow-400 font-bold text-sm truncate max-w-[200px]">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-400/5 border border-yellow-500/20 rounded-2xl p-5 text-sm text-gray-400 leading-7">
                  <FaShieldAlt className="text-yellow-400 inline mr-2" />
                  Your documents will be securely stored and reviewed by our team within <strong className="text-white">24 hours</strong>. You'll be notified once approved.
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-4 mt-10">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 border border-yellow-500/30 text-yellow-400 py-4 rounded-2xl font-bold hover:bg-yellow-400/5 transition-all"
                >
                  <FaArrowLeft /> Back
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={next}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-black py-4 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(250,204,21,0.2)]"
                >
                  Continue <FaArrowRight />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-black py-4 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(250,204,21,0.2)] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>Submit for Verification <FaCheckCircle /></>
                  )}
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-gray-600 text-xs mt-6 flex items-center justify-center gap-2">
            <FaShieldAlt className="text-yellow-400/60" />
            Documents are encrypted and stored securely on Cloudinary
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default DriverOnboarding;
