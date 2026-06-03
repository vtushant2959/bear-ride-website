import api from "./api";

export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

export const getCustomerBookings = async () => {
  const response = await api.get("/bookings/my-rides");
  return response.data;
};

export const getDriverBookings = async () => {
  const response = await api.get("/bookings/my-driver-rides");
  return response.data;
};

export const getPendingBookings = async () => {
  const response = await api.get("/bookings/pending");
  return response.data;
};

export const getBookingById = async (bookingId) => {
  const response = await api.get(`/bookings/${bookingId}`);
  return response.data;
};

export const acceptBooking = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/accept`);
  return response.data;
};

export const startRide = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/start`);
  return response.data;
};

export const completeRide = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/complete`);
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/cancel`);
  return response.data;
};

export default api;
