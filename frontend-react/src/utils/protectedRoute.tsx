import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";
import { motion } from "framer-motion";

interface AllowedRoles {
  allowedRoles: string[] | null;
}

const ProtectedRoute = ({ allowedRoles }: AllowedRoles) => {
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );
  const location = useLocation();
  const userRole = user?.role ?? "";

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden">
        {/* Background Ambient Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none"
        />

        <div className="z-10 flex flex-col items-center gap-6">
          {/* Dual Rotating Spinner Ring */}
          <div className="relative flex items-center justify-center w-16 h-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-2 border-4 border-purple-500/20 border-b-purple-400 rounded-full"
            />
            {/* Glowing Center Core */}
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_12px_rgba(244,114,182,0.8)]"
            />
          </div>

          {/* Pulsing Loading Text */}
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-slate-400 text-sm font-medium tracking-widest uppercase"
          >
            Verifying session...
          </motion.p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    // Redirect to login and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />; // Or to a dedicated /unauthorized page
  }

  return <Outlet />;
};

export default ProtectedRoute;
