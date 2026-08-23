import React from "react";
import { useAppSelector } from "../hooks/useRedux";
import { LoadingScreen } from "./LoadingScreen";

export const GlobalLoader: React.FC = () => {
  const { activeRequests, statusText, progress } = useAppSelector(
    (state) => state.loading,
  );

  const isLoading = activeRequests > 0;

  if (!isLoading) return null;

  return (
    <LoadingScreen
      progress={progress > 0 ? progress : 100}
      statusText={statusText}
    />
  );
};
