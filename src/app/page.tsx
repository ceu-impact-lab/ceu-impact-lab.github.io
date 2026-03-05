"use client";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useState } from "react";
import { Section } from "@/components/Section";
import { CTAButtons } from "@/components/CTAButtons";
import { ScheduleBlock } from "@/components/ScheduleBlock";
import { AnimatedLinearProgress } from "@/components/AnimatedLinearProgress";
import { HowItWorksInteractive } from "@/components/HowItWorksInteractive";
import { siteContent } from "@/content/site";

export default function Home() {
  const hasRegistration = Boolean(siteContent.primaryCTAs.studentRegistrationUrl);
  const [openRubricIndex, setOpenRubricIndex] = useState<number | null>(null);
  const activeRubricItem =
    openRubricIndex === null ? null : siteContent.rubric[openRubricIndex];

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
                Innovación intensiva de 24h con equipos multidisciplinares y retos reales.
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
                  Registro abierto próximamente. Actualiza el enlace en el contenido.
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
                    Inscripcion con equipo o individual, retos de empresas y foco en
                    empleabilidad.
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

      <Section title="Números clave" subtitle="Impacto" id="numeros">
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

      <Section title="Cómo funciona" subtitle="Proceso" id="como-funciona">
        <HowItWorksInteractive
          steps={siteContent.howItWorksSteps}
          details={siteContent.howItWorksDetails}
        />
      </Section>

      <Section title="Agenda" subtitle="Preview" id="agenda">
        <Grid container spacing={3}>
          {siteContent.scheduleBlocks.map((block, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={block.label}>
              <ScheduleBlock {...block} delayMs={index * 120} />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Criterios de evaluación" subtitle="Rúbrica" id="rubrica">
        <Stack spacing={2}>
          {siteContent.rubric.map((item, index) => (
            <Card key={item.category} variant="outlined">
              <CardActionArea onClick={() => setOpenRubricIndex(index)}>
                <CardContent>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="subtitle1">{item.category}</Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {item.maxPoints}%
                      </Typography>
                    </Stack>
                    <AnimatedLinearProgress
                      value={item.maxPoints}
                      delayMs={index * 120}
                    />
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
        <Dialog
          open={openRubricIndex !== null}
          onClose={() => setOpenRubricIndex(null)}
          maxWidth="sm"
          fullWidth
          slotProps={{
            backdrop: {
              sx: { backgroundColor: "rgba(7, 8, 80, 0.14)" },
            },
          }}
          PaperProps={{
            sx: {
                backgroundColor:
                  "linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), rgba(146, 219, 220, 0.95)",
                backdropFilter: "blur(16px)",
                border: "1px solid #969696",
                color: "text.primary",
            },
          }}
        >
          {activeRubricItem ? (
            <>
              <DialogTitle sx={{ pr: 6 }}>
                {activeRubricItem.category}
                <IconButton
                  aria-label="Cerrar"
                  onClick={() => setOpenRubricIndex(null)}
                  sx={{ position: "absolute", right: 12, top: 12 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Hasta {activeRubricItem.maxPoints} puntos
                  </Typography>
                  <Typography color="text.secondary">
                    {activeRubricItem.description}
                  </Typography>
                  <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
                    {activeRubricItem.levels.map((level) => (
                      <Typography key={level.range} component="li">
                        <strong>
                          [{level.range}] {level.label}:
                        </strong>{" "}
                        {level.text}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              </DialogContent>
            </>
          ) : null}
        </Dialog>
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
