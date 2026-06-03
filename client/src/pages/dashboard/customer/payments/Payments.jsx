import DashboardLayout from "../../../../components/dashboard/layout/DashboardLayout";

import WalletCard from "../../../../components/dashboard/card/WalletCard";

import PaymentHistoryTable from "../../../../components/dashboard/tables/PaymentHistoryTable";

import PaymentAnalyticsChart from "../../../../components/dashboard/chart/PaymentAnalyticsChart";

function Payments() {
  return (
    <DashboardLayout>
      <div>

        <div className="mb-10">

          <h1 className="text-5xl font-black mb-3">
            Payments
          </h1>

          <p className="text-gray-400">
            Manage wallet, cards and transactions.
          </p>

        </div>

        <WalletCard />

        <div className="mt-10">
          <PaymentAnalyticsChart />
        </div>

        <div className="mt-10">
          <PaymentHistoryTable />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Payments;