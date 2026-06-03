import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";

import {
  FaCar,
  FaMotorcycle,
  FaSearch,
  FaStar,
} from "react-icons/fa";

function RentVehicle() {
  const vehicles = [
    {
      name: "Honda City",
      type: "Sedan",
      seats: 5,
      rating: 4.8,
      price: "₹2500/day",
    },

    {
      name: "Hyundai Creta",
      type: "SUV",
      seats: 5,
      rating: 4.9,
      price: "₹3200/day",
    },

    {
      name: "Royal Enfield",
      type: "Bike",
      seats: 2,
      rating: 4.7,
      price: "₹900/day",
    },
  ];

  return (
    <DashboardLayout>
      <div>
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3">
            Rent Vehicle
          </h1>

          <p className="text-gray-400 text-lg">
            Choose from cars, bikes and SUVs
            available across India.
          </p>
        </div>

        {/* SEARCH */}
        <div
          className="
            bg-zinc-950
            p-6
            rounded-3xl
            border border-yellow-500/10
            mb-10
          "
        >
          <div className="relative">
            <FaSearch
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search vehicle..."
              className="
                w-full
                bg-black
                rounded-2xl
                py-4
                pl-14
                pr-4
                outline-none
              "
            />
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-4 mt-5">
            <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold">
              All
            </button>

            <button className="bg-black px-5 py-3 rounded-xl">
              Cars
            </button>

            <button className="bg-black px-5 py-3 rounded-xl">
              Bikes
            </button>

            <button className="bg-black px-5 py-3 rounded-xl">
              SUVs
            </button>

            <button className="bg-black px-5 py-3 rounded-xl">
              Luxury
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-gray-400 mb-3">
              Available Vehicles
            </h3>

            <h2 className="text-5xl font-black text-yellow-400">
              120+
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-gray-400 mb-3">
              Cities Covered
            </h3>

            <h2 className="text-5xl font-black text-green-400">
              45
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-gray-400 mb-3">
              Customer Rating
            </h3>

            <h2 className="text-5xl font-black text-blue-400">
              4.9
            </h2>
          </div>
        </div>

        {/* VEHICLES */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="
                bg-zinc-950
                p-8
                rounded-3xl
                border border-yellow-500/10
              "
            >
              {/* IMAGE */}
              <div
                className="
                  h-52
                  rounded-2xl
                  bg-black
                  mb-6
                  flex
                  items-center
                  justify-center
                  text-yellow-400
                  text-6xl
                "
              >
                {vehicle.type === "Bike" ? (
                  <FaMotorcycle />
                ) : (
                  <FaCar />
                )}
              </div>

              <h2 className="text-3xl font-black mb-2">
                {vehicle.name}
              </h2>

              <p className="text-gray-400 mb-2">
                {vehicle.type}
              </p>

              <p className="text-gray-400 mb-3">
                Seats: {vehicle.seats}
              </p>

              <div className="flex items-center gap-2 mb-4 text-yellow-400">
                <FaStar />
                {vehicle.rating}
              </div>

              <p className="text-yellow-400 font-black text-2xl mb-6">
                {vehicle.price}
              </p>

              <button
                className="
                  w-full
                  bg-yellow-400
                  text-black
                  py-4
                  rounded-2xl
                  font-bold
                "
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* RENTAL FORM */}
        <div
          className="
            bg-zinc-950
            p-8
            rounded-3xl
            border border-yellow-500/10
            mb-10
          "
        >
          <h2 className="text-3xl font-black mb-8">
            Rental Details
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Pickup Location"
              className="bg-black p-5 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Drop Location"
              className="bg-black p-5 rounded-2xl"
            />

            <input
              type="date"
              className="bg-black p-5 rounded-2xl"
            />

            <input
              type="date"
              className="bg-black p-5 rounded-2xl"
            />
          </div>

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
            Check Availability
          </button>
        </div>

        {/* PRICING */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-xl font-bold mb-4">
              Bike
            </h3>

            <p className="text-4xl font-black text-yellow-400">
              ₹900/day
            </p>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-xl font-bold mb-4">
              Sedan
            </h3>

            <p className="text-4xl font-black text-yellow-400">
              ₹2500/day
            </p>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-xl font-bold mb-4">
              SUV
            </h3>

            <p className="text-4xl font-black text-yellow-400">
              ₹3200/day
            </p>
          </div>
        </div>

        {/* RENTAL POLICY */}
        <div
          className="
            bg-zinc-950
            p-8
            rounded-3xl
            border border-yellow-500/10
            mb-10
          "
        >
          <h2 className="text-3xl font-black mb-6">
            Rental Policy
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>• Driving license required</li>
            <li>• Fuel charges extra</li>
            <li>• Security deposit applicable</li>
            <li>• Vehicle inspection before pickup</li>
          </ul>
        </div>

        {/* REVIEWS */}
        <div
          className="
            bg-zinc-950
            p-8
            rounded-3xl
            border border-yellow-500/10
          "
        >
          <h2 className="text-3xl font-black mb-6">
            Customer Reviews
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold">
                Rahul Sharma
              </h3>

              <p className="text-yellow-400">
                ★★★★★
              </p>

              <p className="text-gray-400">
                Smooth booking process and clean vehicle.
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                Aman Verma
              </h3>

              <p className="text-yellow-400">
                ★★★★★
              </p>

              <p className="text-gray-400">
                Great experience for weekend trips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default RentVehicle;