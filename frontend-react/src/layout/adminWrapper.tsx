import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";
import { GlobalLoader } from "../components/GlobalLoader";

const AdminWrapper = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-white">
      <GlobalLoader />
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Container */}
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Dynamic Page Content */}
        <main className="px-4 py-2 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminWrapper;
