"use client";

import { Box, Card, CardContent, Grid, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Section } from "@/components/Section";
import { CTAButtons } from "@/components/CTAButtons";
import { siteContent } from "@/content/site";

export default function ComoFuncionaPage() {
  return (
    <Box>
      <Section title="Como funciona" subtitle="Proceso">
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
                    Empresas proponen desafios alineados a negocio y tecnologia.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Equipos mixtos</Typography>
                  <Typography color="text.secondary">
                    Ingenieria, datos, economia y marketing trabajando juntos.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Mentoria activa</Typography>
                  <Typography color="text.secondary">
                    Acompanamiento de expertos para acelerar el MVP.
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
