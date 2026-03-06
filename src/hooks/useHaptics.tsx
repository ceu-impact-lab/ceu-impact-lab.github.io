"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { WebHaptics } from "web-haptics";

type HapticsContextValue = {
  trigger: WebHaptics["trigger"];
};

const HapticsContext = createContext<HapticsContextValue>({
  trigger: async () => {},
});

export function HapticsProvider({ children }: { children: ReactNode }) {
  const hapticsRef = useRef<WebHaptics | null>(null);

  useEffect(() => {
    const instance = new WebHaptics();
    hapticsRef.current = instance;
    return () => {
      instance.destroy();
      hapticsRef.current = null;
    };
  }, []);

  const trigger: WebHaptics["trigger"] = (...args) => {
    if (hapticsRef.current) {
      return hapticsRef.current.trigger(...args);
    }
    return Promise.resolve();
  };

  return (
    <HapticsContext.Provider value={{ trigger }}>
      {children}
    </HapticsContext.Provider>
  );
}

export function useHaptics() {
  return useContext(HapticsContext);
}
