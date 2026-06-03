import { Link } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import {
  FaMotorcycle, FaTruck, FaUsers, FaShieldAlt, FaGlobeAsia,
  FaRocket, FaCheckCircle, FaArrowRight, FaLinkedinIn,
} from "react-icons/fa";
import FadeUp from "../../../components/animations/FadeUp";
import FadeLeft from "../../../components/animations/FadeLeft";
import FadeRight from "../../../components/animations/FadeRight";
import ScaleUp from "../../../components/animations/ScaleUp";

const TEAM = [
  { name: "Arjun Kapoor",    role: "CEO & Co-Founder",          color: "bg-yellow-400",  linkedin: "#" },
  { name: "Sneha Verma",     role: "CTO & Co-Founder",          color: "bg-blue-400",    linkedin: "#" },
  { name: "Rohit Gupta",     role: "Head of Logistics",         color: "bg-green-400",   linkedin: "#" },
  { name: "Priya Sharma",    role: "VP Product",                color: "bg-pink-400",    linkedin: "#" },
  { name: "Karan Mehta",     role: "Head of Enterprise Sales",  color: "bg-purple-400",  linkedin: "#" },
  { name: "Ananya Singh",    role: "Chief Marketing Officer",   color: "bg-orange-400",  linkedin: "#" },
];

const TIMELINE = [
  { year: "2022", title: "BearRide Founded",          desc: "Started with bike taxi services in Delhi & Mumbai." },
  { year: "2023", title: "10 Cities Expansion",       desc: "Expanded to 10 cities with parcel delivery launch." },
  { year: "2024", title: "Enterprise Launch",         desc: "Launched enterprise fleet management and B2B logistics." },
  { year: "2025", title: "Hotels & Lifestyle Added",  desc: "Introduced hotel booking, villas, and airport lounge." },
  { year: "2026", title: "100+ Cities & 1M Rides",    desc: "Crossed 1 million rides across 100+ Indian cities." },
];

