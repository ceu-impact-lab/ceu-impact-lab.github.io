"use client";

import { AppBar, Box, Button, Container, Drawer, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { siteContent } from "@/content/site";
import { CTAButtons } from "@/components/CTAButtons";
import { AnimatedBackground } from "@/components/AnimatedBackground";

type LayoutProps = {
  children: ReactNode;
};

const navItems = [
  { label: "Bases", href: "/bases" },
  { label: "Inscripcion", href: "/inscripcion" },
  { label: "Empresas", href: "/empresas" },
];

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
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
      <AnimatedBackground />
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
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
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 2, lg: 2 } }}>
          <Container
            disableGutters
            maxWidth="lg"
            sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}
          >
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              {siteContent.eventName}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={1} sx={{ display: { xs: "none", lg: "flex" } }}>
              {navItems.map((item) => (
                <Button key={item.href} component={Link} href={item.href} size="small">
                  {item.label}
                </Button>
              ))}
            </Stack>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              <CTAButtons size="small" />
            </Box>
            <IconButton
              aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
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
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {siteContent.eventName}
            </Typography>
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
