import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import { getAdminPromos, createAdminPromo, deleteAdminPromo, toggleAdminPromo } from "../../services/featureService";
import toast from "react-hot-toast";
import { FaTag, FaPlus, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

export default function AdminPromos() {
  const [promos,   setPromos]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({ code: "", discount: "", type: "PERCENTAGE", maxUses: 100, minFare: 0, expiresAt: "" });

  const load = () => {
    getAdminPromos().then((r) => setPromos(r.promos || [])).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.code || !form.discount) { toast.error("Code and discount required"); return; }
    try {
      setSaving(true);
      await createAdminPromo({ ...form, code: form.code.toUpperCase() });
      toast.success("Promo created!");
      setShowForm(false);
      setForm({ code: "", discount: "", type: "PERCENTAGE", maxUses: 100, minFare: 0, expiresAt: "" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create promo");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this promo?")) return;
    try { await deleteAdminPromo(id); toast.success("Deleted"); load(); }
    catch { toast.error("Failed"); }
  };

  const handleToggle = async (id) => {
    try { await toggleAdminPromo(id); load(); }
    catch { toast.error("Failed"); }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Promo Codes</h1>
            <p className="text-gray-400 text-sm mt-1">{promos.length} code{promos.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all">
            <FaPlus /> Create Promo
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="bg-zinc-950 border border-yellow-500/20 rounded-2xl p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Code *</label>
                <input type="text" placeholder="BEAR50" value={form.code}
                  onChange={(e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))}
                  className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white uppercase font-bold outline-none focus:border-yellow-400" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Discount * (%  or ₹)</label>
                <input type="number" placeholder="20" value={form.discount}
                  onChange={(e) => setForm((p) => ({ ...p, discount: e.target.value }))}
                  className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Type</label>
                <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                  className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400">
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="FIXED">Fixed Amount (₹)</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Max Uses</label>
                <input type="number" value={form.maxUses} onChange={(e) => setForm((p) => ({ ...p, maxUses: e.target.value }))}
                  className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Min Fare (₹)</label>
                <input type="number" value={form.minFare} onChange={(e) => setForm((p) => ({ ...p, minFare: e.target.value }))}
                  className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Expiry Date (optional)</label>
                <input type="date" value={form.expiresAt} onChange={(e) => setForm((p) => ({ ...p, expiresAt: e.target.value }))}
                  className="w-full bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="flex-1 bg-yellow-400 text-black py-3 rounded-xl font-black">
                {saving ? "Creating..." : "Create Promo"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 border border-yellow-500/20 text-gray-400 rounded-xl font-bold">Cancel</button>
            </div>
          </form>
        )}

        {loading ? <p className="text-gray-500 text-center py-10">Loading...</p>
          : promos.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FaTag className="text-4xl mx-auto mb-3 opacity-20" />
              <p>No promo codes yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-yellow-500/10 text-left text-xs text-gray-500 uppercase">
                    {["Code", "Discount", "Type", "Used / Max", "Min Fare", "Expires", "Status", "Actions"].map((h) => (
                      <th key={h} className="pb-3 px-2 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {promos.map((p) => (
                    <tr key={p.id} className="border-b border-yellow-500/5 hover:bg-zinc-900/30 transition-all">
                      <td className="py-4 px-2 font-black text-yellow-400">{p.code}</td>
                      <td className="py-4 px-2">{p.discount}{p.type === "PERCENTAGE" ? "%" : "₹"}</td>
                      <td className="py-4 px-2 text-gray-400 text-sm">{p.type}</td>
                      <td className="py-4 px-2">{p.usedCount} / {p.maxUses}</td>
                      <td className="py-4 px-2">₹{p.minFare}</td>
                      <td className="py-4 px-2 text-gray-400 text-sm">{p.expiresAt ? new Date(p.expiresAt).toLocaleDateString("en-IN") : "—"}</td>
                      <td className="py-4 px-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {p.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex gap-2">
                          <button onClick={() => handleToggle(p.id)} className={`text-lg ${p.isActive ? "text-green-400" : "text-gray-600"}`}>
                            {p.isActive ? <FaToggleOn /> : <FaToggleOff />}
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}
