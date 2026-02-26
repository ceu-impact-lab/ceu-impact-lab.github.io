import { createTheme } from "@mui/material/styles";
import { siteContent } from "@/content/site";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: siteContent.themeTokens.primary,
      dark: "#070850",
      light: "#188FF1",
    },
    secondary: {
      main: siteContent.themeTokens.secondary,
    },
    background: {
      default: "#92DBDC",
      paper: "#92DBDC",
    },
    divider: "#969696",
    text: {
      primary: "#070850",
      secondary: "#003CA3",
    },
  },
  typography: {
    fontFamily: "var(--font-poppins), Verdana, sans-serif",
    h1: {
      fontFamily: "var(--font-poppins), Verdana, sans-serif",
      fontWeight: 200,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: "var(--font-poppins), Verdana, sans-serif",
      fontWeight: 200,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: "var(--font-poppins), Verdana, sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "var(--font-poppins), Verdana, sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "var(--font-poppins), Verdana, sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "var(--font-poppins), Verdana, sans-serif",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "var(--font-poppins), Verdana, sans-serif",
      fontWeight: 600,
    },
    subtitle2: {
      fontFamily: "var(--font-poppins), Verdana, sans-serif",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
    overline: {
      fontFamily: "var(--font-poppins), Verdana, sans-serif",
      fontWeight: 600,
      letterSpacing: "0.1em",
    },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
});
