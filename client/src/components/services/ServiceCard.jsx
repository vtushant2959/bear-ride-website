function ServiceCard({
  image,
  title,
  location,
  price,
  buttonText = "Book Now",
}) {
  return (
    <div
      className="
        bg-zinc-950

        border border-yellow-500/10

        rounded-3xl

        overflow-hidden
      "
    >

      <img
        src={image}
        alt={title}
        className="
          w-full
          h-56
          object-cover
        "
      />

      <div className="p-6">

        <h2 className="text-2xl font-black mb-2">
          {title}
        </h2>

        <p className="text-gray-400 mb-3">
          {location}
        </p>

        <h3 className="text-yellow-400 text-2xl font-black mb-5">
          {price}
        </h3>

        <button
          className="
            w-full

            bg-yellow-400
            text-black

            py-4

            rounded-2xl

            font-bold
          "
        >
          {buttonText}
        </button>

      </div>

    </div>
  );
}

export default ServiceCard;