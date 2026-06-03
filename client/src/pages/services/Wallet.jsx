import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import PaymentHistoryTable from "../../components/dashboard/tables/PaymentHistoryTable";

import {
  FaWallet,
  FaCreditCard,
  FaGooglePay,
  FaShieldAlt,
  FaGift,
} from "react-icons/fa";

function Wallet() {
  return (
    <DashboardLayout>
      <div>
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3">
            Wallet
          </h1>

          <p className="text-gray-400 text-lg">
            Manage balance, cards, UPI, rewards and transactions.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400">
                Current Balance
              </h3>

              <FaWallet className="text-yellow-400 text-3xl" />
            </div>

            <h2 className="text-5xl font-black text-yellow-400">
              ₹540
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400">
                Cashback
              </h3>

              <FaGift className="text-green-400 text-3xl" />
            </div>

            <h2 className="text-5xl font-black text-green-400">
              ₹120
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400">
                Transactions
              </h3>

              <FaCreditCard className="text-blue-400 text-3xl" />
            </div>

            <h2 className="text-5xl font-black text-blue-400">
              58
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400">
                Monthly Spend
              </h3>

              <FaWallet className="text-purple-400 text-3xl" />
            </div>

            <h2 className="text-5xl font-black text-purple-400">
              ₹12K
            </h2>
          </div>
        </div>

        {/* ADD MONEY + PAYMENT METHODS */}
        <div className="grid xl:grid-cols-2 gap-8 mb-10">

          {/* ADD MONEY */}
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h2 className="text-3xl font-black mb-6">
              Add Money
            </h2>

            <input
              type="number"
              placeholder="Enter amount"
              className="
                w-full
                p-5
                rounded-2xl
                bg-black
                border border-yellow-500/10
                mb-5
                outline-none
              "
            />

            {/* QUICK AMOUNTS */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              <button className="bg-black p-3 rounded-xl">
                ₹100
              </button>

              <button className="bg-black p-3 rounded-xl">
                ₹500
              </button>

              <button className="bg-black p-3 rounded-xl">
                ₹1000
              </button>

              <button className="bg-black p-3 rounded-xl">
                ₹2000
              </button>
            </div>

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
              Add Money
            </button>
          </div>

          {/* PAYMENT METHODS */}
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h2 className="text-3xl font-black mb-6">
              Payment Methods
            </h2>

            <div className="space-y-4">

              <div className="bg-black p-5 rounded-2xl flex justify-between">
                <span>
                  VISA **** 4455
                </span>

                <span className="text-green-400">
                  Active
                </span>
              </div>

              <div className="bg-black p-5 rounded-2xl flex justify-between">
                <span>
                  Mastercard **** 1188
                </span>

                <span className="text-green-400">
                  Active
                </span>
              </div>

              <div className="bg-black p-5 rounded-2xl flex justify-between">
                <span>
                  UPI : tushant@paytm
                </span>

                <FaGooglePay
                  className="
                    text-yellow-400
                    text-xl
                  "
                />
              </div>

            </div>

            <button
              className="
                mt-6
                w-full
                bg-blue-500
                py-4
                rounded-2xl
                font-bold
              "
            >
              Add New Payment Method
            </button>
          </div>

        </div>

        {/* REWARDS + SECURITY */}
        <div className="grid xl:grid-cols-2 gap-8 mb-10">

          {/* REWARDS */}
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h2 className="text-3xl font-black mb-6">
              Rewards & Cashback
            </h2>

            <div className="space-y-4">

              <div className="bg-black p-4 rounded-2xl">
                ₹50 Cashback earned from Ride #BR1024
              </div>

              <div className="bg-black p-4 rounded-2xl">
                ₹20 Cashback earned from Wallet Recharge
              </div>

              <div className="bg-black p-4 rounded-2xl">
                ₹50 Cashback earned from Hotel Booking
              </div>

            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <div className="flex items-center gap-4 mb-6">

              <FaShieldAlt
                className="
                  text-yellow-400
                  text-4xl
                "
              />

              <h2 className="text-3xl font-black">
                Security
              </h2>

            </div>

            <div className="space-y-4">

              <div className="bg-black p-4 rounded-2xl">
                2-Factor Authentication Enabled
              </div>

              <div className="bg-black p-4 rounded-2xl">
                Last Login: 17 May 2026
              </div>

              <div className="bg-black p-4 rounded-2xl">
                Device Verification Active
              </div>

            </div>

            <button
              className="
                mt-6
                w-full
                bg-yellow-400
                text-black
                py-4
                rounded-2xl
                font-bold
              "
            >
              Manage Security
            </button>
          </div>

        </div>

        {/* TRANSACTION HISTORY */}
        <PaymentHistoryTable />

      </div>
    </DashboardLayout>
  );
}

export default Wallet;