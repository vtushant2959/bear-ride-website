import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import { createScheduled, getScheduledRides, cancelScheduled } from "../../../services/featureService";
import toast from "react-hot-toast";
import { FaClock, FaPlus, FaTimes, FaMapMarkerAlt } from "react-icons/fa";

const RIDE_TYPES = ["Bike", "Auto", "Car", "Truck", "Van"];

export default function ScheduleRide() {
  const [rides,    setRides]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({ pickup: "", destination: "", rideType: "Car", scheduledAt: "" });

  const load = () => {
    getScheduledRides().then((r) => setRides(r.rides || [])).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const minDateTime = new Date(Date.now() + 30 * 60 * 1000).toISOString().slice(0, 16);

  const handleSchedule = async (e) => {
    e.preventDefault();
    if (!form.pickup || !form.destination || !form.scheduledAt) { toast.error("All fields required"); return; }
    try {
      setSaving(true);
      await createScheduled(form);
      toast.success("Ride scheduled!");
      setShowForm(false);
      setForm({ pickup: "", destination: "", rideType: "Car", scheduledAt: "" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to schedule ride");
    } finally { setSaving(false); }
  };

  const handleCancel = async (id) => {
    try { await cancelScheduled(id); toast.success("Cancelled"); load(); }
    catch { toast.error("Failed"); }
  };

  const STATUS_STYLE = { PENDING: "text-yellow-400 bg-yellow-400/10", CANCELLED: "text-red-400 bg-red-500/10", COMPLETED: "text-green-400 bg-green-500/10" };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Schedule a Ride</h1>
            <p className="text-gray-400 text-sm mt-1">Book in advance — minimum 30 minutes ahead</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all">
            <FaPlus /> Schedule
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSchedule} className="bg-zinc-950 border border-yellow-500/20 rounded-2xl p-6 mb-6 space-y-4">
            <input type="text" placeholder="Pickup location" value={form.pickup}
              onChange={(e) => setForm((p) => ({ ...p, pickup: e.target.value }))}
              className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400" />
            <input type="text" placeholder="Destination" value={form.destination}
              onChange={(e) => setForm((p) => ({ ...p, destination: e.target.value }))}
              className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400" />
            <div className="grid grid-cols-2 gap-4">
              <select value={form.rideType} onChange={(e) => setForm((p) => ({ ...p, rideType: e.target.value }))}
                className="bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400">
                {RIDE_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              <input type="datetime-local" min={minDateTime} value={form.scheduledAt}
                onChange={(e) => setForm((p) => ({ ...p, scheduledAt: e.target.value }))}
                className="bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400" />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="flex-1 bg-yellow-400 text-black py-3 rounded-xl font-black">
                {saving ? "Scheduling..." : "Confirm Schedule"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 border border-yellow-500/20 text-gray-400 rounded-xl font-bold">Cancel</button>
            </div>
          </form>
        )}

        {loading ? <p className="text-gray-500 text-center py-10">Loading...</p>
          : rides.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <FaClock className="text-5xl mx-auto mb-4 opacity-20" />
              <p>No scheduled rides yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rides.map((r) => (
                <div key={r.id} className="bg-zinc-950 border border-yellow-500/10 rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_STYLE[r.status] || "text-gray-400 bg-gray-500/10"}`}>{r.status}</span>
                        <span className="text-gray-400 text-xs">{r.rideType}</span>
                      </div>
                      <p className="text-sm"><FaMapMarkerAlt className="inline text-yellow-400 mr-1" />{r.pickup}</p>
                      <p className="text-sm text-gray-400 mt-1">→ {r.destination}</p>
                      <p className="text-yellow-400 text-xs mt-2 flex items-center gap-1">
                        <FaClock /> {new Date(r.scheduledAt).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {r.status === "PENDING" && (
                      <button onClick={() => handleCancel(r.id)} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1">
                        <FaTimes /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}
