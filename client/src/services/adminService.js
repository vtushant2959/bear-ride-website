import api from "./api";

export const getAdminStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export const getAllUsers = async (params = {}) => {
  const response = await api.get("/admin/users", { params });
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
};

export const updateUserRole = async (id, role) => {
  const response = await api.patch(`/admin/users/${id}/role`, { role });
  return response.data;
};

export const toggleUserStatus = async (id) => {
  const response = await api.patch(`/admin/users/${id}/toggle-status`);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

export const getAllBookings = async (params = {}) => {
  const response = await api.get("/admin/bookings", { params });
  return response.data;
};
