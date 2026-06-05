import api from "./api";

// ── Ratings ──────────────────────────────────────
export const submitRating     = (data)    => api.post("/ratings", data).then(r => r.data);
export const getDriverRatings = (id)      => api.get(`/ratings/driver/${id}`).then(r => r.data);

// ── Saved Addresses ───────────────────────────────
export const getSavedAddresses = ()       => api.get("/saved-addresses").then(r => r.data);
export const addSavedAddress   = (data)   => api.post("/saved-addresses", data).then(r => r.data);
export const deleteSavedAddress= (id)     => api.delete(`/saved-addresses/${id}`).then(r => r.data);

// ── Wallet ────────────────────────────────────────
export const getTransactions   = ()       => api.get("/wallet/transactions").then(r => r.data);
export const createWalletOrder = (amount) => api.post("/wallet/create-order", { amount }).then(r => r.data);
export const verifyWalletPayment= (data)  => api.post("/wallet/verify-payment", data).then(r => r.data);

// ── Fleet ─────────────────────────────────────────
export const getFleet          = ()       => api.get("/fleet").then(r => r.data);
export const addVehicle        = (data)   => api.post("/fleet", data).then(r => r.data);
export const updateVehicle     = (id, d)  => api.patch(`/fleet/${id}`, d).then(r => r.data);
export const deleteVehicle     = (id)     => api.delete(`/fleet/${id}`).then(r => r.data);
export const toggleVehicle     = (id)     => api.patch(`/fleet/${id}/toggle`).then(r => r.data);

// ── Promo ─────────────────────────────────────────
export const validatePromo     = (data)   => api.post("/bookings/validate-promo", data).then(r => r.data);

// ── Fare Calculator ───────────────────────────────
export const calculateFare     = (params) => api.get("/bookings/calculate-fare", { params }).then(r => r.data);

// ── Scheduled Rides ───────────────────────────────
export const createScheduled   = (data)   => api.post("/bookings/schedule", data).then(r => r.data);
export const getScheduledRides = ()       => api.get("/bookings/scheduled").then(r => r.data);
export const cancelScheduled   = (id)     => api.patch(`/bookings/scheduled/${id}/cancel`).then(r => r.data);

// ── Admin ─────────────────────────────────────────
export const getPendingDrivers = ()       => api.get("/admin/drivers/pending").then(r => r.data);
export const approveDriver     = (id)     => api.patch(`/admin/drivers/${id}/approve`).then(r => r.data);
export const rejectDriver      = (id)     => api.patch(`/admin/drivers/${id}/reject`).then(r => r.data);
export const getAdminPromos    = ()       => api.get("/admin/promos").then(r => r.data);
export const createAdminPromo  = (data)   => api.post("/admin/promos", data).then(r => r.data);
export const deleteAdminPromo  = (id)     => api.delete(`/admin/promos/${id}`).then(r => r.data);
export const toggleAdminPromo  = (id)     => api.patch(`/admin/promos/${id}/toggle`).then(r => r.data);
