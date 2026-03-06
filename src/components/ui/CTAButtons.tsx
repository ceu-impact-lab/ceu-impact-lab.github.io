"use client";

import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { siteContent } from "@/content/site";
import { useHaptics } from "@/hooks/useHaptics";

type CTAButtonsProps = {
  direction?: "row" | "column";
  size?: "small" | "medium" | "large";
};

export function CTAButtons({ direction = "row", size = "large" }: CTAButtonsProps) {
  const { boop } = useHaptics();
  const { studentRegistrationUrl, companyContactUrl } =
    siteContent.primaryCTAs;
  const hasRegistration = Boolean(studentRegistrationUrl);
  const hasCompanyContact = false;

  return (
    <Stack direction={{ xs: "column", sm: direction }} spacing={2}>
      <Button
        component={Link}
        href={studentRegistrationUrl || "#"}
        size={size}
        variant="contained"
        color="primary"
        disabled={!hasRegistration}
        onClick={() => boop()}
      >
        Inscríbete (Estudiantes)
      </Button>
      <Button
        component={Link}
        href={companyContactUrl}
        size={size}
        variant="outlined"
        color="primary"
        disabled={!hasCompanyContact}
        onClick={() => boop()}
      >
        Quiero colaborar (Empresas)
      </Button>
    </Stack>
  );
}
