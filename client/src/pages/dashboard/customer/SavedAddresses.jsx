import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import { getSavedAddresses, addSavedAddress, deleteSavedAddress } from "../../../services/featureService";
import toast from "react-hot-toast";
import { FaHome, FaBriefcase, FaMapMarkerAlt, FaPlus, FaTrash, FaStar } from "react-icons/fa";

const LABEL_ICONS = { HOME: <FaHome />, WORK: <FaBriefcase />, OTHER: <FaMapMarkerAlt />, FREQUENT: <FaStar /> };
const LABELS = ["HOME", "WORK", "FREQUENT", "OTHER"];

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "HOME", address: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try { const res = await getSavedAddresses(); setAddresses(res.addresses || []); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.address.trim()) { toast.error("Enter an address"); return; }
    try {
      setSaving(true);
      await addSavedAddress(form);
      toast.success("Address saved!");
      setShowForm(false);
      setForm({ label: "HOME", address: "" });
      load();
    } catch (err) {
      toast.error("Failed to save address");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try { await deleteSavedAddress(id); toast.success("Removed"); load(); }
    catch { toast.error("Failed to delete"); }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Saved Addresses</h1>
            <p className="text-gray-400 text-sm mt-1">Quick access to your frequent locations</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all"
          >
            <FaPlus /> Add Address
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-zinc-950 border border-yellow-500/20 rounded-2xl p-6 mb-6 space-y-4">
            <div className="flex gap-2">
              {LABELS.map((l) => (
                <button key={l} type="button"
                  onClick={() => setForm((p) => ({ ...p, label: l }))}
                  className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${form.label === l ? "border-yellow-400 bg-yellow-400/10 text-yellow-400" : "border-yellow-500/10 text-gray-500"}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <input
              type="text" placeholder="Enter full address..."
              value={form.address}
              onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
              className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
            />
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="flex-1 bg-yellow-400 text-black py-3 rounded-xl font-black">
                {saving ? "Saving..." : "Save Address"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 border border-yellow-500/20 text-gray-400 rounded-xl font-bold">
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="text-gray-500 text-center py-10">Loading...</p>
        ) : addresses.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <FaMapMarkerAlt className="text-4xl mx-auto mb-4 opacity-30" />
            <p>No saved addresses yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div key={addr.id} className="flex items-center gap-4 bg-zinc-950 border border-yellow-500/10 rounded-2xl px-5 py-4 hover:border-yellow-500/30 transition-all">
                <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400 flex-shrink-0">
                  {LABEL_ICONS[addr.label] || <FaMapMarkerAlt />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-yellow-400">{addr.label}</p>
                  <p className="text-gray-400 text-sm truncate">{addr.address}</p>
                </div>
                <button onClick={() => handleDelete(addr.id)} className="text-red-400 hover:text-red-300 transition-all">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
