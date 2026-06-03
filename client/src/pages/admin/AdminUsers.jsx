import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import { getAllUsers, updateUserRole, toggleUserStatus, deleteUser } from "../../services/adminService";
import toast from "react-hot-toast";
import { FaSearch, FaTrash, FaBan, FaCheck, FaSyncAlt } from "react-icons/fa";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (roleFilter) params.role = roleFilter;
      if (search) params.search = search;
      const res = await getAllUsers(params);
      if (res.success) setUsers(res.users);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadUsers(); }, [roleFilter]);

  const handleRoleChange = async (id, role) => {
    try { await updateUserRole(id, role); toast.success("Role updated"); loadUsers(); }
    catch (e) { toast.error("Failed"); }
  };

  const handleToggle = async (id) => {
    try { await toggleUserStatus(id); toast.success("Status updated"); loadUsers(); }
    catch (e) { toast.error("Failed"); }
  };

  const handleDelete = async (id) => {
    try { await deleteUser(id); toast.success("User deleted"); loadUsers(); }
    catch (e) { toast.error(e.response?.data?.message || "Failed"); }
  };

  const getRoleStyle = (role) => ({
    CUSTOMER: "bg-blue-500/20 text-blue-400", DRIVER: "bg-green-500/20 text-green-400",
    VENDOR: "bg-purple-500/20 text-purple-400", ADMIN: "bg-yellow-500/20 text-yellow-400",
  }[role] || "bg-zinc-700 text-white");

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-black mb-3">Manage Users</h1>
            <p className="text-gray-400">View, edit roles and manage all platform users.</p>
          </div>
          <button onClick={loadUsers} className="flex items-center gap-3 bg-yellow-400 text-black px-6 py-4 rounded-2xl font-bold">
            <FaSyncAlt /> Refresh
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadUsers()}
              placeholder="Search by name, phone or email..."
              className="w-full bg-zinc-950 border border-yellow-500/10 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-yellow-400" />
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-zinc-950 border border-yellow-500/10 rounded-2xl px-5 py-4 outline-none text-white">
            <option value="">All Roles</option>
            <option value="CUSTOMER">Customer</option>
            <option value="DRIVER">Driver</option>
            <option value="VENDOR">Vendor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {loading ? <div className="bg-zinc-950 rounded-3xl p-10 text-center text-gray-400">Loading...</div> : (
          <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-yellow-500/10 text-left">
                    <th className="p-5 text-gray-400 font-semibold">ID</th>
                    <th className="p-5 text-gray-400 font-semibold">Name</th>
                    <th className="p-5 text-gray-400 font-semibold">Phone</th>
                    <th className="p-5 text-gray-400 font-semibold">Role</th>
                    <th className="p-5 text-gray-400 font-semibold">Status</th>
                    <th className="p-5 text-gray-400 font-semibold">Joined</th>
                    <th className="p-5 text-gray-400 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-yellow-500/5 hover:bg-zinc-900/50 transition-all">
                      <td className="p-5 text-yellow-400 font-bold">#{u.id}</td>
                      <td className="p-5"><p className="font-bold">{u.fullName}</p><p className="text-gray-500 text-sm">{u.email || "-"}</p></td>
                      <td className="p-5">{u.phone}</td>
                      <td className="p-5">
                        <select value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="bg-black border border-yellow-500/20 rounded-xl px-3 py-2 text-sm outline-none">
                          <option value="CUSTOMER">Customer</option>
                          <option value="DRIVER">Driver</option>
                          <option value="VENDOR">Vendor</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {u.isActive ? "Active" : "Blocked"}
                        </span>
                      </td>
                      <td className="p-5 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="p-5">
                        <div className="flex gap-2">
                          <button onClick={() => handleToggle(u.id)}
                            className={`p-2 rounded-lg transition-all ${u.isActive ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/40" : "bg-green-500/20 text-green-400 hover:bg-green-500/40"}`}>
                            {u.isActive ? <FaBan /> : <FaCheck />}
                          </button>
                          <button onClick={() => handleDelete(u.id)}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {users.length === 0 && <div className="p-10 text-center text-gray-400">No users found</div>}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AdminUsers;
