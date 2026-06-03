import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

function RideAnalyticsChart() {

  const data = [
    {
      day: "Mon",
      rides: 4,
    },

    {
      day: "Tue",
      rides: 7,
    },

    {
      day: "Wed",
      rides: 5,
    },

    {
      day: "Thu",
      rides: 9,
    },

    {
      day: "Fri",
      rides: 12,
    },

    {
      day: "Sat",
      rides: 15,
    },

    {
      day: "Sun",
      rides: 11,
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
      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Ride Analytics
        </h2>

        <p className="text-gray-400 mt-2">
          Weekly ride activity overview.
        </p>

      </div>

      {/* CHART */}
      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="colorRides"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#facc15"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#facc15"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <XAxis
              dataKey="day"

              stroke="#999"

              tickLine={false}

              axisLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"

              dataKey="rides"

              stroke="#facc15"

              fillOpacity={1}

              fill="url(#colorRides)"

              strokeWidth={4}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default RideAnalyticsChart;