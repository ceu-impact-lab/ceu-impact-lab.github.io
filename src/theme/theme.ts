import { createTheme } from "@mui/material/styles";
import { siteContent } from "@/content/site";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: siteContent.themeTokens.primary,
    },
    secondary: {
      main: siteContent.themeTokens.secondary,
    },
    background: {
      default: "#f8f9fb",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "var(--font-manrope), system-ui, sans-serif",
    h1: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 700,
    },
    subtitle2: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.01em",
    },
    overline: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 700,
      letterSpacing: "0.12em",
    },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
});
