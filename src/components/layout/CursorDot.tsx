"use client";

import { useEffect, useRef } from "react";

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) {
      return;
    }

    // Track pointer movement and move the custom cursor without re-rendering.
    let raf = 0;
    const handleMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      if (raf) {
        cancelAnimationFrame(raf);
      }
      raf = requestAnimationFrame(() => {
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
