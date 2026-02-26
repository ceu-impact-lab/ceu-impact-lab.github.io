"use client";

import { Box, Card, CardContent, LinearProgress, Stack, Typography } from "@mui/material";
import { Section } from "@/components/Section";
import { CTAButtons } from "@/components/CTAButtons";
import { siteContent } from "@/content/site";

export default function RubricaPage() {
  return (
    <Box>
      <Section title="Rubrica" subtitle="Evaluacion">
        <Stack spacing={3}>
          <Typography color="text.secondary">
            La evaluacion combina impacto, innovacion, ejecucion tecnica y presentacion.
          </Typography>
          {siteContent.rubric.map((item) => (
            <Card key={item.category} variant="outlined">
              <CardContent>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1">{item.category}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.weight}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={item.weight}
                    sx={{ height: 8, borderRadius: 999 }}
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
