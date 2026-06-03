import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";

import {
  FaBuilding,
  FaTruckMoving,
  FaChartLine,
  FaWarehouse,
  FaRoute,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

function Enterprise() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-screen bg-black text-white flex items-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent"></div>

        <div className="container-main px-5 py-24 relative z-10">

          <div className="max-w-4xl">
            <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-8">
              Enterprise Logistics Solutions
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Smart Logistics
              <span className="gradient-text block">
                For Modern Businesses
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl leading-9 mt-10 max-w-3xl">
              BearRide Enterprise helps businesses manage fleet operations,
              bulk deliveries, transportation systems, warehouse logistics,
              and real-time tracking through one scalable ecosystem.
            </p>

            <div className="flex flex-wrap gap-5 mt-12">
              <button className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
                Schedule Demo
              </button>

              <button className="border border-yellow-400 text-yellow-400 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="section-padding bg-zinc-950 text-white">
        <div className="container-main">

          <div className="text-center mb-20">
            <h2 className="text-5xl font-black gradient-text mb-6">
              Enterprise Features
            </h2>

            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-9">
              Advanced logistics infrastructure designed for startups,
              enterprises, warehouses, e-commerce brands, and corporations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

            <div className="bg-black border border-yellow-500/20 rounded-3xl p-10">
              <div className="bg-yellow-400 text-black w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                <FaTruckMoving size={35} />
              </div>

              <h3 className="text-3xl font-black mb-5">
                Fleet Management
              </h3>

              <p className="text-gray-400 leading-8">
                Manage commercial fleets with live tracking,
                analytics, and smart route optimization.
              </p>
            </div>

            <div className="bg-black border border-yellow-500/20 rounded-3xl p-10">
              <div className="bg-yellow-400 text-black w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                <FaWarehouse size={35} />
              </div>

              <h3 className="text-3xl font-black mb-5">
                Warehouse Logistics
              </h3>

              <p className="text-gray-400 leading-8">
                Simplify inventory movement and warehouse transportation
                operations efficiently.
              </p>
            </div>

            <div className="bg-black border border-yellow-500/20 rounded-3xl p-10">
              <div className="bg-yellow-400 text-black w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                <FaChartLine size={35} />
              </div>

              <h3 className="text-3xl font-black mb-5">
                Analytics Dashboard
              </h3>

              <p className="text-gray-400 leading-8">
                Monitor deliveries, fleet efficiency,
                revenue, and performance metrics in real-time.
              </p>
            </div>

            <div className="bg-black border border-yellow-500/20 rounded-3xl p-10">
              <div className="bg-yellow-400 text-black w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                <FaRoute size={35} />
              </div>

              <h3 className="text-3xl font-black mb-5">
                Smart Routing
              </h3>

              <p className="text-gray-400 leading-8">
                AI-powered route optimization reduces delivery
                time and operational costs.
              </p>
            </div>

            <div className="bg-black border border-yellow-500/20 rounded-3xl p-10">
              <div className="bg-yellow-400 text-black w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                <FaShieldAlt size={35} />
              </div>

              <h3 className="text-3xl font-black mb-5">
                Secure Operations
              </h3>

              <p className="text-gray-400 leading-8">
                Enterprise-grade security and operational reliability
                for critical logistics infrastructure.
              </p>
            </div>

            <div className="bg-black border border-yellow-500/20 rounded-3xl p-10">
              <div className="bg-yellow-400 text-black w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                <FaBuilding size={35} />
              </div>

              <h3 className="text-3xl font-black mb-5">
                Dedicated Support
              </h3>

              <p className="text-gray-400 leading-8">
                Dedicated account managers and business support
                for enterprise clients.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding bg-black text-white">
        <div className="container-main grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-5xl font-black gradient-text mb-10">
              Why Businesses Choose BearRide
            </h2>

            <div className="space-y-8">

              <div className="flex gap-5">
                <FaCheckCircle className="text-yellow-400 text-2xl mt-1" />

                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Nationwide Logistics Network
                  </h3>

                  <p className="text-gray-400 leading-8">
                    Scale transportation operations across India seamlessly.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <FaCheckCircle className="text-yellow-400 text-2xl mt-1" />

                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Real-Time Visibility
                  </h3>

                  <p className="text-gray-400 leading-8">
                    Track vehicles, shipments, and deliveries live.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <FaCheckCircle className="text-yellow-400 text-2xl mt-1" />

                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Cost Optimization
                  </h3>

                  <p className="text-gray-400 leading-8">
                    Reduce transportation and operational costs effectively.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-zinc-950 border border-yellow-500/20 rounded-[40px] p-12">
            <h2 className="text-4xl font-black mb-8">
              Enterprise Statistics
            </h2>

            <div className="grid grid-cols-2 gap-8">

              <div>
                <h3 className="text-5xl font-black text-yellow-400">
                  500+
                </h3>

                <p className="text-gray-400 mt-3">
                  Enterprise Clients
                </p>
              </div>

              <div>
                <h3 className="text-5xl font-black text-yellow-400">
                  10K+
                </h3>

                <p className="text-gray-400 mt-3">
                  Fleet Vehicles
                </p>
              </div>

              <div>
                <h3 className="text-5xl font-black text-yellow-400">
                  1M+
                </h3>

                <p className="text-gray-400 mt-3">
                  Deliveries Completed
                </p>
              </div>

              <div>
                <h3 className="text-5xl font-black text-yellow-400">
                  100+
                </h3>

                <p className="text-gray-400 mt-3">
                  Cities Covered
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-zinc-950 text-white">
        <div className="container-main">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-[40px] p-16 text-black text-center">

            <h2 className="text-5xl md:text-6xl font-black mb-8">
              Build Smarter Logistics Infrastructure
            </h2>

            <p className="text-xl leading-9 max-w-3xl mx-auto mb-12">
              Transform your business transportation and delivery
              operations with BearRide Enterprise Solutions.
            </p>

            <button className="bg-black text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
              Get Enterprise Consultation
              <FaArrowRight />
            </button>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Enterprise;