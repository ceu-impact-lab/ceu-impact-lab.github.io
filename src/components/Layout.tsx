"use client";

import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteContent } from "@/content/site";
import { CTAButtons } from "@/components/CTAButtons";

type LayoutProps = {
  children: ReactNode;
};

const navItems = [
  { label: "Bases", href: "/bases" },
  { label: "Inscripcion", href: "/inscripcion" },
  { label: "Empresas", href: "/empresas" },
];

export function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          top: { xs: 12, md: 16 },
          left: { xs: 12, md: 24 },
          right: { xs: 12, md: 24 },
          width: "auto",
          backdropFilter: "blur(16px)",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 999,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              {siteContent.eventName}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={1}>
              {navItems.map((item) => (
                <Button key={item.href} component={Link} href={item.href} size="small">
                  {item.label}
                </Button>
              ))}
            </Stack>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <CTAButtons size="small" />
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, pt: { xs: 10, md: 12 } }}>
        {children}
      </Box>
      <Box component="footer" sx={{ py: 6, borderTop: "1px solid", borderColor: "divider" }}>
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
