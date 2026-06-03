import {
  FaWallet,
  FaPlus,
} from "react-icons/fa";

function WalletCard() {

  return (
    <div
      className="
        bg-gradient-to-br
        from-yellow-400
        to-yellow-500

        text-black

        rounded-3xl

        p-8

        relative

        overflow-hidden
      "
    >

      {/* GLOW */}
      <div
        className="
          absolute
          -top-10
          -right-10

          w-40 h-40

          bg-white/20

          rounded-full
        "
      ></div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        <div>

          <p className="font-semibold">
            Wallet Balance
          </p>

          <h2 className="text-6xl font-black mt-3">
            ₹540
          </h2>

        </div>

        <FaWallet className="text-5xl" />

      </div>

      {/* LOYALTY */}
      <div className="mb-10">

        <p className="font-semibold">
          Loyalty Points
        </p>

        <h3 className="text-4xl font-black mt-2">
          2,450
        </h3>

      </div>

      {/* BUTTON */}
      <button
        className="
          bg-black
          text-white

          px-8 py-4

          rounded-2xl

          font-bold

          flex
          items-center
          gap-3

          hover:scale-105

          transition-all duration-300
        "
      >

        <FaPlus />

        Add Money

      </button>

    </div>
  );
}

export default WalletCard;