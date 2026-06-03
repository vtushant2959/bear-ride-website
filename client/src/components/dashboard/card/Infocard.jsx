function InfoCard({
  title,
  value,
}) {
  return (
    <div
      className="
        bg-zinc-950
        border border-yellow-500/10
        rounded-3xl
        p-6
      "
    >
      <h3 className="text-gray-400 text-sm mb-2">
        {title}
      </h3>

      <p className="text-3xl font-black">
        {value}
      </p>
    </div>
  );
}

export default InfoCard;