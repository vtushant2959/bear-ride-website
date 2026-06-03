function RecentBookingsTable() {

  const bookings = [
    {
      id: "#BR1024",
      pickup: "Andheri",
      destination: "Bandra",
      driver: "Rahul Sharma",
      fare: "₹240",
      status: "Completed",
      date: "14 May 2026",
    },

    {
      id: "#BR1025",
      pickup: "Delhi Gate",
      destination: "Cyber Hub",
      driver: "Aman Verma",
      fare: "₹520",
      status: "Active",
      date: "15 May 2026",
    },

    {
      id: "#BR1026",
      pickup: "Noida",
      destination: "Connaught Place",
      driver: "Suresh Kumar",
      fare: "₹380",
      status: "Cancelled",
      date: "15 May 2026",
    },

    {
      id: "#BR1027",
      pickup: "Airport",
      destination: "Gurgaon",
      driver: "Vikram Singh",
      fare: "₹690",
      status: "Completed",
      date: "16 May 2026",
    },
  ];

  const getStatusStyle = (status) => {

    if (status === "Completed") {
      return "bg-green-500/20 text-green-400";
    }

    if (status === "Active") {
      return "bg-yellow-500/20 text-yellow-400";
    }

    if (status === "Cancelled") {
      return "bg-red-500/20 text-red-400";
    }

    return "bg-zinc-700 text-white";
  };

  return (
    <div
      className="
        bg-zinc-950
        border border-yellow-500/10
        rounded-3xl
        p-8
        overflow-hidden
      "
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-black">
            Recent Bookings
          </h2>

          <p className="text-gray-400 mt-2">
            Latest ride activities and trip history.
          </p>
        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead>

            <tr className="border-b border-yellow-500/10 text-left">

              <th className="pb-5 text-gray-400 font-semibold">
                Ride ID
              </th>

              <th className="pb-5 text-gray-400 font-semibold">
                Pickup
              </th>

              <th className="pb-5 text-gray-400 font-semibold">
                Destination
              </th>

              <th className="pb-5 text-gray-400 font-semibold">
                Driver
              </th>

              <th className="pb-5 text-gray-400 font-semibold">
                Fare
              </th>

              <th className="pb-5 text-gray-400 font-semibold">
                Status
              </th>

              <th className="pb-5 text-gray-400 font-semibold">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.map((booking, index) => (

              <tr
                key={index}
                className="
                  border-b
                  border-yellow-500/5

                  hover:bg-zinc-900/50

                  transition-all duration-300
                "
              >

                <td className="py-6 font-bold text-yellow-400">
                  {booking.id}
                </td>

                <td className="py-6">
                  {booking.pickup}
                </td>

                <td className="py-6">
                  {booking.destination}
                </td>

                <td className="py-6">
                  {booking.driver}
                </td>

                <td className="py-6 font-bold">
                  {booking.fare}
                </td>

                <td className="py-6">

                  <span
                    className={`
                      px-4 py-2
                      rounded-full
                      text-sm
                      font-bold
                      ${getStatusStyle(booking.status)}
                    `}
                  >
                    {booking.status}
                  </span>

                </td>

                <td className="py-6 text-gray-400">
                  {booking.date}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentBookingsTable;