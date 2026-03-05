"use client";

import { Box, Stack, Typography } from "@mui/material";
import { Section } from "@/components/Section";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTAButtons } from "@/components/CTAButtons";
import { siteContent } from "@/content/site";

export default function FAQPage() {
  return (
    <Box>
      <Section title="FAQ" subtitle="Preguntas frecuentes">
        <Stack spacing={4}>
          <Typography color="text.secondary">
            Si no encuentras tu duda, contáctanos y te ayudamos.
          </Typography>
          <FAQAccordion items={siteContent.faq} />
          <CTAButtons />
        </Stack>
      </Section>
    </Box>
  );
}
