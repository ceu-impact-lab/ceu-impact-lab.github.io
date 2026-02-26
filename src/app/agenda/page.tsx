"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { Section } from "@/components/Section";
import { ScheduleBlock } from "@/components/ScheduleBlock";
import { CTAButtons } from "@/components/CTAButtons";
import { siteContent } from "@/content/site";

export default function AgendaPage() {
  return (
    <Box>
      <Section title="Agenda" subtitle="Timeline">
        <Stack spacing={4}>
          <Typography color="text.secondary">
            Agenda provisional con horarios definidos para build, presentaciones y
            acto institucional del martes.
          </Typography>
          <Grid container spacing={3}>
            {siteContent.scheduleBlocks.map((block, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={block.label}>
                <ScheduleBlock {...block} delayMs={index * 140} />
              </Grid>
            ))}
          </Grid>
          <CTAButtons />
        </Stack>
      </Section>
    </Box>
  );
}