function About() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] bg-black overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400&q=90"
            alt="India City"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <div className="container-main px-5 py-32 relative z-10">
          <FadeUp>
            <div className="max-w-5xl">
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-8">
                Our Story
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-tight text-white mb-10">
                Building The Future Of
                <span className="gradient-text block">Urban Mobility</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-2xl leading-[50px] max-w-4xl mb-10">
                BearRide is India's next-generation mobility and logistics ecosystem designed to transform
                transportation, deliveries, and enterprise logistics through technology and premium experience.
              </p>
              <Link to="/register" className="inline-flex items-center gap-3 bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all">
                Join BearRide <FaArrowRight />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* MISSION + IMAGE */}
      <section className="section-padding bg-zinc-950">
        <div className="container-main px-5 grid lg:grid-cols-2 gap-16 items-center">
          <FadeLeft>
            <div className="relative">
              <div className="rounded-[40px] overflow-hidden border border-yellow-500/20 shadow-[0_0_80px_rgba(250,204,21,0.08)]">
                <img
                  src="https://images.unsplash.com/photo-1556742400-b5b7b99c2e02?w=900&q=80"
                  alt="BearRide Mission"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-[40px]" />
              </div>
              <div className="absolute top-8 left-8 bg-yellow-400 rounded-2xl px-6 py-5 text-black">
                <p className="font-black text-3xl">2022</p>
                <p className="font-bold text-sm">Founded</p>
              </div>
              <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md border border-yellow-500/20 rounded-2xl px-6 py-5 text-center">
                <p className="text-yellow-400 font-black text-3xl">1M+</p>
                <p className="text-gray-400 text-sm mt-1">Rides Completed</p>
              </div>
            </div>
          </FadeLeft>

          <FadeRight>
            <div>
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                Who We Are
              </div>
              <h2 className="text-5xl font-black gradient-text mb-8">Our Story & Mission</h2>

              <p className="text-gray-400 text-lg leading-9 mb-6">
                BearRide was created with one vision: to simplify transportation and logistics
                through one powerful digital ecosystem built for modern India.
              </p>
              <p className="text-gray-400 text-lg leading-9 mb-10">
                From bike rides and parcel deliveries to enterprise fleet management and luxury stays,
                BearRide combines speed, safety, technology and scalability into one seamless platform
                used by millions every day.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { icon: <FaMotorcycle />, title: "Smart Rides",  desc: "Affordable urban transport" },
                  { icon: <FaTruck />,      title: "Logistics",    desc: "End-to-end delivery" },
                  { icon: <FaShieldAlt />,  title: "Safety First", desc: "Verified partners" },
                  { icon: <FaRocket />,     title: "Innovation",   desc: "Tech-first platform" },
                ].map((item, i) => (
                  <div key={i} className="bg-black border border-yellow-500/10 rounded-2xl p-6 hover:border-yellow-400/30 transition-all">
                    <div className="bg-yellow-400 text-black w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="font-black text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="container-main px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-black text-center">
            {[
              { val: "1M+",  label: "Rides Completed" },
              { val: "50K+", label: "Drivers & Partners" },
              { val: "100+", label: "Cities Covered" },
              { val: "24/7", label: "Customer Support" },
            ].map((s) => (
              <div key={s.val}>
                <h3 className="text-5xl md:text-6xl font-black mb-3">{s.val}</h3>
                <p className="text-black/70 text-lg font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section-padding bg-black">
        <div className="container-main px-5">
          <FadeUp>
            <div className="text-center mb-20">
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                Our Journey
              </div>
              <h2 className="text-5xl font-black gradient-text mb-6">BearRide Timeline</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-9">
                From a small startup to India's fastest-growing mobility platform.
              </p>
            </div>
          </FadeUp>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-yellow-400/20 hidden lg:block" />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <FadeUp key={i}>
                  <div className={`flex items-center gap-8 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    <div className="lg:w-5/12">
                      <div className={`bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 hover:border-yellow-400/30 transition-all ${i % 2 === 0 ? "lg:text-right" : ""}`}>
                        <div className="bg-yellow-400 text-black inline-block px-4 py-2 rounded-xl font-black text-xl mb-4">{item.year}</div>
                        <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                        <p className="text-gray-400 leading-7">{item.desc}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex lg:w-2/12 justify-center">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full border-4 border-black shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
                    </div>

                    <div className="hidden lg:block lg:w-5/12" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section-padding bg-zinc-950">
        <div className="container-main px-5">
          <FadeUp>
            <div className="text-center mb-20">
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                The People Behind BearRide
              </div>
              <h2 className="text-5xl font-black gradient-text mb-6">Meet Our Team</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-9">
                A passionate team of engineers, designers, and business leaders building the future of mobility.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <ScaleUp key={i}>
                <div className="bg-black border border-yellow-500/10 rounded-3xl p-8 text-center hover:border-yellow-400/30 hover:-translate-y-2 transition-all duration-300 group">
                  <div className={`w-24 h-24 ${member.color} rounded-full flex items-center justify-center text-black text-4xl font-black mx-auto mb-6 group-hover:scale-110 transition-all duration-300`}>
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-2xl font-black mb-2">{member.name}</h3>
                  <p className="text-gray-400 mb-6">{member.role}</p>
                  <a
                    href={member.linkedin}
                    className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-all"
                  >
                    <FaLinkedinIn /> LinkedIn
                  </a>
                </div>
              </ScaleUp>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-padding bg-black">
        <div className="container-main px-5 grid lg:grid-cols-2 gap-16 items-center">
          <FadeLeft>
            <div className="bg-zinc-950 border border-yellow-500/20 rounded-[40px] p-12">
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                Our Values
              </div>
              <h2 className="text-5xl font-black gradient-text mb-10">Our Mission</h2>
              <p className="text-gray-400 text-lg leading-9 mb-10">
                To create a seamless, scalable, and intelligent mobility ecosystem that empowers
                millions of users, drivers, businesses, and enterprises across India.
              </p>
              <div className="space-y-6">
                {[
                  "Smart urban transportation for everyone",
                  "Fast, secure and affordable deliveries",
                  "Enterprise logistics transformation",
                  "AI-powered future mobility",
                  "Safety & transparency above all",
                ].map((v) => (
                  <div key={v} className="flex items-center gap-4">
                    <FaCheckCircle className="text-yellow-400 text-xl flex-shrink-0" />
                    <p className="text-gray-300 text-lg">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeLeft>

          <FadeRight>
            <div>
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                Why Us
              </div>
              <h2 className="text-5xl font-black gradient-text mb-10">Why BearRide?</h2>
              <div className="space-y-8">
                {[
                  { icon: <FaUsers />,     title: "Customer First",        desc: "We focus on creating seamless user experiences at every touchpoint." },
                  { icon: <FaGlobeAsia />, title: "Nationwide Expansion",  desc: "Expanding smart mobility solutions to every corner of India." },
                  { icon: <FaRocket />,    title: "Future Ready Platform", desc: "Building scalable AI-powered technology for next-gen transportation." },
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
          </FadeRight>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-zinc-950">
        <div className="container-main px-5">
          <FadeUp>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-[40px] p-14 md:p-20 text-black text-center">
              <h2 className="text-5xl md:text-6xl font-black mb-8">Join The BearRide Journey</h2>
              <p className="text-xl leading-9 max-w-3xl mx-auto mb-12 text-black/80">
                Experience smarter transportation, faster logistics, and next-generation mobility solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <Link to="/booking" className="flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all">
                  Book a Ride <FaArrowRight />
                </Link>
                <Link to="/register" className="flex items-center gap-3 border-2 border-black px-10 py-5 rounded-2xl font-bold hover:bg-black hover:text-white transition-all">
                  Become a Partner
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

export default About;
