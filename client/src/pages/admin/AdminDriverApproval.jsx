import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import { getPendingDrivers, approveDriver, rejectDriver } from "../../services/featureService";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimes, FaMotorcycle, FaIdCard, FaUser } from "react-icons/fa";

export default function AdminDriverApproval() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  const load = () => {
    getPendingDrivers().then((r) => setDrivers(r.drivers || [])).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handle = async (id, action) => {
    try {
      action === "approve" ? await approveDriver(id) : await rejectDriver(id);
      toast.success(`Driver ${action === "approve" ? "approved" : "rejected"}`);
      load();
    } catch { toast.error("Failed"); }
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-black mb-2">Driver Verification</h1>
        <p className="text-gray-400 text-sm mb-8">{drivers.length} driver{drivers.length !== 1 ? "s" : ""} awaiting approval</p>

        {loading ? <p className="text-gray-500 text-center py-10">Loading...</p>
          : drivers.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <FaCheckCircle className="text-5xl mx-auto mb-4 text-green-400/30" />
              <p>All caught up! No pending verifications.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {drivers.map((d) => (
                <div key={d.id} className="bg-zinc-950 border border-yellow-500/10 rounded-2xl p-6">
                  <div className="flex items-start gap-4 flex-wrap">
                    {/* Profile */}
                    {d.profilePhoto ? (
                      <img src={d.profilePhoto} className="w-16 h-16 rounded-xl object-cover border-2 border-yellow-400 flex-shrink-0 cursor-pointer" onClick={() => setPreview(d.profilePhoto)} />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 text-2xl flex-shrink-0">
                        <FaUser />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black">{d.fullName}</h3>
                      <p className="text-gray-400 text-sm">{d.phone} {d.email && `· ${d.email}`}</p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="bg-yellow-400/10 text-yellow-400 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                          <FaMotorcycle /> {d.vehicleType || "—"}
                        </span>
                        <span className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                          <FaIdCard /> {d.vehicleNumber || "—"}
                        </span>
                        {d.licenseNumber && (
                          <span className="bg-purple-500/10 text-purple-400 text-xs px-3 py-1 rounded-full font-bold">
                            License: {d.licenseNumber}
                          </span>
                        )}
                      </div>

                      {/* Document thumbnails */}
                      {d.vehicleRC && (
                        <div className="mt-3">
                          <p className="text-gray-600 text-xs mb-1">Vehicle RC</p>
                          <img src={d.vehicleRC} className="h-20 rounded-xl object-cover border border-yellow-500/20 cursor-pointer" onClick={() => setPreview(d.vehicleRC)} />
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handle(d.id, "approve")}
                        className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-green-400 transition-all">
                        <FaCheckCircle /> Approve
                      </button>
                      <button onClick={() => handle(d.id, "reject")}
                        className="flex items-center gap-2 bg-red-500/20 text-red-400 border border-red-500/30 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all">
                        <FaTimes /> Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>

      {/* Image preview lightbox */}
      {preview && (
        <div className="fixed inset-0 bg-black/90 z-[300] flex items-center justify-center" onClick={() => setPreview(null)}>
          <img src={preview} className="max-h-[80vh] max-w-[90vw] rounded-2xl" />
          <button className="absolute top-6 right-6 text-white text-2xl"><FaTimes /></button>
        </div>
      )}
    </DashboardLayout>
  );
}
