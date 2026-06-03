function PaymentHistoryTable() {
  const payments = [
    {
      id: "#PAY1024",
      amount: "₹240",
      method: "UPI",
      fee: "₹0",
      status: "Successful",
      date: "14 May 2026",
    },

    {
      id: "#PAY1025",
      amount: "₹690",
      method: "Credit Card",
      fee: "₹12",
      status: "Successful",
      date: "15 May 2026",
    },

    {
      id: "#PAY1026",
      amount: "₹120",
      method: "Wallet",
      fee: "₹0",
      status: "Pending",
      date: "16 May 2026",
    },

    {
      id: "#PAY1027",
      amount: "₹350",
      method: "UPI",
      fee: "₹0",
      status: "Failed",
      date: "17 May 2026",
    },
  ];

  return (
    <div
      className="
        bg-zinc-950
        border border-yellow-500/10
        rounded-3xl
        p-8
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black">
            Payment History
          </h2>

          <p className="text-gray-400 mt-2">
            Recent transactions and ride payments.
          </p>
        </div>

        <button
          className="
            bg-yellow-400
            text-black
            px-5 py-3
            rounded-2xl
            font-bold
            hover:scale-105
            transition-all duration-300
          "
        >
          Download Statement
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">

          <thead>
            <tr className="border-b border-yellow-500/10">

              <th className="text-left pb-5 text-gray-400">
                Payment ID
              </th>

              <th className="text-left pb-5 text-gray-400">
                Amount
              </th>

              <th className="text-left pb-5 text-gray-400">
                Method
              </th>

              <th className="text-left pb-5 text-gray-400">
                Fee
              </th>

              <th className="text-left pb-5 text-gray-400">
                Status
              </th>

              <th className="text-left pb-5 text-gray-400">
                Date
              </th>

              <th className="text-left pb-5 text-gray-400">
                Invoice
              </th>

            </tr>
          </thead>

          <tbody>

            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="
                  border-b
                  border-yellow-500/5
                  hover:bg-zinc-900/40
                  transition-all duration-300
                "
              >

                <td className="py-6 text-yellow-400 font-bold">
                  {payment.id}
                </td>

                <td className="py-6 font-bold text-white">
                  {payment.amount}
                </td>

                <td className="py-6">

                  <span
                    className="
                      px-3 py-2
                      rounded-xl
                      bg-zinc-900
                      text-sm
                    "
                  >
                    {payment.method}
                  </span>

                </td>

                <td className="py-6">
                  {payment.fee}
                </td>

                <td className="py-6">

                  <span
                    className={`
                      px-4 py-2
                      rounded-full
                      text-sm
                      font-bold

                      ${
                        payment.status === "Successful"
                          ? "bg-green-500/20 text-green-400"
                          : payment.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    `}
                  >
                    {payment.status}
                  </span>

                </td>

                <td className="py-6 text-gray-400">
                  {payment.date}
                </td>

                <td className="py-6">

                  <button
                    className="
                      bg-zinc-900
                      px-4 py-2
                      rounded-xl
                      text-sm
                      hover:bg-yellow-400
                      hover:text-black
                      transition-all duration-300
                    "
                  >
                    Download
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">

        <p>
          Showing {payments.length} transactions
        </p>

        <div className="flex gap-3">

          <button
            className="
              bg-zinc-900
              px-4 py-2
              rounded-xl
            "
          >
            Previous
          </button>

          <button
            className="
              bg-yellow-400
              text-black
              px-4 py-2
              rounded-xl
              font-bold
            "
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}

export default PaymentHistoryTable;