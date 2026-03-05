"use client";

import { Box, Card, CardContent, Grid, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Section } from "@/components/ui/Section";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { siteContent } from "@/content/site";

export default function ComoFuncionaPage() {
  return (
    <Box>
      <Section title="Cómo funciona" subtitle="Proceso">
        <Stack spacing={4}>
          <Stepper alternativeLabel>
            {siteContent.howItWorksSteps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Retos reales</Typography>
                  <Typography color="text.secondary">
                    Empresas proponen desafíos alineados a negocio y tecnología.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Equipos asignados</Typography>
                  <Typography color="text.secondary">
                    Equipos aleatorios de hasta 5 personas, con perfiles técnicos y de negocio.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Mentoría y jurado</Typography>
                  <Typography color="text.secondary">
                    Mentores de empresa y jurado para evaluar prototipos funcionales.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <CTAButtons />
        </Stack>
      </Section>
    </Box>
  );
}
