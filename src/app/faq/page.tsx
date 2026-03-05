"use client";

import { Box, Stack, Typography } from "@mui/material";
import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
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
        </Stack>
      </Section>
    </Box>
  );
}
