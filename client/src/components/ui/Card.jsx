function Card({
  children,
}) {
  return (
    <div
      className="
        bg-zinc-950
        border border-yellow-500/20
        rounded-3xl
        p-8
        hover:border-yellow-400
        transition-all duration-300
      "
    >
      {children}
    </div>
  );
}

export default Card;