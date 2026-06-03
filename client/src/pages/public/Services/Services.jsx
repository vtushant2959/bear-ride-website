import { Link } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import {
  FaMotorcycle, FaCar, FaBox, FaTruck, FaPeopleCarry, FaBuilding,
  FaHotel, FaHome, FaPlane, FaArrowRight, FaCheckCircle, FaClock,
  FaShieldAlt, FaStar,
} from "react-icons/fa";
import FadeUp from "../../../components/animations/FadeUp";
import FadeLeft from "../../../components/animations/FadeLeft";
import FadeRight from "../../../components/animations/FadeRight";
import ScaleUp from "../../../components/animations/ScaleUp";

const SERVICES = [
  {
    title: "Bike Taxi",
    icon: <FaMotorcycle size={32} />,
    img: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=700&q=80",
    path: "/booking",
    color: "from-yellow-400 to-yellow-600",
    description: "Affordable and fast bike rides for quick urban transportation through busy city streets.",
    features: ["Instant booking", "Affordable pricing", "Live GPS tracking"],
    badge: "Most Popular",
    price: "From ₹10/km",
  },
  {
    title: "Cab Booking",
    icon: <FaCar size={32} />,
    img: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=700&q=80",
    path: "/booking",
    color: "from-blue-500 to-blue-700",
    description: "Comfortable and premium AC cab services for daily commuting and long-distance travel.",
    features: ["Premium rides", "Scheduled bookings", "24/7 availability"],
    badge: "Premium",
    price: "From ₹20/km",
  },
  {
    title: "Parcel Delivery",
    icon: <FaBox size={32} />,
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=700&q=80",
    path: "/parcel",
    color: "from-green-500 to-green-700",
    description: "Fast and secure parcel delivery across India with real-time tracking updates.",
    features: ["Same-day delivery", "Real-time parcel tracking", "Safe handling guarantee"],
    badge: "Same Day",
    price: "From ₹99",
  },
  {
    title: "Truck Booking",
    icon: <FaTruck size={32} />,
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&q=80",
    path: "/truck-booking",
    color: "from-orange-500 to-orange-700",
    description: "Commercial transportation and truck logistics for businesses and warehouse operations.",
    features: ["Mini trucks", "Heavy transport", "Business logistics"],
    badge: "Business",
    price: "From ₹15/km",
  },
  {
    title: "Hotel Booking",
    icon: <FaHotel size={32} />,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80",
    path: "/hotels",
    color: "from-pink-500 to-pink-700",
    description: "Discover luxury hotels, business stays and budget-friendly accommodations across India.",
    features: ["450+ premium hotels", "Instant confirmation", "Exclusive discounts"],
    badge: "Luxury",
    price: "From ₹999/night",
  },
  {
    title: "Luxury Villas",
    icon: <FaHome size={32} />,
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=700&q=80",
    path: "/villas",
    color: "from-purple-500 to-purple-700",
    description: "Premium villas, holiday homes and luxury stays in the most scenic locations.",
    features: ["Pool villas", "Private chef option", "Scenic locations"],
    badge: "Exclusive",
    price: "From ₹5,000/night",
  },
  {
    title: "Airport Lounge",
    icon: <FaPlane size={32} />,
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80",
    path: "/lounge",
    color: "from-cyan-500 to-cyan-700",
    description: "Premium airport lounge access at 45+ airports across India with complimentary amenities.",
    features: ["Free WiFi & meals", "45+ airports", "Family access"],
    badge: "Comfort",
    price: "From ₹850",
  },
  {
    title: "Packers & Movers",
    icon: <FaPeopleCarry size={32} />,
    img: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=700&q=80",
    path: "/house-shifting",
    color: "from-red-500 to-red-700",
    description: "Professional relocation and house shifting services across cities with safe packaging.",
    features: ["Home shifting", "Office relocation", "Safe packaging"],
    badge: "Reliable",
    price: "From ₹3,999",
  },
  {
    title: "Enterprise Fleet",
    icon: <FaBuilding size={32} />,
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80",
    path: "/enterprise",
    color: "from-emerald-500 to-emerald-700",
    description: "Advanced enterprise fleet and logistics management solutions for large organisations.",
    features: ["Fleet management", "Analytics dashboard", "Bulk operations"],
    badge: "B2B",
    price: "Custom pricing",
  },
];

