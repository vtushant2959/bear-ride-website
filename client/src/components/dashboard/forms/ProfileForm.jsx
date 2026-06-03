function ProfileForm() {
  return (
    <div
      className="
        bg-zinc-950
        border border-yellow-500/10
        rounded-3xl
        p-8
      "
    >
      <h2 className="text-3xl font-black mb-8">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          placeholder="Full Name"
          className="bg-black p-4 rounded-2xl"
        />

        <input
          placeholder="Phone Number"
          className="bg-black p-4 rounded-2xl"
        />

        <input
          placeholder="Email"
          className="bg-black p-4 rounded-2xl"
        />

        <input
          placeholder="City"
          className="bg-black p-4 rounded-2xl"
        />

      </div>

      <button
        className="
          mt-8
          bg-yellow-400
          text-black
          px-8 py-4
          rounded-2xl
          font-bold
        "
      >
        Save Changes
      </button>

    </div>
  );
}

export default ProfileForm;