"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { WebHaptics } from "web-haptics";

type HapticsContextValue = {
  boop: () => void;
};

const HapticsContext = createContext<HapticsContextValue>({
  boop: () => {},
});

/** Single crisp tap — mirrors Apple's Taptic "tick". */
const BOOP = [{ duration: 10, intensity: 1 }];

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
    hapticsRef.current?.trigger(BOOP);
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
