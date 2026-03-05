"use client";

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { Section } from "@/components/Section";
import { CTAButtons } from "@/components/CTAButtons";
import { AnimatedLinearProgress } from "@/components/AnimatedLinearProgress";
import { siteContent } from "@/content/site";

export default function RubricaPage() {
  return (
    <Box>
      <Section title="Rúbrica" subtitle="Evaluación">
        <Stack spacing={3}>
          <Typography color="text.secondary">
            La evaluación combina impacto, innovación, ejecución técnica y presentación.
          </Typography>
          {siteContent.rubric.map((item, index) => (
            <Card key={item.category} variant="outlined">
              <CardContent>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1">{item.category}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.weight}%
                    </Typography>
                  </Stack>
                  <AnimatedLinearProgress
                    value={item.weight}
                    delayMs={index * 120}
                  />
                </Stack>
              </CardContent>
            </Card>
          ))}
          <CTAButtons />
        </Stack>
      </Section>
    </Box>
  );
}
