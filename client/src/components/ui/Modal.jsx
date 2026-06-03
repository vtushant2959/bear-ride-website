function Modal({
  isOpen,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="
      fixed inset-0
      bg-black/70
      flex justify-center items-center
      z-[200]
      px-5
    ">

      <div className="
        bg-zinc-950
        border border-yellow-500/20
        rounded-3xl
        p-10
        max-w-2xl
        w-full
      ">
        {children}
      </div>

    </div>
  );
}

export default Modal;