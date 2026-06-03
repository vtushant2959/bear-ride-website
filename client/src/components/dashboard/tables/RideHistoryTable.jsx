function RideHistoryTable() {
  const rides = [
    {
      id: "#BR1001",
      pickup: "Delhi Gate",
      destination: "Cyber Hub",
      fare: "₹240",
      type: "Cab",
      status: "Completed",
      date: "20 May 2026",
    },
    {
      id: "#BR1002",
      pickup: "Noida",
      destination: "Airport",
      fare: "₹420",
      type: "Auto",
      status: "Active",
      date: "22 May 2026",
    },
  ];

  return (
    <div className="bg-zinc-950 rounded-3xl p-8 border border-yellow-500/10">

      <h2 className="text-3xl font-black mb-6">
        Ride History
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th>ID</th>
            <th>Pickup</th>
            <th>Destination</th>
            <th>Fare</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {rides.map((ride) => (
            <tr
              key={ride.id}
              className="border-t border-yellow-500/10"
            >
              <td className="py-4">{ride.id}</td>
              <td>{ride.pickup}</td>
              <td>{ride.destination}</td>
              <td>{ride.fare}</td>
              <td>{ride.type}</td>
              <td>{ride.status}</td>
              <td>{ride.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default RideHistoryTable;