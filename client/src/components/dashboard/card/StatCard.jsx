function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className="
        bg-zinc-950
        border border-yellow-500/10
        rounded-3xl
        p-8

        hover:border-yellow-400/30
        hover:-translate-y-1

        transition-all duration-300
      "
    >
      <div className="flex items-center justify-between mb-6">

        <div>
          <h3 className="text-gray-400 text-lg">
            {title}
          </h3>

          <h2 className="text-5xl font-black mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`
            w-16 h-16
            rounded-2xl
            flex items-center justify-center
            text-3xl
            ${color}
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;