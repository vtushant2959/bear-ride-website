function Button({
  text,
  type = "primary",
  fullWidth = false,
}) {
  return (
    <button
      className={`
        px-8 py-4 rounded-2xl font-bold transition-all duration-300

        ${
          type === "primary"
            ? "bg-yellow-400 text-black hover:scale-105"
            : ""
        }

        ${
          type === "secondary"
            ? "border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            : ""
        }

        ${
          fullWidth
            ? "w-full"
            : ""
        }
      `}
    >
      {text}
    </button>
  );
}

export default Button;