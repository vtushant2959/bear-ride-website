import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaWhatsapp, FaArrowRight, FaCheckCircle,
} from "react-icons/fa";
import FadeUp from "../../../components/animations/FadeUp";
import FadeLeft from "../../../components/animations/FadeLeft";
import FadeRight from "../../../components/animations/FadeRight";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative bg-black py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1400&q=80"
            alt="Contact"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black" />
        </div>
        <div className="container-main px-5 text-center relative z-10">
          <FadeUp>
            <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-8">
              We'd Love to Hear From You
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8">
              Contact <span className="gradient-text">BearRide</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-9">
              Reach us for rides, logistics, enterprise solutions, partnerships, or customer support.
              Our team responds within 2 hours.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="bg-zinc-950 py-16">
        <div className="container-main px-5">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                icon: <FaPhoneAlt className="text-3xl" />,
                title: "Call Us",
                lines: ["+91 99999 99999", "+91 88888 88888"],
                color: "bg-yellow-400",
                action: "Call Now",
              },
              {
                icon: <FaEnvelope className="text-3xl" />,
                title: "Email Us",
                lines: ["support@bearride.com", "business@bearride.com"],
                color: "bg-blue-500",
                action: "Send Email",
              },
              {
                icon: <FaWhatsapp className="text-3xl" />,
                title: "WhatsApp",
                lines: ["+91 99999 99999", "Available 24/7"],
                color: "bg-green-500",
                action: "Chat Now",
              },
              {
                icon: <FaMapMarkerAlt className="text-3xl" />,
                title: "Visit Us",
                lines: ["Cyber City, Gurugram", "Haryana — 122002"],
                color: "bg-purple-500",
                action: "Get Directions",
              },
            ].map((card, i) => (
              <FadeUp key={i}>
                <div className="bg-black border border-yellow-500/10 rounded-3xl p-8 hover:border-yellow-400/30 hover:-translate-y-2 transition-all duration-300 group">
                  <div className={`w-16 h-16 ${card.color} text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all`}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4">{card.title}</h3>
                  {card.lines.map((line, li) => (
                    <p key={li} className="text-gray-400 leading-8">{line}</p>
                  ))}
                  <button className="mt-5 text-yellow-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    {card.action} <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="section-padding bg-black">
        <div className="container-main px-5 grid lg:grid-cols-2 gap-12 items-start">

          {/* FORM */}
          <FadeLeft>
            <div className="bg-zinc-950 border border-yellow-500/20 rounded-[40px] p-10 md:p-12">
              <div className="mb-10">
                <h2 className="text-4xl font-black gradient-text mb-3">Send Us a Message</h2>
                <p className="text-gray-400">We'll respond within 2 business hours.</p>
              </div>

              {submitted ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
                  <FaCheckCircle className="text-green-400 text-5xl mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-green-400 mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We'll get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-gray-400 text-sm font-medium">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Rahul Sharma"
                        className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-4 outline-none text-white focus:border-yellow-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-gray-400 text-sm font-medium">Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-4 outline-none text-white focus:border-yellow-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-400 text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-4 outline-none text-white focus:border-yellow-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-400 text-sm font-medium">Inquiry Type *</label>
                    <select className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-4 outline-none text-white focus:border-yellow-400 transition-all">
                      <option>Select Inquiry Type</option>
                      <option>Ride Support</option>
                      <option>Parcel Delivery</option>
                      <option>Business Logistics</option>
                      <option>Driver Partnership</option>
                      <option>Enterprise Services</option>
                      <option>Hotel / Villa Booking</option>
                      <option>General Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-400 text-sm font-medium">Your Message *</label>
                    <textarea
                      required
                      rows="5"
                      placeholder="Tell us how we can help you..."
                      className="w-full bg-black border border-yellow-500/20 rounded-2xl px-6 py-4 outline-none resize-none text-white focus:border-yellow-400 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-yellow-400 text-black py-5 rounded-2xl text-lg font-black hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(250,204,21,0.2)]"
                  >
                    Send Message <FaArrowRight />
                  </button>
                </form>
              )}
            </div>
          </FadeLeft>

          {/* RIGHT SIDE */}
          <FadeRight>
            <div className="space-y-8">
              {/* Map placeholder with real background */}
              <div className="rounded-[40px] overflow-hidden border border-yellow-500/20 relative h-72">
                <img
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80"
                  alt="Office Location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                  <div className="bg-yellow-400 rounded-full p-4 mb-4 shadow-lg">
                    <FaMapMarkerAlt className="text-black text-3xl" />
                  </div>
                  <p className="text-white font-black text-xl">BearRide HQ</p>
                  <p className="text-gray-300 text-sm mt-1">Cyber City, Gurugram, Haryana</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Working hours */}
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-yellow-400/10 text-yellow-400 p-3 rounded-xl">
                    <FaClock className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-black">Working Hours</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "Customer Support", time: "24/7 — Always Available" },
                    { day: "Business Enquiries", time: "Mon–Sat, 9:00 AM – 7:00 PM" },
                    { day: "Emergency Helpline", time: "24/7 — +91 1800-BEARRIDE" },
                  ].map((item) => (
                    <div key={item.day} className="flex items-center justify-between py-3 border-b border-yellow-500/5 last:border-0">
                      <span className="text-gray-400">{item.day}</span>
                      <span className="font-bold text-yellow-400 text-sm">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8">
                <h3 className="text-2xl font-black mb-6">Quick Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Book a Ride", to: "/booking" },
                    { label: "Driver Support", to: "/register" },
                    { label: "Enterprise", to: "/enterprise" },
                    { label: "Track Order", to: "/tracking" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="flex items-center gap-2 bg-black border border-yellow-500/10 rounded-xl px-4 py-3 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/40 transition-all text-sm font-medium"
                    >
                      <FaArrowRight className="text-xs" /> {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </FadeRight>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
