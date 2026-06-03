import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import HeroSlider from "../../../components/Home/HeroSlider";
import FadeUp from "../../../components/animations/FadeUp";
import FadeLeft from "../../../components/animations/FadeLeft";
import FadeRight from "../../../components/animations/FadeRight";
import ScaleUp from "../../../components/animations/ScaleUp";
import Floating from "../../../components/animations/Floating";
import {
  FaMotorcycle, FaTruck, FaMapMarkedAlt, FaBuilding, FaArrowRight,
  FaStar, FaUsers, FaShieldAlt, FaClock, FaBox, FaHotel, FaHome as FaHomeIcon,
  FaPlane, FaRoad, FaCheckCircle, FaMobileAlt, FaBolt, FaHeadset,
} from "react-icons/fa";

/* ─── Animated counter hook ─── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─── CounterCard ─── */
function CounterCard({ value, suffix, label, color }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCounter(value, 2200, visible);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center">
      <h2 className={`text-5xl md:text-6xl font-black count-glow ${color}`}>
        {count.toLocaleString()}{suffix}
      </h2>
      <p className="text-gray-400 mt-3 text-lg">{label}</p>
    </div>
  );
}

/* ─── Service images from Unsplash ─── */
const SERVICES = [
  { title: "Bike Taxi",        icon: <FaMotorcycle size={26}/>, img: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=600&q=80",       path: "/booking",        badge: "Most Popular" },
  { title: "Cab Booking",      icon: <FaRoad size={26}/>,       img: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80",       path: "/booking",        badge: "Premium" },
  { title: "Parcel Delivery",  icon: <FaBox size={26}/>,        img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80",       path: "/parcel",         badge: "Same Day" },
  { title: "Truck Logistics",  icon: <FaTruck size={26}/>,      img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",       path: "/truck-booking",  badge: "Business" },
  { title: "Hotel Booking",    icon: <FaHotel size={26}/>,      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",       path: "/hotels",         badge: "Luxury" },
  { title: "Luxury Villas",    icon: <FaHomeIcon size={26}/>,   img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",       path: "/villas",         badge: "Premium" },
  { title: "Airport Lounge",   icon: <FaPlane size={26}/>,      img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",       path: "/lounge",         badge: "Comfort" },
  { title: "Enterprise Fleet", icon: <FaBuilding size={26}/>,   img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",       path: "/enterprise",     badge: "B2B" },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  { name: "Rahul Sharma",  role: "Regular Customer",     rating: 5, city: "Mumbai",    color: "bg-yellow-400",  text: "BearRide is hands-down the best ride platform I've used. Instant booking, clean cabs, and the driver tracking is super accurate. Won't use anything else!" },
  { name: "Priya Mehta",   role: "Business Traveller",   rating: 5, city: "Delhi",     color: "bg-green-400",   text: "I use BearRide for all my airport trips. The lounge booking feature is genius — booked a lounge and a cab to the terminal all in one app. Absolutely love it." },
  { name: "Aman Verma",    role: "Logistics Manager",    rating: 5, city: "Bangalore", color: "bg-blue-400",    text: "We moved our entire fleet operations to BearRide Enterprise. The dashboard is clean, driver management is smooth, and support is always available." },
  { name: "Sneha Kapoor",  role: "Freelancer",           rating: 5, city: "Pune",      color: "bg-pink-400",    text: "Parcel delivery is so easy now. I send packages daily for my business and BearRide always delivers on time with real-time tracking. Highly recommended!" },
  { name: "Vikram Singh",  role: "Hotel Owner",          rating: 5, city: "Jaipur",    color: "bg-purple-400",  text: "We partnered with BearRide for our hotel transfers. The API integration was seamless and our guests absolutely love the premium ride experience." },
  { name: "Anjali Nair",   role: "Startup Founder",      rating: 5, city: "Hyderabad", color: "bg-orange-400",  text: "Used BearRide for our entire office relocation. House shifting service was professional, on time, and cost half of what competitors quoted. Mind-blowing value!" },
];

/* ─── Cities ─── */
const CITIES = ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Pune","Kolkata","Ahmedabad","Jaipur","Chandigarh","Lucknow","Surat","Nagpur","Indore","Bhopal","Visakhapatnam","Coimbatore","Vadodara","Kochi","Guwahati"];

const HOW_IT_WORKS = [
  { step: "01", icon: <FaMobileAlt className="text-4xl text-yellow-400"/>, title: "Download & Register", desc: "Create your BearRide account in under 60 seconds using your phone number. Choose your role — Customer, Driver, or Vendor.", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80" },
  { step: "02", icon: <FaMapMarkedAlt className="text-4xl text-yellow-400"/>, title: "Choose Your Service", desc: "Pick from Bike, Auto, Cab, Parcel, Truck, Hotels, Villas, Lounge, House Shifting, or Enterprise Fleet.", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80" },
  { step: "03", icon: <FaBolt className="text-4xl text-yellow-400"/>, title: "Book Instantly", desc: "Set your pickup & destination. Get real-time fare estimates, choose your ride type, and confirm in one tap.", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&q=80" },
];

function Home() {
  return (
    <>
      <Navbar />

      {/* ═══════════════════════════════
          HERO SECTION
      ═══════════════════════════════ */}
      <section className="min-h-screen bg-black flex items-center overflow-hidden relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-[700px] h-[700px] bg-yellow-400/5 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container-main grid lg:grid-cols-2 gap-12 items-center px-5 py-24 relative z-10">

          {/* LEFT */}
          <FadeLeft>
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-8 badge-pulse">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                India's Premium Ride & Logistics Platform
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight text-white mb-6">
                Ride. Deliver. Move.
                <span className="gradient-text block">Everything Smarter.</span>
              </h1>

              <p className="text-gray-400 text-lg md:text-xl leading-9 max-w-xl mb-10">
                BearRide combines ride booking, parcel delivery, truck logistics,
                enterprise transport, hotels, villas, and smart mobility into one
                seamless ecosystem.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/booking" className="flex items-center gap-3 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(250,204,21,0.3)]">
                  <FaMotorcycle /> Book a Ride
                </Link>
                <Link to="/register" className="flex items-center gap-3 border border-yellow-400 text-yellow-400 px-8 py-4 rounded-2xl font-black hover:bg-yellow-400 hover:text-black transition-all duration-300">
                  Become a Partner <FaArrowRight />
                </Link>
              </div>

              {/* QUICK FEATURE PILLS */}
              <div className="flex flex-wrap gap-3">
                {["🔒 Safe & Verified", "⚡ Instant Booking", "📍 Live Tracking", "💳 Easy Payments"].map((f) => (
                  <span key={f} className="bg-zinc-900 border border-yellow-500/10 px-4 py-2 rounded-full text-gray-300 text-sm font-medium">{f}</span>
                ))}
              </div>
            </div>
          </FadeLeft>

          {/* RIGHT — hero image collage */}
          <FadeRight>
            <div className="relative hidden lg:block">
              {/* Main image */}
              <div className="relative rounded-[40px] overflow-hidden border border-yellow-500/20 shadow-[0_0_80px_rgba(250,204,21,0.1)]">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=90"
                  alt="BearRide Mobility"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="bg-black/80 backdrop-blur-md border border-yellow-500/20 rounded-2xl px-5 py-4">
                    <p className="text-gray-400 text-xs mb-1">Active Rides Right Now</p>
                    <p className="text-yellow-400 font-black text-2xl">12,480+</p>
                  </div>
                  <div className="bg-yellow-400 rounded-2xl px-5 py-4 text-black">
                    <p className="text-xs font-bold mb-1">Driver Response</p>
                    <p className="font-black text-2xl">~2 min</p>
                  </div>
                </div>
              </div>

              {/* Floating card — top right */}
              <Floating>
                <div className="absolute -top-6 -right-6 bg-black border border-yellow-500/20 rounded-2xl px-5 py-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-black">R</div>
                    <div>
                      <p className="font-bold text-sm">Rahul (Driver)</p>
                      <p className="text-green-400 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> Online now</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    {[1,2,3,4,5].map(s => <FaStar key={s} className="text-yellow-400 text-xs" />)}
                    <span className="text-gray-400 text-xs ml-1">4.98</span>
                  </div>
                </div>
              </Floating>

              {/* Floating card — bottom left */}
              <Floating>
                <div className="absolute -bottom-4 -left-6 bg-black border border-yellow-500/20 rounded-2xl px-5 py-4 shadow-xl">
                  <p className="text-gray-400 text-xs mb-2">Estimated Fare</p>
                  <p className="text-yellow-400 font-black text-3xl">₹149</p>
                  <p className="text-gray-500 text-xs mt-1">Andheri → BKC · 12 km</p>
                </div>
              </Floating>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* ═══════════════════════════════
          CITIES MARQUEE
      ═══════════════════════════════ */}
      <div className="bg-yellow-400 py-4 overflow-hidden">
        <div className="marquee-track">
          {[...CITIES, ...CITIES].map((city, i) => (
            <div key={i} className="flex items-center gap-2 px-8 text-black font-black text-lg whitespace-nowrap">
              <span>📍</span> {city}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════
          HERO SLIDER (banners)
      ═══════════════════════════════ */}
      <HeroSlider />

      {/* ═══════════════════════════════
          SERVICES GRID — with images
      ═══════════════════════════════ */}
      <section className="section-padding bg-zinc-950">
        <div className="container-main px-5">
          <FadeUp>
            <div className="text-center mb-20">
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                Everything In One App
              </div>
              <h2 className="text-5xl md:text-6xl font-black gradient-text mb-6">Our Services</h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-9">
                One powerful platform for mobility, logistics, deliveries, stays and enterprise transport.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {SERVICES.map((svc, i) => (
              <ScaleUp key={i}>
                <Link
                  to={svc.path}
                  className="group relative rounded-3xl overflow-hidden border border-yellow-500/10 hover:border-yellow-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(250,204,21,0.15)] card-shine block"
                >
                  {/* Image */}
                  <div className="h-52 overflow-hidden">
                    <img
                      src={svc.img}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full">
                    {svc.badge}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-yellow-400 text-black p-2 rounded-xl">
                        {svc.icon}
                      </div>
                      <h3 className="text-xl font-black text-white">{svc.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Book Now <FaArrowRight className="text-xs" />
                    </div>
                  </div>
                </Link>
              </ScaleUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════ */}
      <section className="section-padding bg-black">
        <div className="container-main px-5">
          <FadeUp>
            <div className="text-center mb-20">
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                Simple 3-Step Process
              </div>
              <h2 className="text-5xl md:text-6xl font-black gradient-text mb-6">How It Works</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-9">
                Getting started with BearRide takes less than a minute.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <FadeUp key={i}>
                <div className="relative">
                  {/* Connector line */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-[120px] left-[calc(100%-16px)] w-8 border-t-2 border-dashed border-yellow-400/30 z-10" />
                  )}

                  <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden hover:border-yellow-400/30 transition-all duration-300 hover:-translate-y-2">
                    {/* Step image */}
                    <div className="h-48 overflow-hidden relative">
                      <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                      {/* Step number */}
                      <div className="absolute top-4 left-4 text-7xl font-black text-yellow-400/20 leading-none">{step.step}</div>
                    </div>

                    <div className="p-8">
                      <div className="mb-4">{step.icon}</div>
                      <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                      <p className="text-gray-400 leading-8">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          STATS COUNTER
      ═══════════════════════════════ */}
      <section className="py-24 bg-gradient-to-r from-yellow-400 to-yellow-500 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-black rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full blur-[100px]" />
        </div>
        <div className="container-main px-5 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <CounterCard value={1000000}  suffix="+" label="Rides Completed"    color="text-black" />
            <CounterCard value={50000}    suffix="+"  label="Driver Partners"    color="text-black" />
            <CounterCard value={100}      suffix="+"  label="Cities Covered"     color="text-black" />
            <CounterCard value={4800000}  suffix="+"  label="Happy Customers"    color="text-black" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          CHOOSE YOUR RIDE — Vehicle Showcase
      ═══════════════════════════════ */}
      <section className="section-padding bg-zinc-950 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-400/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="container-main px-5 relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-5">
                Pick Your Ride
              </div>
              <h2 className="text-5xl md:text-6xl font-black gradient-text mb-5">Choose Your Vehicle</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-9">
                From budget bike rides to premium AC cabs — BearRide has the right vehicle for every trip.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                type: "BIKE",
                name: "BearBike",
                tagline: "Fastest in the city",
                price: "₹10/km",
                minFare: "₹20 min fare",
                eta: "~2 min arrival",
                badge: "Most Popular",
                badgeColor: "bg-yellow-400 text-black",
                img: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=700&q=90",
                features: ["Beat traffic", "Instant pickup", "Eco-friendly"],
                borderColor: "hover:border-yellow-400",
              },
              {
                type: "AUTO",
                name: "BearAuto",
                tagline: "Affordable & comfortable",
                price: "₹15/km",
                minFare: "₹30 min fare",
                eta: "~4 min arrival",
                badge: "Best Value",
                badgeColor: "bg-green-400 text-black",
                img: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=700&q=90",
                features: ["3-seat comfort", "Open air rides", "City travel"],
                borderColor: "hover:border-green-400",
              },
              {
                type: "CAB",
                name: "BearCab",
                tagline: "Premium AC experience",
                price: "₹20/km",
                minFare: "₹50 min fare",
                eta: "~6 min arrival",
                badge: "Premium",
                badgeColor: "bg-blue-400 text-white",
                img: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=700&q=90",
                features: ["Full AC cabin", "4 passengers", "Business rides"],
                borderColor: "hover:border-blue-400",
              },
            ].map((v, i) => (
              <ScaleUp key={i}>
                <div className={`group bg-black border border-yellow-500/10 rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_60px_rgba(250,204,21,0.12)] ${v.borderColor}`}>

                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Badge */}
                    <span className={`absolute top-4 right-4 ${v.badgeColor} text-xs font-black px-3 py-1.5 rounded-full`}>{v.badge}</span>

                    {/* Vehicle name overlay */}
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-black text-2xl">{v.name}</p>
                      <p className="text-gray-300 text-sm">{v.tagline}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-yellow-400 font-black text-3xl">{v.price}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{v.minFare}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{v.eta}</p>
                        <div className="flex items-center gap-1 mt-1 justify-end">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-green-400 text-xs font-bold">Available</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {v.features.map((f) => (
                        <div key={f} className="flex items-center gap-3">
                          <FaCheckCircle className="text-yellow-400 text-sm flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      to="/booking"
                      className="flex items-center justify-center gap-3 w-full bg-yellow-400 text-black py-4 rounded-2xl font-black hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.15)]"
                    >
                      Book {v.name} <FaArrowRight className="text-sm" />
                    </Link>
                  </div>
                </div>
              </ScaleUp>
            ))}
          </div>

          {/* Bottom promo strip */}
          <FadeUp>
            <div className="mt-12 bg-gradient-to-r from-yellow-400/10 via-yellow-400/5 to-yellow-400/10 border border-yellow-400/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🎁</span>
                <div>
                  <p className="font-black text-xl">First Ride Free!</p>
                  <p className="text-gray-400 text-sm">New users get ₹100 off their first BearRide booking</p>
                </div>
              </div>
              <Link to="/register" className="flex-shrink-0 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all">
                Claim Offer →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════
          WHY CHOOSE US — with image
      ═══════════════════════════════ */}
      <section className="section-padding bg-zinc-950">
        <div className="container-main px-5 grid lg:grid-cols-2 gap-16 items-center">

          <FadeLeft>
            <div className="relative">
              <div className="rounded-[40px] overflow-hidden border border-yellow-500/20 shadow-[0_0_80px_rgba(250,204,21,0.08)]">
                <img
                  src="https://images.unsplash.com/photo-1556742400-b5b7b99c2e02?w=800&q=80"
                  alt="Why BearRide"
                  className="w-full h-[550px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-[40px]" />
              </div>
              {/* Overlay stats */}
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                <div className="bg-black/80 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-5 text-center">
                  <p className="text-yellow-400 font-black text-3xl">99.2%</p>
                  <p className="text-gray-400 text-sm mt-1">On-Time Rate</p>
                </div>
                <div className="bg-yellow-400 rounded-2xl p-5 text-center text-black">
                  <p className="font-black text-3xl">4.9★</p>
                  <p className="text-black/70 text-sm mt-1">Avg Rating</p>
                </div>
              </div>
            </div>
          </FadeLeft>

          <FadeRight>
            <div>
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                Why 5 Million+ Users Trust Us
              </div>
              <h2 className="text-5xl font-black gradient-text mb-8">
                Why Choose BearRide?
              </h2>
              <p className="text-gray-400 text-lg leading-9 mb-12">
                Built for modern India, BearRide delivers premium mobility and logistics
                experiences powered by technology, safety, and scalability.
              </p>

              <div className="space-y-6">
                {[
                  { icon: <FaClock />,    title: "Lightning Fast Response",  desc: "Average driver arrives in under 3 minutes." },
                  { icon: <FaShieldAlt />, title: "100% Verified Drivers",   desc: "All partners background-checked and trained." },
                  { icon: <FaUsers />,    title: "50K+ Driver Network",      desc: "Massive fleet across 100+ Indian cities." },
                  { icon: <FaHeadset />,  title: "24/7 Live Support",        desc: "Human support team always available." },
                  { icon: <FaCheckCircle />, title: "Transparent Pricing",   desc: "No surge pricing, no hidden charges." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="bg-yellow-400 text-black w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-1">{item.title}</h3>
                      <p className="text-gray-400 leading-7">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* ═══════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════ */}
      <section className="section-padding bg-black">
        <div className="container-main px-5">
          <FadeUp>
            <div className="text-center mb-20">
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                Real Reviews
              </div>
              <h2 className="text-5xl md:text-6xl font-black gradient-text mb-6">What Our Users Say</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-9">
                Over 5 million happy users across India trust BearRide every day.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <ScaleUp key={i}>
                <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 hover:border-yellow-400/30 hover:-translate-y-2 transition-all duration-300 relative card-shine">
                  {/* Quote icon */}
                  <div className="text-yellow-400/20 text-8xl font-black absolute top-4 right-6 leading-none">"</div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, s) => (
                      <FaStar key={s} className="text-yellow-400 text-sm" />
                    ))}
                  </div>

                  <p className="text-gray-300 leading-8 mb-8 relative z-10">"{t.text}"</p>

                  <div className="flex items-center gap-4 pt-6 border-t border-yellow-500/10">
                    <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-black font-black text-xl`}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-white">{t.name}</p>
                      <p className="text-gray-500 text-sm">{t.role} · {t.city}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-green-400 text-xs font-bold bg-green-400/10 px-3 py-1 rounded-full">✓ Verified</span>
                    </div>
                  </div>
                </div>
              </ScaleUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          ENTERPRISE SECTION — with image
      ═══════════════════════════════ */}
      <section className="section-padding bg-zinc-950">
        <div className="container-main px-5 grid lg:grid-cols-2 gap-16 items-center">
          <FadeLeft>
            <div>
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                Enterprise Solutions
              </div>
              <h2 className="text-5xl font-black gradient-text mb-8">Enterprise Logistics</h2>
              <p className="text-gray-400 text-lg leading-9 mb-10">
                Manage transportation, fleet operations, commercial deliveries,
                and warehouse logistics through BearRide's scalable enterprise ecosystem.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Fleet Management Dashboard",
                  "Bulk Delivery Operations",
                  "Dedicated Business Account Manager",
                  "Smart Route Optimization AI",
                  "Real-time Analytics & Reports",
                  "API Integration Support",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-4">
                    <FaCheckCircle className="text-yellow-400 flex-shrink-0" />
                    <span className="text-gray-300">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/enterprise" className="inline-flex items-center gap-3 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
                Explore Enterprise <FaArrowRight />
              </Link>
            </div>
          </FadeLeft>

          <FadeRight>
            <div className="relative">
              <div className="rounded-[40px] overflow-hidden border border-yellow-500/20">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                  alt="Enterprise Logistics"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-[40px]" />
              </div>
              <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-5">
                <p className="text-gray-400 text-xs mb-1">Active Fleets</p>
                <p className="text-yellow-400 font-black text-2xl">3,240+</p>
              </div>
              <div className="absolute bottom-6 right-6 bg-yellow-400 rounded-2xl p-5 text-black text-center">
                <p className="font-black text-2xl">₹2.4Cr+</p>
                <p className="text-black/70 text-xs mt-1">Saved Monthly</p>
              </div>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* ═══════════════════════════════
          APP DOWNLOAD
      ═══════════════════════════════ */}
      <section className="section-padding bg-black overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent pointer-events-none" />
        <div className="container-main px-5 relative z-10">
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-yellow-500/20 rounded-[50px] p-12 md:p-20 overflow-hidden relative">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400/5 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-400/5 rounded-full" />

            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                  Coming Soon on Mobile
                </div>
                <h2 className="text-5xl md:text-6xl font-black mb-8">
                  Download The <span className="gradient-text">BearRide App</span>
                </h2>
                <p className="text-gray-400 text-lg leading-9 mb-10">
                  Get the full BearRide experience on your smartphone.
                  Book rides, track deliveries, manage your business —
                  all from the palm of your hand.
                </p>
                <div className="flex flex-wrap gap-5">
                  <button className="flex items-center gap-4 bg-white text-black px-7 py-4 rounded-2xl font-bold hover:scale-105 transition-all">
                    <span className="text-3xl">🍎</span>
                    <div className="text-left">
                      <p className="text-xs text-gray-500">Download on</p>
                      <p className="font-black">App Store</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-4 bg-white text-black px-7 py-4 rounded-2xl font-bold hover:scale-105 transition-all">
                    <span className="text-3xl">▶</span>
                    <div className="text-left">
                      <p className="text-xs text-gray-500">Get it on</p>
                      <p className="font-black">Google Play</p>
                    </div>
                  </button>
                </div>
                <div className="flex items-center gap-6 mt-8">
                  <div className="flex -space-x-3">
                    {["bg-yellow-400","bg-green-400","bg-blue-400","bg-pink-400"].map((c,i) => (
                      <div key={i} className={`w-10 h-10 rounded-full ${c} border-2 border-zinc-900 flex items-center justify-center text-black font-black text-sm`}>
                        {["R","P","A","S"][i]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <FaStar key={s} className="text-yellow-400 text-sm" />)}
                    </div>
                    <p className="text-gray-400 text-sm">4.9 · 250K+ Reviews</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80"
                    alt="BearRide App"
                    className="w-72 rounded-[40px] border-4 border-yellow-400/20 shadow-[0_0_80px_rgba(250,204,21,0.15)]"
                  />
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-black rounded-2xl px-4 py-3 font-black text-sm shadow-lg">
                    🚀 Live Now
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-black border border-yellow-500/20 rounded-2xl px-4 py-3 shadow-lg">
                    <p className="text-yellow-400 font-black">₹0 Surge</p>
                    <p className="text-gray-400 text-xs">Zero surge pricing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          BLOG SECTION
      ═══════════════════════════════ */}
      <section className="section-padding bg-zinc-950">
        <div className="container-main px-5">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
              <div>
                <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                  Latest Insights
                </div>
                <h2 className="text-5xl font-black gradient-text mb-5">News & Insights</h2>
                <p className="text-gray-400 text-lg">Mobility trends, logistics news and tech updates.</p>
              </div>
              <Link to="/blog" className="mt-6 md:mt-0 flex items-center gap-2 text-yellow-400 font-black hover:gap-4 transition-all">
                View All Articles <FaArrowRight />
              </Link>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[
              { title: "Future of Smart Deliveries in India",         cat: "Logistics",  img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",  mins: 5 },
              { title: "Why Bike Taxi Services Are Growing Rapidly",  cat: "Mobility",   img: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=600&q=80",   mins: 4 },
              { title: "Enterprise Fleet Management Revolution",      cat: "Enterprise", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", mins: 6 },
            ].map((post, i) => (
              <ScaleUp key={i}>
                <div className="bg-black rounded-3xl overflow-hidden border border-yellow-500/10 hover:border-yellow-400 hover:-translate-y-3 hover:shadow-[0_0_50px_rgba(250,204,21,0.12)] transition-all duration-400 group">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full">{post.cat}</div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <FaClock /> <span>{post.mins} min read</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4 group-hover:text-yellow-400 transition-all duration-300 leading-tight">{post.title}</h3>
                    <button className="text-yellow-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                      Read More <FaArrowRight className="text-sm" />
                    </button>
                  </div>
                </div>
              </ScaleUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          FINAL CTA
      ═══════════════════════════════ */}
      <section className="section-padding bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400&q=80"
            alt="India City"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container-main px-5 relative z-10">
          <FadeUp>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-[50px] p-14 md:p-20 text-black text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-[80px]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                  Ready to Ride with BearRide?
                </h2>
                <p className="text-xl leading-9 max-w-3xl mx-auto mb-12 text-black/80">
                  Join 5 million+ Indians on India's next-generation mobility and logistics platform.
                  Ride faster, deliver smarter, scale bigger.
                </p>
                <div className="flex flex-wrap justify-center gap-5">
                  <Link to="/booking" className="flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all duration-300">
                    <FaMotorcycle /> Book a Ride Now
                  </Link>
                  <Link to="/register" className="flex items-center gap-3 border-2 border-black px-10 py-5 rounded-2xl font-black hover:bg-black hover:text-white transition-all duration-300">
                    Become a Partner <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
