import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import {
  FaHome,
  FaTruck,
  FaBoxes,
  FaShieldAlt,
} from "react-icons/fa";

function BookHouseShifting() {
  return (
    <DashboardLayout>
      <div>

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">
            House Shifting
          </h1>

          <p className="text-gray-400 text-lg">
            Safe, affordable and professional packers &
            movers for local and intercity relocation.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <FaHome className="text-yellow-400 text-4xl mb-4" />
            <h3 className="text-4xl font-black text-yellow-400">
              12K+
            </h3>
            <p className="text-gray-400 mt-2">
              Homes Shifted
            </p>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <FaTruck className="text-green-400 text-4xl mb-4" />
            <h3 className="text-4xl font-black text-green-400">
              350+
            </h3>
            <p className="text-gray-400 mt-2">
              Moving Vehicles
            </p>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <FaBoxes className="text-blue-400 text-4xl mb-4" />
            <h3 className="text-4xl font-black text-blue-400">
              24/7
            </h3>
            <p className="text-gray-400 mt-2">
              Customer Support
            </p>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <FaShieldAlt className="text-purple-400 text-4xl mb-4" />
            <h3 className="text-4xl font-black text-purple-400">
              100%
            </h3>
            <p className="text-gray-400 mt-2">
              Safe Handling
            </p>
          </div>

        </div>

        {/* MAIN SECTION */}
        <div className="grid xl:grid-cols-3 gap-10">

          {/* FORM */}
          <div className="xl:col-span-2">

            <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">

              <h2 className="text-3xl font-black mb-8">
                Request Moving Quote
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  placeholder="Current Address"
                  className="
                    p-5
                    rounded-2xl
                    bg-black
                    border border-yellow-500/10
                    outline-none
                  "
                />

                <input
                  placeholder="New Address"
                  className="
                    p-5
                    rounded-2xl
                    bg-black
                    border border-yellow-500/10
                    outline-none
                  "
                />

                <input
                  type="date"
                  className="
                    p-5
                    rounded-2xl
                    bg-black
                    border border-yellow-500/10
                    outline-none
                  "
                />

                <input
                  placeholder="Mobile Number"
                  className="
                    p-5
                    rounded-2xl
                    bg-black
                    border border-yellow-500/10
                    outline-none
                  "
                />

              </div>

              <textarea
                rows="5"
                placeholder="Items Description"
                className="
                  w-full
                  mt-5
                  p-5
                  rounded-2xl
                  bg-black
                  border border-yellow-500/10
                  outline-none
                "
              />

              {/* HOUSE TYPE */}
              <div className="mt-8">

                <h3 className="text-xl font-bold mb-4">
                  Select House Type
                </h3>

                <div className="grid md:grid-cols-4 gap-5">

                  <button className="bg-yellow-400 text-black rounded-2xl p-5 font-bold">
                    1 BHK
                  </button>

                  <button className="bg-black rounded-2xl p-5 border border-yellow-500/10">
                    2 BHK
                  </button>

                  <button className="bg-black rounded-2xl p-5 border border-yellow-500/10">
                    3 BHK
                  </button>

                  <button className="bg-black rounded-2xl p-5 border border-yellow-500/10">
                    Villa
                  </button>

                </div>

              </div>

              {/* SERVICES */}
              <div className="mt-8">

                <h3 className="text-xl font-bold mb-4">
                  Additional Services
                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  <label className="bg-black p-4 rounded-xl flex gap-3 items-center">
                    <input type="checkbox" />
                    Packing Service
                  </label>

                  <label className="bg-black p-4 rounded-xl flex gap-3 items-center">
                    <input type="checkbox" />
                    Furniture Assembly
                  </label>

                  <label className="bg-black p-4 rounded-xl flex gap-3 items-center">
                    <input type="checkbox" />
                    Storage Facility
                  </label>

                  <label className="bg-black p-4 rounded-xl flex gap-3 items-center">
                    <input type="checkbox" />
                    Insurance Coverage
                  </label>

                </div>

              </div>

              <button
                className="
                  mt-10
                  bg-yellow-400
                  text-black
                  px-10
                  py-5
                  rounded-2xl
                  font-bold
                  hover:scale-105
                  transition-all
                "
              >
                Get Instant Quotation
              </button>

            </div>

          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">

            {/* ESTIMATE */}
            <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">

              <h2 className="text-2xl font-black mb-6">
                Estimated Pricing
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>1 BHK</span>
                  <span>₹3,000+</span>
                </div>

                <div className="flex justify-between">
                  <span>2 BHK</span>
                  <span>₹5,500+</span>
                </div>

                <div className="flex justify-between">
                  <span>3 BHK</span>
                  <span>₹8,500+</span>
                </div>

                <div className="flex justify-between">
                  <span>Villa</span>
                  <span>₹15,000+</span>
                </div>

              </div>

            </div>

            {/* WHY CHOOSE */}
            <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">

              <h2 className="text-2xl font-black mb-6">
                Why BearRide Movers?
              </h2>

              <ul className="space-y-4 text-gray-300">

                <li>✓ Verified moving partners</li>

                <li>✓ Live shipment tracking</li>

                <li>✓ Transit insurance support</li>

                <li>✓ Affordable pricing</li>

                <li>✓ Professional packing team</li>

              </ul>

            </div>

          </div>

        </div>

        {/* RECENT BOOKINGS */}
        <div className="mt-12 bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">

          <h2 className="text-3xl font-black mb-6">
            Recent House Shifting Requests
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-yellow-500/10">
                  <th className="text-left py-4">Request ID</th>
                  <th className="text-left py-4">Type</th>
                  <th className="text-left py-4">City</th>
                  <th className="text-left py-4">Status</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b border-yellow-500/5">
                  <td className="py-4">HS1024</td>
                  <td>2 BHK</td>
                  <td>Mumbai</td>
                  <td className="text-green-400">Completed</td>
                </tr>

                <tr className="border-b border-yellow-500/5">
                  <td className="py-4">HS1025</td>
                  <td>3 BHK</td>
                  <td>Delhi</td>
                  <td className="text-yellow-400">In Progress</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default BookHouseShifting;