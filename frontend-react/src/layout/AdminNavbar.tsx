// import { useSelector, useDispatch } from "react-redux";
import { logOut, logOutUserThunk } from "../store/slices/authSlice"; // Adjust path to your auth slice
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ onToggleSidebar }: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth?.user);
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(logOutUserThunk()).unwrap();
    } finally {
      dispatch(logOut());
      navigate("/login", { replace: true });
    }
  };
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-24 mx-6 mt-2 px-6 py-4 rounded-2xl bg-white border-b border-gray-200 dark:bg-[#0b252b]  dark:border-slate-700">
      {/* Left: Sidebar Toggle & Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-gray-600 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700"
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>

        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 py-1.5 pl-9 pr-4 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
          />
          <span className="absolute left-3 top-2 text-sm text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* Right: Actions & User Info */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700">
          🔔
        </button>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-4 dark:border-slate-700">
          <div className="flex flex-col text-right md:block">
            <span className="text-sm font-semibold text-gray-800 dark:text-slate-100">
              {user?.first_name || "Super Admin "}
            </span>
            <span className="text-xs text-indigo-500 font-medium capitalize">
              Role:{user?.role || "Administrator"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
