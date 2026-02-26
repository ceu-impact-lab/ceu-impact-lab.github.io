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
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
});
