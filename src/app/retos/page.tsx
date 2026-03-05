"use client";

import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { Section } from "@/components/ui/Section";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { siteContent } from "@/content/site";

export default function RetosPage() {
  return (
    <Box>
      <Section title="Retos" subtitle="Categorías">
        <Stack spacing={4}>
          <Typography color="text.secondary">
            Las categorías se anuncian en kickoff. Detalles revelados al inicio.
          </Typography>
          <Grid container spacing={3}>
            {siteContent.challengeCategories.map((challenge) => (
              <Grid size={{ xs: 12, md: 6 }} key={challenge.title}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6">{challenge.title}</Typography>
                      <Typography color="text.secondary">
                        {challenge.description}
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {challenge.roles.map((role) => (
                          <Chip key={role} label={role} size="small" />
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <CTAButtons />
        </Stack>
      </Section>
    </Box>
  );
}
