import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import { getFleet, addVehicle, deleteVehicle, toggleVehicle } from "../../../services/featureService";
import toast from "react-hot-toast";
import { FaTruck, FaPlus, FaTrash, FaToggleOn, FaToggleOff, FaMotorcycle } from "react-icons/fa";

const TYPES = ["Two Wheeler", "Three Wheeler", "Four Wheeler", "Truck", "Van", "Mini Truck"];

export default function FleetManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({ vehicleType: "", vehicleNumber: "", driverName: "", driverPhone: "" });

  const load = () => {
    getFleet().then((r) => setVehicles(r.vehicles || [])).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.vehicleType || !form.vehicleNumber) { toast.error("Vehicle type and number required"); return; }
    try {
      setSaving(true);
      await addVehicle({ ...form, vehicleNumber: form.vehicleNumber.toUpperCase() });
      toast.success("Vehicle added!");
      setShowForm(false);
      setForm({ vehicleType: "", vehicleNumber: "", driverName: "", driverPhone: "" });
      load();
    } catch { toast.error("Failed to add vehicle"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this vehicle?")) return;
    try { await deleteVehicle(id); toast.success("Removed"); load(); }
    catch { toast.error("Failed"); }
  };

  const handleToggle = async (id) => {
    try { await toggleVehicle(id); load(); }
    catch { toast.error("Failed"); }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Fleet Management</h1>
            <p className="text-gray-400 text-sm mt-1">{vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""} registered</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all">
            <FaPlus /> Add Vehicle
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-zinc-950 border border-yellow-500/20 rounded-2xl p-6 mb-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-2 block">Vehicle Type *</label>
                <select value={form.vehicleType} onChange={(e) => setForm((p) => ({ ...p, vehicleType: e.target.value }))}
                  className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400">
                  <option value="">Select type</option>
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-2 block">Vehicle Number *</label>
                <input type="text" placeholder="HR26AB1234" value={form.vehicleNumber}
                  onChange={(e) => setForm((p) => ({ ...p, vehicleNumber: e.target.value.toUpperCase() }))}
                  className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white uppercase font-bold outline-none focus:border-yellow-400" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-2 block">Driver Name</label>
                <input type="text" placeholder="Driver's name" value={form.driverName}
                  onChange={(e) => setForm((p) => ({ ...p, driverName: e.target.value }))}
                  className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-2 block">Driver Phone</label>
                <input type="tel" placeholder="Driver's phone" value={form.driverPhone}
                  onChange={(e) => setForm((p) => ({ ...p, driverPhone: e.target.value }))}
                  className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="flex-1 bg-yellow-400 text-black py-3 rounded-xl font-black">
                {saving ? "Adding..." : "Add Vehicle"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 border border-yellow-500/20 text-gray-400 rounded-xl font-bold">Cancel</button>
            </div>
          </form>
        )}

        {loading ? <p className="text-gray-500 text-center py-10">Loading...</p>
          : vehicles.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <FaTruck className="text-5xl mx-auto mb-4 opacity-20" />
              <p>No vehicles yet. Add your first vehicle.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {vehicles.map((v) => (
                <div key={v.id} className={`bg-zinc-950 border rounded-2xl p-5 transition-all ${v.isActive ? "border-yellow-500/20" : "border-gray-700/20 opacity-60"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400">
                        <FaMotorcycle />
                      </div>
                      <div>
                        <p className="font-black">{v.vehicleNumber}</p>
                        <p className="text-yellow-400 text-xs">{v.vehicleType}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleToggle(v.id)} className={`text-xl ${v.isActive ? "text-green-400" : "text-gray-600"}`}>
                        {v.isActive ? <FaToggleOn /> : <FaToggleOff />}
                      </button>
                      <button onClick={() => handleDelete(v.id)} className="text-red-400 hover:text-red-300"><FaTrash /></button>
                    </div>
                  </div>
                  {v.driverName && <p className="text-gray-400 text-sm">Driver: <span className="text-white">{v.driverName}</span></p>}
                  {v.driverPhone && <p className="text-gray-400 text-sm">Phone: <span className="text-white">{v.driverPhone}</span></p>}
                  <p className={`text-xs mt-2 font-bold ${v.isActive ? "text-green-400" : "text-gray-500"}`}>{v.isActive ? "● Active" : "○ Inactive"}</p>
                </div>
              ))}
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}
