function BookingSummaryCard({
  pickup,
  destination,
  fare,
  distance,
  duration,
}) {
  return (
    <div
      className="
        bg-zinc-950

        border border-yellow-500/10

        rounded-3xl

        p-8
      "
    >

      <h2 className="text-3xl font-black mb-8">
        Booking Summary
      </h2>

      <div className="space-y-5">

        <div>
          <p className="text-gray-400">
            Pickup
          </p>

          <h3>{pickup}</h3>
        </div>

        <div>
          <p className="text-gray-400">
            Destination
          </p>

          <h3>{destination}</h3>
        </div>

        <div>
          <p className="text-gray-400">
            Distance
          </p>

          <h3>{distance}</h3>
        </div>

        <div>
          <p className="text-gray-400">
            Duration
          </p>

          <h3>{duration}</h3>
        </div>

        <div>
          <p className="text-gray-400">
            Estimated Fare
          </p>

          <h3 className="text-yellow-400 text-4xl font-black">
            ₹{fare}
          </h3>
        </div>

      </div>

    </div>
  );
}

export default BookingSummaryCard;