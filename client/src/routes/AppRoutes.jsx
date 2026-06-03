import { Routes, Route } from "react-router-dom";

/* PUBLIC */
import Home from "../pages/public/Home/Home";
import About from "../pages/public/About/About";
import Services from "../pages/public/Services/Services";
import Contact from "../pages/public/Contact/Contact";
import Blog from "../pages/public/Blog/Blog";
import Tracking from "../pages/public/Tracking/Tracking";
import Enterprise from "../pages/public/Enterprise/Enterprise";

/* AUTH */
import Login from "../pages/auth/Login/Login";
import OTP from "../pages/auth/OTP/OTP";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import Register from "../pages/auth/Register/Register";

/* CUSTOMER DASHBOARD */
import CustomerDashboard from "../pages/dashboard/customer/CustomerDashboard";
import Rides from "../pages/dashboard/customer/rides/Rides";
import Payments from "../pages/dashboard/customer/payments/Payments";
import Profile from "../pages/dashboard/customer/profile/Profile";
import Settings from "../pages/dashboard/customer/settings/Settings";

/* DRIVER DASHBOARD */
import DriverDashboard from "../pages/dashboard/driver/DriverDashboard";
import PendingRides from "../pages/dashboard/driver/PendingRides";
import DriverRides from "../pages/dashboard/driver/DriverRides";
import DriverEarnings from "../pages/dashboard/driver/DriverEarnings";
import DriverProfile from "../pages/dashboard/driver/DriverProfile";

/* VENDOR DASHBOARD */
import VendorDashboard from "../pages/dashboard/vendor/VendorDashboard";

/* ADMIN DASHBOARD */
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminBookings from "../pages/admin/AdminBookings";

/* BOOKING */
import Booking from "../pages/booking/Booking";

/* SERVICES */
import Wallet from "../pages/services/Wallet";
import BookParcel from "../pages/services/BookParcel";
import BookHotels from "../pages/services/BookHotels";
import BookVillas from "../pages/services/BookVillas";
import BookLounge from "../pages/services/BookLounge";
import BookEnterprise from "../pages/services/BookEnterprise";
import BookHouseShifting from "../pages/services/BookHouseShifting";
import RentVehicle from "../pages/services/RentVehicle";
import TruckBooking from "../pages/services/TruckBooking";

/* PROTECTION */
import ProtectedRoutes from "./ProtectedRoutes";
import RoleProtectedRoute from "./RoleProtectedRoute";

/* 404 */
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/enterprise" element={<Enterprise />} />

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />

      {/* ================= BOOKING ================= */}
      <Route path="/booking" element={<ProtectedRoutes><Booking /></ProtectedRoutes>} />

      {/* ================= SERVICE PAGES ================= */}
      <Route path="/wallet" element={<ProtectedRoutes><Wallet /></ProtectedRoutes>} />
      <Route path="/parcel" element={<ProtectedRoutes><BookParcel /></ProtectedRoutes>} />
      <Route path="/hotels" element={<ProtectedRoutes><BookHotels /></ProtectedRoutes>} />
      <Route path="/villas" element={<ProtectedRoutes><BookVillas /></ProtectedRoutes>} />
      <Route path="/lounge" element={<ProtectedRoutes><BookLounge /></ProtectedRoutes>} />
      <Route path="/enterprise-booking" element={<ProtectedRoutes><BookEnterprise /></ProtectedRoutes>} />
      <Route path="/house-shifting" element={<ProtectedRoutes><BookHouseShifting /></ProtectedRoutes>} />
      <Route path="/rent-vehicle" element={<ProtectedRoutes><RentVehicle /></ProtectedRoutes>} />
      <Route path="/truck-booking" element={<ProtectedRoutes><TruckBooking /></ProtectedRoutes>} />

      {/* ================= CUSTOMER DASHBOARD ================= */}
      <Route path="/dashboard/customer" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="CUSTOMER"><CustomerDashboard /></RoleProtectedRoute></ProtectedRoutes>} />
      <Route path="/dashboard/customer/rides" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="CUSTOMER"><Rides /></RoleProtectedRoute></ProtectedRoutes>} />
      <Route path="/dashboard/customer/payments" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="CUSTOMER"><Payments /></RoleProtectedRoute></ProtectedRoutes>} />
      <Route path="/dashboard/customer/profile" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="CUSTOMER"><Profile /></RoleProtectedRoute></ProtectedRoutes>} />
      <Route path="/dashboard/customer/settings" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="CUSTOMER"><Settings /></RoleProtectedRoute></ProtectedRoutes>} />

      {/* ================= DRIVER DASHBOARD ================= */}
      <Route path="/dashboard/driver" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="DRIVER"><DriverDashboard /></RoleProtectedRoute></ProtectedRoutes>} />
      <Route path="/dashboard/driver/pending" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="DRIVER"><PendingRides /></RoleProtectedRoute></ProtectedRoutes>} />
      <Route path="/dashboard/driver/rides" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="DRIVER"><DriverRides /></RoleProtectedRoute></ProtectedRoutes>} />
      <Route path="/dashboard/driver/earnings" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="DRIVER"><DriverEarnings /></RoleProtectedRoute></ProtectedRoutes>} />
      <Route path="/dashboard/driver/profile" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="DRIVER"><DriverProfile /></RoleProtectedRoute></ProtectedRoutes>} />

      {/* ================= VENDOR DASHBOARD ================= */}
      <Route path="/dashboard/vendor" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="VENDOR"><VendorDashboard /></RoleProtectedRoute></ProtectedRoutes>} />

      {/* ================= ADMIN DASHBOARD ================= */}
      <Route path="/admin" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="ADMIN"><AdminDashboard /></RoleProtectedRoute></ProtectedRoutes>} />
      <Route path="/admin/users" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="ADMIN"><AdminUsers /></RoleProtectedRoute></ProtectedRoutes>} />
      <Route path="/admin/bookings" element={<ProtectedRoutes><RoleProtectedRoute allowedRole="ADMIN"><AdminBookings /></RoleProtectedRoute></ProtectedRoutes>} />

      {/* ================= 404 ================= */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;
