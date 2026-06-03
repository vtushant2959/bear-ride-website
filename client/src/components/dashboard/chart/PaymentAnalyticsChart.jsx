import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PaymentAnalyticsChart() {
  const data = [
    { month: "Jan", amount: 200 },
    { month: "Feb", amount: 350 },
    { month: "Mar", amount: 480 },
    { month: "Apr", amount: 250 },
    { month: "May", amount: 600 },
  ];

  return (
    <div
      className="
        bg-zinc-950
        rounded-3xl
        p-8
        border border-yellow-500/10
      "
    >
      <h2 className="text-3xl font-black mb-6">
        Monthly Spending
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#facc15"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PaymentAnalyticsChart;