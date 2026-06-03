import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaClock,
} from "react-icons/fa";

function ActiveRideCard() {

  return (
    <div
      className="
        bg-zinc-950
        border border-yellow-500/10

        rounded-3xl

        p-8

        overflow-hidden

        relative
      "
    >

      {/* LIVE BADGE */}
      <div
        className="
          absolute
          top-6
          right-6

          bg-green-500/20
          text-green-400

          px-4 py-2

          rounded-full

          text-sm
          font-bold

          flex items-center gap-2
        "
      >

        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

        Live Ride

      </div>

      {/* HEADER */}
      <div className="mb-10">

        <h2 className="text-3xl font-black mb-3">
          Active Ride
        </h2>

        <p className="text-gray-400">
          Your ride is currently in progress.
        </p>

      </div>

      {/* DRIVER */}
      <div
        className="
          flex
          flex-col md:flex-row
          md:items-center
          justify-between

          gap-6

          mb-10
        "
      >

        <div className="flex items-center gap-5">

          {/* DRIVER IMAGE */}
          <div
            className="
              w-20 h-20

              rounded-full

              bg-yellow-400

              flex
              items-center
              justify-center

              text-black

              text-3xl
              font-black
            "
          >
            R
          </div>

          {/* DRIVER DETAILS */}
          <div>

            <h3 className="text-2xl font-black">
              Rahul Sharma
            </h3>

            <p className="text-gray-400 mt-1">
              Honda Activa • HR26AB1234
            </p>

          </div>

        </div>

        {/* ETA */}
        <div
          className="
            bg-black
            border border-yellow-500/10

            rounded-2xl

            px-6 py-5

            flex items-center gap-4
          "
        >

          <FaClock className="text-yellow-400 text-2xl" />

          <div>

            <p className="text-gray-400 text-sm">
              Estimated Arrival
            </p>

            <h4 className="text-2xl font-black">
              6 mins
            </h4>

          </div>

        </div>

      </div>

      {/* ROUTE */}
      <div className="space-y-8 mb-10">

        {/* PICKUP */}
        <div className="flex gap-5">

          <div className="mt-1">
            <div className="w-5 h-5 rounded-full bg-green-400"></div>
          </div>

          <div>

            <p className="text-gray-400 text-sm mb-1">
              Pickup
            </p>

            <h3 className="text-xl font-bold">
              Andheri Metro Station
            </h3>

          </div>

        </div>

        {/* LINE */}
        <div className="ml-[9px] h-10 w-[2px] bg-yellow-500/20"></div>

        {/* DESTINATION */}
        <div className="flex gap-5">

          <div className="mt-1">
            <FaMapMarkerAlt className="text-red-400 text-xl" />
          </div>

          <div>

            <p className="text-gray-400 text-sm mb-1">
              Destination
            </p>

            <h3 className="text-xl font-bold">
              Bandra Kurla Complex
            </h3>

          </div>

        </div>

      </div>

      {/* RIDE PROGRESS */}
      <div className="mb-10">

        <div className="flex items-center justify-between mb-3">

          <p className="text-gray-400">
            Ride Progress
          </p>

          <p className="text-yellow-400 font-bold">
            72%
          </p>

        </div>

        <div
          className="
            h-4
            bg-black

            rounded-full

            overflow-hidden
          "
        >

          <div
            className="
              h-full

              bg-yellow-400

              rounded-full

              w-[72%]
            "
          ></div>

        </div>

      </div>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row gap-5">

        {/* TRACK */}
        <button
          className="
            flex-1

            bg-yellow-400
            text-black

            py-5

            rounded-2xl

            font-bold

            flex
            items-center
            justify-center
            gap-3

            hover:scale-[1.02]

            transition-all duration-300
          "
        >

          <FaMotorcycle />

          Track Ride

        </button>

        {/* CALL */}
        <button
          className="
            flex-1

            bg-black

            border border-yellow-500/20

            py-5

            rounded-2xl

            font-bold

            flex
            items-center
            justify-center
            gap-3

            hover:border-yellow-400

            transition-all duration-300
          "
        >

          <FaPhoneAlt />

          Call Driver

        </button>

      </div>

    </div>
  );
}

export default ActiveRideCard;