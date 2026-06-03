import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";

import {
  FaPlane,
  FaWifi,
  FaCoffee,
  FaCouch,
  FaStar,
  FaUsers,
} from "react-icons/fa";

function BookLounge() {
  const lounges = [
    {
      name: "Delhi Airport Lounge",
      terminal: "Terminal 3",
      price: "₹999",
      rating: "4.8",
    },
    {
      name: "Mumbai Premium Lounge",
      terminal: "Terminal 2",
      price: "₹1200",
      rating: "4.9",
    },
    {
      name: "Bangalore Executive Lounge",
      terminal: "Terminal 1",
      price: "₹850",
      rating: "4.7",
    },
  ];

  return (
    <DashboardLayout>
      <div>
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">
            Airport Lounge Booking
          </h1>

          <p className="text-gray-400 text-lg">
            Relax before your flight with premium airport lounge access.
          </p>
        </div>

        {/* SEARCH */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-8 mb-10">
          <h2 className="text-2xl font-black mb-6">
            Find Lounge
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            <input
              placeholder="Airport"
              className="bg-black p-5 rounded-2xl outline-none"
            />

            <input
              type="date"
              className="bg-black p-5 rounded-2xl outline-none"
            />

            <button
              className="
                bg-yellow-400
                text-black
                rounded-2xl
                font-bold
              "
            >
              Search Lounge
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-gray-400 mb-2">
              Available Lounges
            </h3>

            <p className="text-5xl font-black text-yellow-400">
              120+
            </p>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-gray-400 mb-2">
              Airports Covered
            </h3>

            <p className="text-5xl font-black text-green-400">
              45
            </p>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-gray-400 mb-2">
              Customer Rating
            </h3>

            <p className="text-5xl font-black text-blue-400">
              4.9
            </p>
          </div>
        </div>

        {/* LOUNGE LIST */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {lounges.map((lounge, index) => (
            <div
              key={index}
              className="
                bg-zinc-950
                border border-yellow-500/10
                rounded-3xl
                overflow-hidden
              "
            >
              <div className="h-56 bg-black flex items-center justify-center">
                <FaPlane className="text-6xl text-yellow-400" />
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-black mb-2">
                  {lounge.name}
                </h2>

                <p className="text-gray-400 mb-3">
                  {lounge.terminal}
                </p>

                <div className="flex items-center gap-2 text-yellow-400 mb-5">
                  <FaStar />
                  {lounge.rating}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-black p-3 rounded-xl text-center">
                    <FaWifi className="mx-auto mb-2" />
                    WiFi
                  </div>

                  <div className="bg-black p-3 rounded-xl text-center">
                    <FaCoffee className="mx-auto mb-2" />
                    Food
                  </div>

                  <div className="bg-black p-3 rounded-xl text-center">
                    <FaCouch className="mx-auto mb-2" />
                    Rest
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 text-2xl font-black">
                    {lounge.price}
                  </span>

                  <button
                    className="
                      bg-yellow-400
                      text-black
                      px-5 py-3
                      rounded-xl
                      font-bold
                    "
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MEMBERSHIP BENEFITS */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-10 mb-10">
          <h2 className="text-3xl font-black mb-8">
            Membership Benefits
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <FaWifi className="text-yellow-400 text-4xl mb-4" />
              <h3 className="font-bold text-xl mb-2">
                Free High-Speed WiFi
              </h3>
              <p className="text-gray-400">
                Stay connected before boarding.
              </p>
            </div>

            <div>
              <FaCoffee className="text-yellow-400 text-4xl mb-4" />
              <h3 className="font-bold text-xl mb-2">
                Complimentary Meals
              </h3>
              <p className="text-gray-400">
                Snacks, beverages and buffet access.
              </p>
            </div>

            <div>
              <FaUsers className="text-yellow-400 text-4xl mb-4" />
              <h3 className="font-bold text-xl mb-2">
                Family Access
              </h3>
              <p className="text-gray-400">
                Add guests and family members.
              </p>
            </div>
          </div>
        </div>

        {/* CUSTOMER REVIEWS */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-10 mb-10">
          <h2 className="text-3xl font-black mb-8">
            Customer Reviews
          </h2>

          <div className="space-y-6">
            <div className="bg-black p-6 rounded-2xl">
              <p className="font-bold mb-2">
                Rahul Sharma
              </p>

              <p className="text-yellow-400 mb-2">
                ★★★★★
              </p>

              <p className="text-gray-400">
                Excellent lounge experience with amazing food and seating.
              </p>
            </div>

            <div className="bg-black p-6 rounded-2xl">
              <p className="font-bold mb-2">
                Priya Kapoor
              </p>

              <p className="text-yellow-400 mb-2">
                ★★★★★
              </p>

              <p className="text-gray-400">
                Quick booking process and premium service.
              </p>
            </div>
          </div>
        </div>

        {/* BOOKING SUMMARY */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-10">
          <h2 className="text-3xl font-black mb-8">
            Booking Summary
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <span>Lounge Access</span>
              <span>₹999</span>
            </div>

            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>₹99</span>
            </div>

            <div className="flex justify-between text-yellow-400 font-black text-2xl">
              <span>Total</span>
              <span>₹1098</span>
            </div>
          </div>

          <button
            className="
              w-full
              bg-yellow-400
              text-black
              py-5
              rounded-2xl
              font-black
              text-lg
            "
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BookLounge;