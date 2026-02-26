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
            La agenda se ajustara con horarios detallados. Incluye build intensivo
            de sabado y domingo, y awards institucionales el martes.
          </Typography>
          <Grid container spacing={3}>
            {siteContent.scheduleBlocks.map((block) => (
              <Grid size={{ xs: 12, md: 4 }} key={block.label}>
                <ScheduleBlock {...block} />
              </Grid>
            ))}
          </Grid>
          <CTAButtons />
        </Stack>
      </Section>
    </Box>
  );
}
