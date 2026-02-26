"use client";

import { Box } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const drift = keyframes`
  0% {
    transform: translate3d(-6%, -4%, 0) scale(1);
  }
  50% {
    transform: translate3d(4%, 6%, 0) scale(1.04);
  }
  100% {
    transform: translate3d(-6%, -4%, 0) scale(1);
  }
`;

export function AnimatedBackground() {
  return (
    <Box
      aria-hidden
      sx={{
        // Adjust opacity or gradient stops to make the background stronger/weaker.
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.9,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "-10%",
          // Update rgba values to shift hue or intensity without changing layout.
          background:
            "radial-gradient(44% 44% at 20% 18%, #188FF1 0%, transparent 60%)," +
            "radial-gradient(38% 38% at 82% 28%, #52A095 0%, transparent 60%)," +
            "radial-gradient(32% 32% at 28% 82%, #755B77 0%, transparent 70%)",
          // Change duration to speed up or slow down the drift.
          animation: `${drift} 22s ease-in-out infinite`,
        },
        "@media (prefers-reduced-motion: reduce)": {
          "&::before": {
            animation: "none",
          },
        },
      }}
    />
  );
}
