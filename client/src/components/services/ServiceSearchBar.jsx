import { FaSearch } from "react-icons/fa";

function ServiceSearchBar({
  placeholder = "Search...",
}) {
  return (
    <div className="relative mb-8">

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
        placeholder={placeholder}
        className="
          w-full
          bg-zinc-950

          border border-yellow-500/10

          rounded-2xl

          pl-14
          pr-5
          py-5

          outline-none

          focus:border-yellow-400
        "
      />

    </div>
  );
}

export default ServiceSearchBar;