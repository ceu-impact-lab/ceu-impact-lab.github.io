"use client";

import { Box, Container, Typography } from "@mui/material";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <Box component="section" id={id} sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {title ? (
          <Box sx={{ mb: 4 }}>
            {subtitle ? (
              <Typography variant="overline" color="text.secondary">
                {subtitle}
              </Typography>
            ) : null}
            <Typography variant="h2" sx={{ mt: 1 }}>
              {title}
            </Typography>
          </Box>
        ) : null}
        {children}
      </Container>
    </Box>
  );
}
