import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";

import {
  FaTruck,
  FaBoxes,
  FaMapMarkerAlt,
  FaRupeeSign,
} from "react-icons/fa";

function TruckBooking() {
  const truckTypes = [
    {
      name: "Mini Truck",
      capacity: "750 Kg",
      price: "₹15/km",
    },
    {
      name: "Pickup Truck",
      capacity: "1500 Kg",
      price: "₹22/km",
    },
    {
      name: "Container Truck",
      capacity: "5000 Kg",
      price: "₹35/km",
    },
  ];

  return (
    <DashboardLayout>
      <div>
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">
            Truck Booking
          </h1>

          <p className="text-gray-400 text-lg">
            Book trucks for goods transportation,
            logistics and commercial deliveries.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <p className="text-gray-400 mb-2">
              Available Trucks
            </p>

            <h2 className="text-5xl font-black text-yellow-400">
              120
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <p className="text-gray-400 mb-2">
              Deliveries Today
            </p>

            <h2 className="text-5xl font-black text-green-400">
              540
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <p className="text-gray-400 mb-2">
              Active Orders
            </p>

            <h2 className="text-5xl font-black text-blue-400">
              28
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <p className="text-gray-400 mb-2">
              Avg Delivery Time
            </p>

            <h2 className="text-5xl font-black text-purple-400">
              3h
            </h2>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid xl:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="xl:col-span-2">
            <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
              <h2 className="text-3xl font-black mb-8">
                Shipment Details
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  placeholder="Pickup Location"
                  className="p-5 rounded-2xl bg-black border border-yellow-500/10 outline-none"
                />

                <input
                  placeholder="Drop Location"
                  className="p-5 rounded-2xl bg-black border border-yellow-500/10 outline-none"
                />

                <input
                  placeholder="Weight (Kg)"
                  className="p-5 rounded-2xl bg-black border border-yellow-500/10 outline-none"
                />

                <select
                  className="
                    p-5
                    rounded-2xl
                    bg-black
                    border border-yellow-500/10
                    outline-none
                  "
                >
                  <option>
                    Select Goods Category
                  </option>

                  <option>
                    Electronics
                  </option>

                  <option>
                    Furniture
                  </option>

                  <option>
                    Construction Material
                  </option>

                  <option>
                    Household Goods
                  </option>
                </select>
              </div>

              <textarea
                rows="5"
                placeholder="Goods Description"
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

              <button
                className="
                  mt-8
                  bg-yellow-400
                  text-black
                  px-10 py-4
                  rounded-2xl
                  font-bold
                "
              >
                Request Truck
              </button>
            </div>

            {/* AVAILABLE TRUCKS */}
            <div className="mt-10">
              <h2 className="text-3xl font-black mb-6">
                Available Trucks
              </h2>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {truckTypes.map((truck, index) => (
                  <div
                    key={index}
                    className="
                      bg-zinc-950
                      p-6
                      rounded-3xl
                      border border-yellow-500/10
                    "
                  >
                    <div
                      className="
                        w-16 h-16
                        rounded-2xl
                        bg-yellow-400
                        text-black
                        flex
                        items-center
                        justify-center
                        text-3xl
                        mb-5
                      "
                    >
                      <FaTruck />
                    </div>

                    <h3 className="text-2xl font-bold mb-2">
                      {truck.name}
                    </h3>

                    <p className="text-gray-400 mb-2">
                      Capacity:
                      {" "}
                      {truck.capacity}
                    </p>

                    <p className="text-yellow-400 font-bold text-xl">
                      {truck.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            {/* SUMMARY */}
            <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10 mb-8">
              <h2 className="text-3xl font-black mb-6">
                Booking Summary
              </h2>

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Distance
                  </span>

                  <span>
                    24 km
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Truck Type
                  </span>

                  <span>
                    Pickup Truck
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Weight
                  </span>

                  <span>
                    1200 Kg
                  </span>
                </div>

                <div className="flex justify-between text-yellow-400 font-bold text-2xl">
                  <span>Total Fare</span>

                  <span>₹880</span>
                </div>
              </div>
            </div>

            {/* FEATURES */}
            <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
              <h2 className="text-3xl font-black mb-6">
                Why BearRide Logistics?
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <FaTruck className="text-yellow-400" />
                  GPS Enabled Trucks
                </div>

                <div className="flex items-center gap-4">
                  <FaBoxes className="text-yellow-400" />
                  Secure Goods Handling
                </div>

                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-yellow-400" />
                  Real-Time Tracking
                </div>

                <div className="flex items-center gap-4">
                  <FaRupeeSign className="text-yellow-400" />
                  Transparent Pricing
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT BOOKINGS */}
        <div className="mt-12 bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
          <h2 className="text-3xl font-black mb-6">
            Recent Truck Bookings
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-500/10">
                  <th className="text-left py-4">
                    Booking ID
                  </th>

                  <th className="text-left py-4">
                    Route
                  </th>

                  <th className="text-left py-4">
                    Truck
                  </th>

                  <th className="text-left py-4">
                    Fare
                  </th>

                  <th className="text-left py-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="py-5">
                    #TRK1001
                  </td>

                  <td>
                    Delhi → Gurgaon
                  </td>

                  <td>
                    Pickup Truck
                  </td>

                  <td>
                    ₹880
                  </td>

                  <td className="text-green-400">
                    Delivered
                  </td>
                </tr>

                <tr>
                  <td className="py-5">
                    #TRK1002
                  </td>

                  <td>
                    Noida → Jaipur
                  </td>

                  <td>
                    Container
                  </td>

                  <td>
                    ₹2450
                  </td>

                  <td className="text-yellow-400">
                    In Transit
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TruckBooking;