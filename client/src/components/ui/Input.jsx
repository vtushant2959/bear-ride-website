function Input({
  type = "text",
  placeholder,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full
        bg-black
        border border-yellow-500/20
        rounded-2xl
        px-6 py-5
        outline-none
        text-white
        focus:border-yellow-400
        transition-all duration-300
      "
    />
  );
}

export default Input;