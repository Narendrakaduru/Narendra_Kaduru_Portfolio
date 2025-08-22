import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-ZJ4CDK2YX9", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
}
