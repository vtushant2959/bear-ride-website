import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";

function BookEnterprise() {
  const plans = [
    {
      name: "Starter",
      price: "₹9,999/month",
      features: [
        "50 Monthly Trips",
        "Basic Analytics",
        "Email Support",
      ],
    },
    {
      name: "Business",
      price: "₹24,999/month",
      features: [
        "500 Monthly Trips",
        "Advanced Analytics",
        "Priority Support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom Pricing",
      features: [
        "Unlimited Trips",
        "Dedicated Manager",
        "Custom Integrations",
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div>

        {/* HERO */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">
            Enterprise Solutions
          </h1>

          <p className="text-gray-400 text-lg max-w-4xl">
            Manage employee transportation, business travel,
            airport transfers, logistics and corporate mobility
            from one powerful platform.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-gray-400 mb-3">
              Companies
            </h3>

            <h2 className="text-5xl font-black text-yellow-400">
              120+
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-gray-400 mb-3">
              Monthly Trips
            </h3>

            <h2 className="text-5xl font-black text-green-400">
              14K
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-gray-400 mb-3">
              Employees
            </h3>

            <h2 className="text-5xl font-black text-blue-400">
              28K
            </h2>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h3 className="text-gray-400 mb-3">
              Cities Served
            </h3>

            <h2 className="text-5xl font-black text-purple-400">
              75+
            </h2>
          </div>

        </div>

        {/* BENEFITS */}
        <div className="bg-zinc-950 rounded-3xl p-8 border border-yellow-500/10 mb-12">

          <h2 className="text-3xl font-black mb-8">
            Enterprise Benefits
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-black rounded-2xl p-6">
              24/7 Employee Transportation
            </div>

            <div className="bg-black rounded-2xl p-6">
              Centralized Billing
            </div>

            <div className="bg-black rounded-2xl p-6">
              Live Ride Tracking
            </div>

            <div className="bg-black rounded-2xl p-6">
              Detailed Analytics Reports
            </div>

          </div>

        </div>

        {/* PLANS */}
        <div className="mb-12">

          <h2 className="text-4xl font-black mb-8">
            Pricing Plans
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {plans.map((plan, index) => (
              <div
                key={index}
                className="
                  bg-zinc-950
                  border border-yellow-500/10
                  rounded-3xl
                  p-8
                "
              >
                <h3 className="text-3xl font-black mb-4">
                  {plan.name}
                </h3>

                <p className="text-yellow-400 text-3xl font-black mb-6">
                  {plan.price}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((item, i) => (
                    <li key={i}>
                      ✓ {item}
                    </li>
                  ))}
                </ul>

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
                  Choose Plan
                </button>
              </div>
            ))}

          </div>

        </div>

        {/* INDUSTRIES */}
        <div className="bg-zinc-950 rounded-3xl p-8 border border-yellow-500/10 mb-12">

          <h2 className="text-3xl font-black mb-8">
            Industries We Serve
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-black p-6 rounded-2xl">
              IT Companies
            </div>

            <div className="bg-black p-6 rounded-2xl">
              BPO & Call Centers
            </div>

            <div className="bg-black p-6 rounded-2xl">
              Manufacturing
            </div>

            <div className="bg-black p-6 rounded-2xl">
              Logistics & Supply Chain
            </div>

          </div>

        </div>

        {/* DEMO FORM */}
        <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10 mb-12">

          <h2 className="text-3xl font-black mb-6">
            Request Demo
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              placeholder="Company Name"
              className="p-5 rounded-2xl bg-black"
            />

            <input
              placeholder="Contact Person"
              className="p-5 rounded-2xl bg-black"
            />

            <input
              placeholder="Business Email"
              className="p-5 rounded-2xl bg-black"
            />

            <input
              placeholder="Phone Number"
              className="p-5 rounded-2xl bg-black"
            />

            <input
              placeholder="Company Size"
              className="p-5 rounded-2xl bg-black"
            />

            <input
              placeholder="Monthly Trips Required"
              className="p-5 rounded-2xl bg-black"
            />

          </div>

          <textarea
            rows="5"
            placeholder="Business Requirements"
            className="
              w-full
              mt-5
              p-5
              rounded-2xl
              bg-black
            "
          />

          <button
            className="
              mt-8
              bg-yellow-400
              text-black
              px-10
              py-4
              rounded-2xl
              font-bold
            "
          >
            Request Demo
          </button>

        </div>

        {/* ACCOUNT MANAGER */}
        <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10 mb-12">

          <h2 className="text-3xl font-black mb-6">
            Dedicated Account Manager
          </h2>

          <p className="text-gray-400 mb-6">
            Every enterprise customer receives a dedicated
            account manager for onboarding, reporting,
            billing support and operational assistance.
          </p>

          <button
            className="
              bg-green-500
              text-white
              px-8
              py-4
              rounded-2xl
              font-bold
            "
          >
            Talk To Enterprise Team
          </button>

        </div>

        {/* CTA */}
        <div
          className="
            bg-gradient-to-r
            from-yellow-400
            to-yellow-500

            text-black

            rounded-3xl
            p-10
            text-center
          "
        >
          <h2 className="text-4xl font-black mb-4">
            Ready To Transform Employee Mobility?
          </h2>

          <p className="text-lg mb-8">
            Join hundreds of companies already using BearRide Enterprise.
          </p>

          <button
            className="
              bg-black
              text-white
              px-10
              py-4
              rounded-2xl
              font-bold
            "
          >
            Schedule Consultation
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default BookEnterprise;