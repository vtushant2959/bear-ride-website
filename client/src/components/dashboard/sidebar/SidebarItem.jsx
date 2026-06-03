import { NavLink } from "react-router-dom";

function SidebarItem({
  icon,
  title,
  path,
}) {

  return (
    <NavLink
      to={path}

      className={({ isActive }) =>
        `
          flex
          items-center
          gap-4

          px-5 py-4

          rounded-2xl

          transition-all duration-300

          font-semibold

          ${
            isActive
              ? "bg-yellow-400 text-black"
              : "text-gray-300 hover:bg-zinc-900 hover:text-yellow-400"
          }
        `
      }
    >

      <span className="text-2xl">
        {icon}
      </span>

      <span>
        {title}
      </span>

    </NavLink>
  );
}

export default SidebarItem;