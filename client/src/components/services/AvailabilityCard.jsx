function AvailabilityCard({
  title,
  available,
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

      <h2 className="text-2xl font-black mb-4">
        {title}
      </h2>

      <span
        className={`
          px-5 py-3
          rounded-full
          font-bold

          ${
            available
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }
        `}
      >
        {available
          ? "Available"
          : "Unavailable"}
      </span>

    </div>
  );
}

export default AvailabilityCard;