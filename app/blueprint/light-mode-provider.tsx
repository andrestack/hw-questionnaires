"use client";

import { useEffect } from "react";

export function LightModeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return <>{children}</>;
}
