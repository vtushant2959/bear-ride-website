import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import {
  FaHotel,
  FaMapMarkerAlt,
  FaStar,
  FaSearch,
} from "react-icons/fa";

function BookHotels() {
  const hotels = [
    {
      name: "Taj Palace",
      location: "New Delhi",
      rating: 4.9,
      price: "₹8,500/night",
    },
    {
      name: "The Oberoi",
      location: "Mumbai",
      rating: 4.8,
      price: "₹9,200/night",
    },
    {
      name: "ITC Grand",
      location: "Bangalore",
      rating: 4.7,
      price: "₹7,500/night",
    },
    {
      name: "Radisson Blu",
      location: "Hyderabad",
      rating: 4.6,
      price: "₹6,800/night",
    },
  ];

  return (
    <DashboardLayout>
      <div>
        {/* HERO */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">
            Hotel Booking
          </h1>

          <p className="text-gray-400 text-lg">
            Discover luxury hotels, business stays and
            budget-friendly accommodations across India.
          </p>
        </div>

        {/* SEARCH */}
        <div
          className="
            bg-zinc-950
            border border-yellow-500/10
            rounded-3xl
            p-6
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
                text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Search hotels, cities, locations..."
              className="
                w-full
                bg-black
                rounded-2xl
                py-4
                pl-14
                pr-5
                border border-yellow-500/10
                outline-none
                focus:border-yellow-400
              "
            />
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold">
              Popular
            </button>

            <button className="bg-black px-5 py-3 rounded-xl">
              Budget
            </button>

            <button className="bg-black px-5 py-3 rounded-xl">
              Luxury
            </button>

            <button className="bg-black px-5 py-3 rounded-xl">
              Family
            </button>

            <button className="bg-black px-5 py-3 rounded-xl">
              Business
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <p className="text-gray-400 mb-3">
              Hotels Available
            </p>

            <h2 className="text-5xl font-black text-yellow-400">
              450+
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <p className="text-gray-400 mb-3">
              Cities Covered
            </p>

            <h2 className="text-5xl font-black text-green-400">
              120+
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <p className="text-gray-400 mb-3">
              Average Rating
            </p>

            <h2 className="text-5xl font-black text-blue-400">
              4.8★
            </h2>
          </div>
        </div>

        {/* HOTEL LIST */}
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-8">
            Popular Hotels
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {hotels.map((hotel, index) => (
              <div
                key={index}
                className="
                  bg-zinc-950
                  p-6
                  rounded-3xl
                  border border-yellow-500/10
                  hover:border-yellow-400/40
                  transition-all
                "
              >
                <div className="h-52 bg-black rounded-2xl mb-5 flex items-center justify-center">
                  <FaHotel className="text-6xl text-yellow-400" />
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  {hotel.name}
                </h2>

                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <FaMapMarkerAlt />
                  {hotel.location}
                </div>

                <div className="flex items-center gap-2 text-yellow-400 mb-4">
                  <FaStar />
                  {hotel.rating}
                </div>

                <h3 className="text-2xl font-black text-green-400 mb-5">
                  {hotel.price}
                </h3>

                <button
                  className="
                    w-full
                    bg-yellow-400
                    text-black
                    py-3
                    rounded-xl
                    font-bold
                    hover:scale-105
                    transition-all
                  "
                >
                  Book Room
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SPECIAL OFFER */}
        <div
          className="
            bg-zinc-950
            border border-yellow-500/10
            rounded-3xl
            p-10
            mb-10
          "
        >
          <h2 className="text-4xl font-black mb-4">
            Special Offer
          </h2>

          <p className="text-gray-400 mb-6">
            Get up to 25% OFF on luxury hotel bookings
            this weekend.
          </p>

          <button
            className="
              bg-yellow-400
              text-black
              px-8
              py-4
              rounded-2xl
              font-bold
            "
          >
            Claim Offer
          </button>
        </div>

        {/* REVIEWS */}
        <div>
          <h2 className="text-4xl font-black mb-8">
            Customer Reviews
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-950 p-6 rounded-3xl border border-yellow-500/10">
              <h3 className="font-bold mb-2">
                Rahul Sharma
              </h3>

              <p className="text-yellow-400 mb-3">
                ★★★★★
              </p>

              <p className="text-gray-400">
                Amazing hotel experience with quick
                booking and excellent service.
              </p>
            </div>

            <div className="bg-zinc-950 p-6 rounded-3xl border border-yellow-500/10">
              <h3 className="font-bold mb-2">
                Priya Mehta
              </h3>

              <p className="text-yellow-400 mb-3">
                ★★★★★
              </p>

              <p className="text-gray-400">
                Great discounts and premium hotel
                options available.
              </p>
            </div>

            <div className="bg-zinc-950 p-6 rounded-3xl border border-yellow-500/10">
              <h3 className="font-bold mb-2">
                Aman Verma
              </h3>

              <p className="text-yellow-400 mb-3">
                ★★★★☆
              </p>

              <p className="text-gray-400">
                Smooth booking process and excellent
                customer support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BookHotels;