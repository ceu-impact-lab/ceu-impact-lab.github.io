"use client";

import { AppBar, Box, Button, Container, Drawer, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { siteContent } from "@/content/site";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { CursorDot } from "@/components/layout/CursorDot";
import logo from "../../../img/CEU_Impact_Lab-Logo.png";
import logoMarginless from "../../../img/CEU_Impact_Lab-Logo-Marginless.png";

type LayoutProps = {
  children: ReactNode;
};

const navItems = [
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Agenda", href: "/#agenda" },
  { label: "Rúbrica", href: "/#rubrica" },
  { label: "Bases", href: "/bases" },
];

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Keep the mobile drawer state clean when switching to desktop widths.
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Ambient background layer; tweak opacity/gradients in AnimatedBackground if needed. */}
      <AnimatedBackground />
      {/* Custom cursor overlay (desktop pointers only); style in globals.css. */}
      <CursorDot />
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          // Adjust these inset values to align the floating navbar with page margins.
          top: { xs: 12, md: 16 },
          left: "50%",
          width: {
            xs: "calc(100% - 32px)",
            sm: "calc(100% - 48px)",
            lg: "1200px",
          },
          transform: "translateX(-50%)",
          zIndex: 2,
          backdropFilter: "blur(16px)",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 999,
          backgroundColor: "rgba(218, 218, 218, 0.35)",
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 2, lg: 2 } }}>
          <Container
            disableGutters
            maxWidth="lg"
            sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}
          >
            <Box
              component={Link}
              href="/"
              onClick={() => {
                if (typeof window !== "undefined" && window.location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              sx={{ display: "inline-flex", alignItems: "center", gap: 1, textDecoration: "none" }}
            >
              <Image
                src={logo}
                alt="CEU Impact Lab"
                width={220}
                height={44}
                style={{ width: "auto", height: 32 }}
                priority
              />
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  border: 0,
                }}
              >
                {siteContent.eventName}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={1} sx={{ display: { xs: "none", lg: "flex" } }}>
              {/* Desktop-only primary links. */}
              {navItems.map((item) => (
                <Button key={item.href} component={Link} href={item.href} size="small">
                  {item.label}
                </Button>
              ))}
            </Stack>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              {/* Desktop-only CTAs; adjust size via CTAButtons props. */}
              <CTAButtons size="small" />
            </Box>
            <IconButton
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              sx={{ display: { xs: "inline-flex", lg: "none" } }}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            // Mobile menu spacing; adjust mt/mx/p for different visual density.
            mt: { xs: 9, sm: 10 },
            borderRadius: 2,
            mx: { xs: 2, sm: 3 },
            p: 3,
          },
        }}
      >
        <Stack spacing={2}>
          {navItems.map((item) => (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              size="large"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Button>
          ))}
          <CTAButtons direction="column" size="large" />
        </Stack>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pt: { xs: 10, md: 12 }, position: "relative", zIndex: 1 }}>
        {children}
      </Box>
      <Box component="footer" sx={{ py: 6, borderTop: "1px solid", borderColor: "divider", position: "relative", zIndex: 1 }}>
        <Container maxWidth="lg" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box component={Link} href="/" sx={{ display: "inline-flex", alignItems: "center" }}>
              <Image
                src={logoMarginless}
                alt="CEU Impact Lab"
                width={220}
                height={44}
                style={{ width: "auto", height: 28 }}
              />
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  border: 0,
                }}
              >
                {siteContent.eventName}
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {siteContent.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {siteContent.dates} · Awards {siteContent.awardsDate}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {navItems.slice(0, 5).map((item) => (
              <Button key={item.href} component={Link} href={item.href} size="small">
                {item.label}
              </Button>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
