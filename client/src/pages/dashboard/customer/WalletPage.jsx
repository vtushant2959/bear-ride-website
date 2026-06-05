import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import DashboardLayout from "../../../components/dashboard/layout/DashboardLayout";
import { getTransactions, createWalletOrder, verifyWalletPayment } from "../../../services/featureService";
import toast from "react-hot-toast";
import { FaWallet, FaPlus, FaArrowUp, FaArrowDown, FaCoins } from "react-icons/fa";

const AMOUNTS = [50, 100, 200, 500, 1000];

export default function WalletPage() {
  const { user, updateUser } = useAuth();
  const [txns, setTxns]       = useState([]);
  const [balance, setBalance] = useState(user?.walletBalance || 0);
  const [amount, setAmount]   = useState(100);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getTransactions()
      .then((res) => { setTxns(res.transactions || []); setBalance(res.walletBalance || 0); })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const handleTopUp = async () => {
    if (amount < 10) { toast.error("Minimum ₹10"); return; }
    try {
      setLoading(true);
      const res = await createWalletOrder(amount);
      if (!res.key) { toast.error("Razorpay not configured. Add RAZORPAY keys."); return; }

      const options = {
        key:      res.key,
        amount:   res.order.amount,
        currency: "INR",
        name:     "BearRide",
        description: "Wallet Top-up",
        order_id: res.order.id,
        handler: async (payment) => {
          try {
            const verify = await verifyWalletPayment({ ...payment, amount: res.order.amount });
            if (verify.success) {
              setBalance(verify.walletBalance);
              updateUser({ walletBalance: verify.walletBalance });
              toast.success(`₹${amount} added to wallet!`);
              const txRes = await getTransactions();
              setTxns(txRes.transactions || []);
            }
          } catch { toast.error("Payment verification failed"); }
        },
        theme: { color: "#FACC15" },
      };

      if (window.Razorpay) {
        new window.Razorpay(options).open();
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => new window.Razorpay(options).open();
        document.head.appendChild(script);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Balance card */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30 rounded-3xl p-8 text-center">
          <FaWallet className="text-4xl text-yellow-400 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Available Balance</p>
          <h1 className="text-5xl font-black text-yellow-400 my-2">₹{balance.toFixed(2)}</h1>
          <p className="text-gray-500 text-xs">
            <FaCoins className="inline mr-1" />{user?.loyaltyPoints || 0} loyalty points
          </p>
        </div>

        {/* Top up */}
        <div className="bg-zinc-950 border border-yellow-500/20 rounded-3xl p-6">
          <h2 className="text-xl font-black mb-4">Add Money</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                className={`px-4 py-2 rounded-xl border text-sm font-bold transition-all ${amount === a ? "border-yellow-400 bg-yellow-400/10 text-yellow-400" : "border-yellow-500/10 text-gray-500 hover:border-yellow-500/30"}`}
              >
                ₹{a}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input
              type="number" min={10} placeholder="Custom amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="flex-1 bg-black border border-yellow-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
            />
            <button
              onClick={handleTopUp}
              disabled={loading}
              className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-xl font-black hover:scale-105 transition-all disabled:opacity-50"
            >
              <FaPlus /> {loading ? "..." : "Add"}
            </button>
          </div>
          <p className="text-gray-600 text-xs mt-2">Powered by Razorpay · Secure payments</p>
        </div>

        {/* Transaction history */}
        <div className="bg-zinc-950 border border-yellow-500/10 rounded-3xl p-6">
          <h2 className="text-xl font-black mb-5">Transaction History</h2>
          {fetching ? (
            <p className="text-gray-500 text-center py-6">Loading...</p>
          ) : txns.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No transactions yet</p>
          ) : (
            <div className="space-y-3">
              {txns.map((txn) => (
                <div key={txn.id} className="flex items-center gap-4 bg-black rounded-2xl px-4 py-3 border border-yellow-500/10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${txn.type === "CREDIT" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {txn.type === "CREDIT" ? <FaArrowDown /> : <FaArrowUp />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{txn.description}</p>
                    <p className="text-gray-500 text-xs">{new Date(txn.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                  <p className={`font-black text-lg flex-shrink-0 ${txn.type === "CREDIT" ? "text-green-400" : "text-red-400"}`}>
                    {txn.type === "CREDIT" ? "+" : "-"}₹{txn.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
