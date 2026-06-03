import { Link } from "react-router-dom";
import {
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube,
  FaMotorcycle, FaTruck, FaBox, FaBuilding, FaPhone, FaEnvelope,
  FaMapMarkerAlt, FaArrowRight, FaApple, FaGooglePlay,
} from "react-icons/fa";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-yellow-500/10">

      {/* TOP STRIP */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-5 px-5">
        <div className="container-main flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-black font-bold text-lg">
            🚀 India's #1 Ride & Logistics Platform — Available 24/7
          </p>
          <Link
            to="/register"
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all"
          >
            Join BearRide Free <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="container-main px-5 pt-16 pb-10">
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-12">

          {/* BRAND */}
          <div className="xl:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="BearRide" className="w-14 h-14 object-contain" />
              <h1 className="text-3xl font-black">
                <span className="text-white">BEAR</span>
                <span className="text-yellow-400">RIDE</span>
              </h1>
            </Link>
            <p className="text-gray-400 leading-8 mb-8 max-w-sm">
              India's next-generation mobility and logistics ecosystem. Rides, deliveries, trucks, hotels, and enterprise transport — all in one platform.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, href: "#", color: "hover:bg-blue-600" },
                { icon: <FaTwitter />,   href: "#", color: "hover:bg-sky-500" },
                { icon: <FaInstagram />, href: "#", color: "hover:bg-pink-600" },
                { icon: <FaLinkedinIn />,href: "#", color: "hover:bg-blue-700" },
                { icon: <FaYoutube />,   href: "#", color: "hover:bg-red-600" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className={`w-11 h-11 rounded-xl bg-black border border-yellow-500/10 flex items-center justify-center text-gray-400 hover:text-white ${s.color} hover:border-transparent transition-all duration-300`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* STORE BADGES */}
            <div className="flex gap-3 mt-6">
              <div className="bg-black border border-yellow-500/10 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-yellow-400/40 transition-all cursor-pointer">
                <FaApple className="text-white text-2xl flex-shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs">Download on</p>
                  <p className="text-white font-bold text-sm">App Store</p>
                </div>
              </div>
              <div className="bg-black border border-yellow-500/10 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-yellow-400/40 transition-all cursor-pointer">
                <FaGooglePlay className="text-white text-2xl flex-shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs">Get it on</p>
                  <p className="text-white font-bold text-sm">Google Play</p>
                </div>
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-white font-black text-xl mb-6 flex items-center gap-2">
              <FaMotorcycle className="text-yellow-400" /> Services
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Book Ride", to: "/booking" },
                { label: "Parcel Delivery", to: "/parcel" },
                { label: "Truck Booking", to: "/truck-booking" },
                { label: "Hotel Booking", to: "/hotels" },
                { label: "Luxury Villas", to: "/villas" },
                { label: "Airport Lounge", to: "/lounge" },
                { label: "House Shifting", to: "/house-shifting" },
                { label: "Rent Vehicle", to: "/rent-vehicle" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-white font-black text-xl mb-6 flex items-center gap-2">
              <FaBuilding className="text-yellow-400" /> Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", to: "/about" },
                { label: "Our Services", to: "/services" },
                { label: "Enterprise", to: "/enterprise" },
                { label: "Blog & Insights", to: "/blog" },
                { label: "Contact Us", to: "/contact" },
                { label: "Become a Driver", to: "/register" },
                { label: "Vendor Partner", to: "/register" },
                { label: "Live Tracking", to: "/tracking" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-black text-xl mb-6">Contact</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-400/10 text-yellow-400 p-3 rounded-xl mt-0.5">
                  <FaPhone />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Call Us</p>
                  <p className="text-white font-bold">+91 99999 99999</p>
                  <p className="text-white font-bold">+91 88888 88888</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-yellow-400/10 text-yellow-400 p-3 rounded-xl mt-0.5">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-white font-bold">support@bearride.com</p>
                  <p className="text-white font-bold">business@bearride.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-yellow-400/10 text-yellow-400 p-3 rounded-xl mt-0.5">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Office</p>
                  <p className="text-white font-bold">Cyber City, Gurugram</p>
                  <p className="text-gray-400">Haryana — 122002</p>
                </div>
              </div>
            </div>

            {/* TRUST BADGES */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="text-green-400 text-lg">✓</span> ISO Certified Platform
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="text-green-400 text-lg">✓</span> RBI Compliant Payments
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="text-green-400 text-lg">✓</span> Verified Driver Network
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-yellow-500/10">
        <div className="container-main px-5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 BearRide Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-yellow-400 transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-all">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400 transition-all">Cookie Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-all">Refund Policy</a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
