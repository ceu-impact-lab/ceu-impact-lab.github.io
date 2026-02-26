"use client";

import { RefObject, useEffect } from "react";

type FocusTrapOptions = {
  containerRef: RefObject<HTMLElement>;
  isActive: boolean;
  returnFocusRef?: RefObject<HTMLElement>;
};

const selector =
  "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])";

export function useFocusTrap({ containerRef, isActive, returnFocusRef }: FocusTrapOptions) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const focusables = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (isActive) {
      const first = focusables[0] ?? container;
      if (container.tabIndex < 0) {
        container.tabIndex = -1;
      }
      first.focus();
    } else if (returnFocusRef?.current) {
      returnFocusRef.current.focus();
    }

    if (!isActive) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const active = document.activeElement as HTMLElement | null;
      const items = Array.from(container.querySelectorAll<HTMLElement>(selector));
      if (!items.length) {
        event.preventDefault();
        container.focus();
        return;
      }

      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && active === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && active === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, isActive, returnFocusRef]);
}
