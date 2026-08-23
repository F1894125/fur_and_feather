import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: "📊" },
  { label: "All Pets", path: "/admin/all-pets", icon: "📊" },
  { label: "Manage Pets", path: "/admin/manage-pet/:petId", icon: "🐾" },
  { label: "Adoptions", path: "/admin/adoptions", icon: "📋" },
  { label: "All-Shelters", path: "/admin/all-shelters", icon: "📋" },
  { label: "All-Adopters", path: "/admin/all-adopters", icon: "📋" },
  { label: "ManageShelter", path: "/admin/shelter-details", icon: "📋" },
  { label: "Users", path: "/admin/users", icon: "👥" },
  { label: "Settings", path: "/admin/settings", icon: "⚙️" },
];

export default function AdminSidebar({ isOpen, setIsOpen }: any) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-30 h-screen w-64 mt-2 rounded-2xl bg-[#0b252b] text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-6 py-2 border-b border-slate-800">
          <span className="text-xl font-bold tracking-wide text-indigo-400">
            AdminPanel
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#f04938] text-white"
                    : "text-slate-300 hover:bg-[#13373f] hover:text-slate-200"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
