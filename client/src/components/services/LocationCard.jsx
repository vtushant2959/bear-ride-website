import {
  FaMapMarkerAlt,
} from "react-icons/fa";

function LocationCard({
  title,
  address,
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

      <div
        className="
          flex
          items-center
          gap-3

          mb-5
        "
      >
        <FaMapMarkerAlt
          className="
            text-yellow-400
            text-2xl
          "
        />

        <h2 className="text-2xl font-black">
          {title}
        </h2>
      </div>

      <p className="text-gray-400">
        {address}
      </p>

    </div>
  );
}

export default LocationCard;