"use client";

import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { siteContent } from "@/content/site";

type CTAButtonsProps = {
  direction?: "row" | "column";
  size?: "small" | "medium" | "large";
};

export function CTAButtons({ direction = "row", size = "large" }: CTAButtonsProps) {
  const { studentRegistrationUrl, companyContactUrl } =
    siteContent.primaryCTAs;
  const hasRegistration = Boolean(studentRegistrationUrl);

  return (
    <Stack direction={{ xs: "column", sm: direction }} spacing={2}>
      <Button
        component={Link}
        href={studentRegistrationUrl || "#"}
        size={size}
        variant="contained"
        color="primary"
        disabled={!hasRegistration}
      >
        Inscribete (Estudiantes)
      </Button>
      <Button
        component={Link}
        href={companyContactUrl}
        size={size}
        variant="outlined"
        color="primary"
      >
        Quiero colaborar (Empresas)
      </Button>
    </Stack>
  );
}
