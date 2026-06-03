function ServiceFilterBar() {
  return (
    <div
      className="
        flex
        flex-wrap
        gap-4

        mb-10
      "
    >

      <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold">
        All
      </button>

      <button className="bg-zinc-950 px-5 py-3 rounded-xl">
        Popular
      </button>

      <button className="bg-zinc-950 px-5 py-3 rounded-xl">
        Budget
      </button>

      <button className="bg-zinc-950 px-5 py-3 rounded-xl">
        Premium
      </button>

      <button className="bg-zinc-950 px-5 py-3 rounded-xl">
        Nearby
      </button>

    </div>
  );
}

export default ServiceFilterBar;