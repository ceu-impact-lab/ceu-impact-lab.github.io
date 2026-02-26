"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Section } from "@/components/Section";
import { CTAButtons } from "@/components/CTAButtons";
import { ScheduleBlock } from "@/components/ScheduleBlock";
import { siteContent } from "@/content/site";

export default function Home() {
  const hasRegistration = Boolean(siteContent.primaryCTAs.studentRegistrationUrl);

  return (
    <Box>
      <Section>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <Typography variant="overline" color="text.secondary">
                Hackathon universitario · Multidisciplinar
              </Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: 40, md: 56 } }}>
                {siteContent.eventName}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Retos reales, talento emergente y MVP funcional en solo 2 dias.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Typography variant="subtitle1">{siteContent.dates}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {siteContent.location}
                </Typography>
              </Stack>
              <CTAButtons />
              {!hasRegistration ? (
                <Typography variant="body2" color="text.secondary">
                  Registro abierto proximamente. Actualiza el enlace en el contenido.
                </Typography>
              ) : null}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">Lo esencial</Typography>
                  <Typography color="text.secondary">
                    Equipos de hasta 5 personas, retos propuestos por empresas y foco en empleabilidad.
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Awards institucionales: {siteContent.awardsDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Entrega: MVP funcional con demo en vivo
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Section>

      <Section title="Numeros clave" subtitle="Impacto" id="numeros">
        <Grid container spacing={3}>
          {siteContent.keyStats.map((stat) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h4">{stat.value}</Typography>
                  <Typography color="text.secondary">{stat.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Como funciona" subtitle="Proceso" id="como-funciona">
        <Stepper alternativeLabel sx={{ flexWrap: "wrap" }}>
          {siteContent.howItWorksSteps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Section>

      <Section title="Agenda" subtitle="Preview" id="agenda">
        <Grid container spacing={3}>
          {siteContent.scheduleBlocks.map((block) => (
            <Grid size={{ xs: 12, md: 4 }} key={block.label}>
              <ScheduleBlock {...block} />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Criterios de evaluacion" subtitle="Rubrica" id="rubrica">
        <Stack spacing={2}>
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
        </Stack>
      </Section>

      <Section title="Empresas aliadas" subtitle="Sponsors" id="sponsors">
        <Grid container spacing={2}>
          {siteContent.sponsors.map((sponsor) => (
            <Grid size={{ xs: 6, md: 3 }} key={sponsor.name}>
              <Card
                variant="outlined"
                sx={{ height: 110, display: "grid", placeItems: "center" }}
              >
                <Typography color="text.secondary">{sponsor.name}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Preguntas frecuentes" subtitle="FAQ" id="faq">
        <Stack spacing={2}>
          {siteContent.faq.slice(0, 4).map((item) => (
            <Card key={item.question} variant="outlined">
              <CardContent>
                <Typography variant="subtitle1">{item.question}</Typography>
                <Typography color="text.secondary">{item.answer}</Typography>
              </CardContent>
            </Card>
          ))}
          <Button component={Link} href="/faq" variant="contained">
            Ver todas las preguntas
          </Button>
        </Stack>
      </Section>
    </Box>
  );
}
