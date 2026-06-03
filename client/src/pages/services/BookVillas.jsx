import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import {
  FaMapMarkerAlt,
  FaStar,
  FaSwimmingPool,
  FaWifi,
  FaParking,
  FaUtensils,
} from "react-icons/fa";

function BookVillas() {
  const villas = [
    {
      name: "Luxury Beach Villa",
      location: "Goa",
      price: "₹12,000/night",
      rating: "4.9",
    },
    {
      name: "Mountain Retreat",
      location: "Manali",
      price: "₹8,500/night",
      rating: "4.8",
    },
    {
      name: "Lake View Villa",
      location: "Udaipur",
      price: "₹10,000/night",
      rating: "4.7",
    },
    {
      name: "Royal Heritage Villa",
      location: "Jaipur",
      price: "₹15,000/night",
      rating: "5.0",
    },
  ];

  return (
    <DashboardLayout>
      <div>
        {/* PAGE HEADER */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-3">
            Luxury Villas
          </h1>

          <p className="text-gray-400 text-lg">
            Discover premium villas, holiday homes and luxury stays across India.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <p className="text-gray-400 mb-2">
              Available Villas
            </p>

            <h2 className="text-5xl font-black text-yellow-400">
              540+
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <p className="text-gray-400 mb-2">
              Locations
            </p>

            <h2 className="text-5xl font-black text-green-400">
              85
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <p className="text-gray-400 mb-2">
              Average Rating
            </p>

            <h2 className="text-5xl font-black text-blue-400">
              4.8
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <p className="text-gray-400 mb-2">
              Bookings
            </p>

            <h2 className="text-5xl font-black text-purple-400">
              12K+
            </h2>
          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10 mb-12">
          <h2 className="text-3xl font-black mb-6">
            Search Villas
          </h2>

          <div className="grid md:grid-cols-4 gap-5">
            <input
              placeholder="Destination"
              className="p-5 rounded-2xl bg-black outline-none"
            />

            <input
              type="date"
              className="p-5 rounded-2xl bg-black outline-none"
            />

            <input
              type="date"
              className="p-5 rounded-2xl bg-black outline-none"
            />

            <button className="bg-yellow-400 text-black rounded-2xl font-bold">
              Search Villas
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid xl:grid-cols-4 gap-10">
          {/* LEFT */}
          <div className="xl:col-span-3">
            <div className="grid md:grid-cols-2 gap-8">
              {villas.map((villa, index) => (
                <div
                  key={index}
                  className="
                    bg-zinc-950
                    p-6
                    rounded-3xl
                    border border-yellow-500/10
                  "
                >
                  {/* IMAGE */}
                  <div className="h-56 bg-black rounded-2xl mb-5" />

                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold">
                      {villa.name}
                    </h2>

                    <div className="flex items-center gap-2 text-yellow-400">
                      <FaStar />

                      {villa.rating}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 mb-5">
                    <FaMapMarkerAlt />

                    {villa.location}
                  </div>

                  {/* AMENITIES */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    <span className="bg-black px-4 py-2 rounded-xl flex items-center gap-2">
                      <FaWifi />
                      WiFi
                    </span>

                    <span className="bg-black px-4 py-2 rounded-xl flex items-center gap-2">
                      <FaSwimmingPool />
                      Pool
                    </span>

                    <span className="bg-black px-4 py-2 rounded-xl flex items-center gap-2">
                      <FaParking />
                      Parking
                    </span>

                    <span className="bg-black px-4 py-2 rounded-xl flex items-center gap-2">
                      <FaUtensils />
                      Dining
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400">
                        Starting From
                      </p>

                      <h3 className="text-3xl font-black text-yellow-400">
                        {villa.price}
                      </h3>
                    </div>

                    <button
                      className="
                        bg-yellow-400
                        text-black
                        px-6 py-3
                        rounded-xl
                        font-bold
                      "
                    >
                      Book Villa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">
            {/* BOOKING SUMMARY */}
            <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
              <h2 className="text-2xl font-black mb-6">
                Booking Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Nights</span>
                  <span>3</span>
                </div>

                <div className="flex justify-between">
                  <span>Guests</span>
                  <span>2</span>
                </div>

                <div className="flex justify-between">
                  <span>Price</span>
                  <span>₹36,000</span>
                </div>

                <div className="flex justify-between text-yellow-400 font-bold text-xl">
                  <span>Total</span>
                  <span>₹36,000</span>
                </div>
              </div>
            </div>

            {/* POPULAR DESTINATIONS */}
            <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
              <h2 className="text-2xl font-black mb-6">
                Popular Destinations
              </h2>

              <div className="space-y-4">
                <div className="bg-black p-4 rounded-xl">
                  Goa
                </div>

                <div className="bg-black p-4 rounded-xl">
                  Manali
                </div>

                <div className="bg-black p-4 rounded-xl">
                  Udaipur
                </div>

                <div className="bg-black p-4 rounded-xl">
                  Jaipur
                </div>
              </div>
            </div>

            {/* REVIEW */}
            <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
              <h2 className="text-2xl font-black mb-5">
                Guest Review
              </h2>

              <div className="text-yellow-400 mb-3">
                ★★★★★
              </div>

              <p className="text-gray-400">
                Amazing experience. Clean property,
                premium amenities and excellent support.
              </p>

              <p className="mt-4 font-bold">
                Rahul Sharma
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BookVillas;