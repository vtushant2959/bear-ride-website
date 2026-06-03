import { Link } from "react-router-dom";

function QuickActionCard({
  title,
  subtitle,
  icon,
  color,
  path,
}) {

  return (
    <Link
      to={path}

      className="
        group

        bg-zinc-950
        border border-yellow-500/10

        rounded-3xl

        p-8

        hover:border-yellow-400/30
        hover:-translate-y-1

        transition-all duration-300
      "
    >

      {/* ICON */}
      <div
        className={`
          w-16 h-16

          rounded-2xl

          flex
          items-center
          justify-center

          text-3xl

          mb-6

          ${color}
        `}
      >
        {icon}
      </div>

      {/* TITLE */}
      <h2
        className="
          text-2xl
          font-black

          mb-3

          group-hover:text-yellow-400

          transition-all duration-300
        "
      >
        {title}
      </h2>

      {/* SUBTITLE */}
      <p className="text-gray-400 leading-7">
        {subtitle}
      </p>

    </Link>
  );
}

export default QuickActionCard;