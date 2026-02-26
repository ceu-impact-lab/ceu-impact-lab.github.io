"use client";

import { useEffect, useRef } from "react";

type BodyStyles = {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflow: string;
};

export function useLockBodyScroll(locked: boolean) {
  const previousStyles = useRef<BodyStyles | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const body = document.body;
    if (!body) {
      return;
    }

    if (locked) {
      scrollYRef.current = window.scrollY;
      previousStyles.current = {
        position: body.style.position,
        top: body.style.top,
        left: body.style.left,
        right: body.style.right,
        width: body.style.width,
        overflow: body.style.overflow,
      };
      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
    } else if (previousStyles.current) {
      body.style.position = previousStyles.current.position;
      body.style.top = previousStyles.current.top;
      body.style.left = previousStyles.current.left;
      body.style.right = previousStyles.current.right;
      body.style.width = previousStyles.current.width;
      body.style.overflow = previousStyles.current.overflow;
      window.scrollTo(0, scrollYRef.current);
      previousStyles.current = null;
    }
  }, [locked]);
}
