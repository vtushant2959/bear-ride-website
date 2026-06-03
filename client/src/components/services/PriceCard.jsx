function PriceCard({
  title,
  price,
  description,
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

      <h2 className="text-2xl font-black mb-3">
        {title}
      </h2>

      <h3 className="text-5xl font-black text-yellow-400 mb-4">
        {price}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>

    </div>
  );
}

export default PriceCard;