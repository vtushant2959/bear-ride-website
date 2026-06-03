import Sidebar from "../sidebar/Sidebar";

import DashboardNavbar from "../navbar/DashboardNavbar";

function DashboardLayout({
  children,
}) {

  return (
    <div className="flex bg-black min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1">

        {/* NAVBAR */}
        <DashboardNavbar />

        {/* CONTENT */}
        <div className="p-8">
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;