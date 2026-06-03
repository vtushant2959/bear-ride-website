import api from "./api";

export const updateProfile = async (data) => {
  const response = await api.patch("/users/profile", data);
  return response.data;
};

export const getWallet = async () => {
  const response = await api.get("/users/wallet");
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/users/dashboard-stats");
  return response.data;
};