function Services() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[70vh] bg-black overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1400&q=80"
            alt="Services"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        </div>

        <div className="container-main px-5 py-32 relative z-10">
          <FadeUp>
            <div className="max-w-5xl">
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-8">
                10 Services · One Platform
              </div>
              <h1 className="text-5xl md:text-8xl font-black leading-tight text-white mb-10">
                Smart Mobility &
                <span className="gradient-text block">Logistics Solutions</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-2xl leading-[50px] max-w-4xl">
                BearRide provides modern transportation, delivery, stays, and enterprise logistics
                solutions designed for speed, scalability, and seamless experiences.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* QUICK STATS BAR */}
      <div className="bg-yellow-400 py-6 px-5">
        <div className="container-main grid grid-cols-2 md:grid-cols-4 gap-8 text-black text-center">
          {[
            { val: "9 Services", label: "On One Platform" },
            { val: "100+ Cities", label: "Coverage" },
            { val: "1M+ Rides", label: "Completed" },
            { val: "4.9★", label: "Average Rating" },
          ].map((s) => (
            <div key={s.val}>
              <p className="text-2xl font-black">{s.val}</p>
              <p className="text-black/70 text-sm font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES GRID */}
      <section className="section-padding bg-zinc-950">
        <div className="container-main px-5">
          <FadeUp>
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black gradient-text mb-6">All Services</h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-9">
                One unified platform for rides, deliveries, logistics, stays and enterprise mobility.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {SERVICES.map((svc, i) => (
              <ScaleUp key={i}>
                <div className="group bg-black border border-yellow-500/10 rounded-[35px] overflow-hidden hover:border-yellow-400/40 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(250,204,21,0.1)] transition-all duration-500">

                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={svc.img}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full">
                      {svc.badge}
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm border border-yellow-500/20 rounded-xl px-3 py-2">
                      <p className="text-yellow-400 font-bold text-sm">{svc.price}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="bg-yellow-400 text-black p-3 rounded-xl">
                        {svc.icon}
                      </div>
                      <h2 className="text-2xl font-black">{svc.title}</h2>
                    </div>

                    <p className="text-gray-400 leading-7 mb-6 text-sm">{svc.description}</p>

                    <div className="space-y-2 mb-8">
                      {svc.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-3">
                          <FaCheckCircle className="text-yellow-400 text-sm flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{f}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={svc.path}
                      className="w-full flex items-center justify-center gap-3 bg-yellow-400 text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all duration-300"
                    >
                      Book Now <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </ScaleUp>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding bg-black">
        <div className="container-main px-5 grid lg:grid-cols-2 gap-16 items-center">
          <FadeLeft>
            <div>
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                Why BearRide
              </div>
              <h2 className="text-5xl font-black gradient-text mb-10">Why Choose BearRide?</h2>
              <p className="text-gray-400 text-lg leading-9 mb-12">
                We combine technology, speed, safety, and scalability to create
                premium transportation and logistics experiences that millions rely on.
              </p>
              <div className="space-y-8">
                {[
                  { icon: <FaClock />,    title: "Faster Operations",   desc: "Smart systems ensure quick bookings and dispatch in under 3 minutes." },
                  { icon: <FaShieldAlt />,title: "Secure Platform",     desc: "All drivers are verified and trips are safety-tracked in real-time." },
                  { icon: <FaTruck />,    title: "Scalable Logistics",  desc: "Enterprise-ready infrastructure that grows with your business." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="bg-yellow-400 text-black w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                      <p className="text-gray-400 leading-7">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeLeft>

          <FadeRight>
            <div className="relative">
              <div className="rounded-[40px] overflow-hidden border border-yellow-500/20">
                <img
                  src="https://images.unsplash.com/photo-1556742400-b5b7b99c2e02?w=800&q=80"
                  alt="Quality Service"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-[40px]" />
              </div>
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                <div className="bg-black/80 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-5 text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[1,2,3,4,5].map(s => <FaStar key={s} className="text-yellow-400 text-sm" />)}
                  </div>
                  <p className="text-white font-black text-xl">4.9 / 5</p>
                  <p className="text-gray-400 text-xs mt-1">250K+ Reviews</p>
                </div>
                <div className="bg-yellow-400 rounded-2xl p-5 text-center text-black">
                  <p className="font-black text-xl">99.2%</p>
                  <p className="text-black/70 text-xs mt-1">On-Time Delivery</p>
                </div>
              </div>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-zinc-950">
        <div className="container-main px-5">
          <FadeUp>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-[40px] p-14 md:p-20 text-black text-center">
              <h2 className="text-5xl md:text-6xl font-black mb-8">Ready To Experience BearRide?</h2>
              <p className="text-xl leading-9 max-w-3xl mx-auto mb-12 text-black/80">
                Join India's growing smart mobility and logistics ecosystem today.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <Link to="/booking" className="flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all">
                  Book a Ride <FaArrowRight />
                </Link>
                <Link to="/contact" className="flex items-center gap-3 border-2 border-black px-10 py-5 rounded-2xl font-bold hover:bg-black hover:text-white transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Services;
