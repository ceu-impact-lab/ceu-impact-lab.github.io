"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { WebHaptics } from "web-haptics";

type HapticsContextValue = {
  boop: () => void;
};

const HapticsContext = createContext<HapticsContextValue>({
  boop: () => {},
});

const BOOP_PATTERN = [{ duration: 35 }];

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

  const boop = useCallback(() => {
    hapticsRef.current?.trigger(BOOP_PATTERN, { intensity: 1 });
  }, []);

  return (
    <HapticsContext.Provider value={{ boop }}>
      {children}
    </HapticsContext.Provider>
  );
}

export function useHaptics() {
  return useContext(HapticsContext);
}
