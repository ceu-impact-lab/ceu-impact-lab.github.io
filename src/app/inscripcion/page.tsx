"use client";

import { Box, Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/content/site";
import { useHaptics } from "@/hooks/useHaptics";

export default function InscripcionPage() {
  const registrationUrl = siteContent.primaryCTAs.studentRegistrationUrl;
  const hasRegistration = Boolean(registrationUrl);
  const { boop } = useHaptics();

  return (
    <Box>
      <Section title="Inscripción" subtitle="Estudiantes">
        <Stack spacing={4}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6">Reserva tu plaza</Typography>
                <Typography color="text.secondary">
                  Completa el formulario con tus datos y disponibilidad. Las plazas
                  son limitadas.
                </Typography>
                <Button
                  component={Link}
                  href={registrationUrl || "#"}
                  variant="contained"
                  size="large"
                  disabled={!hasRegistration}
                  onClick={() => boop()}
                >
                  Inscríbete (Estudiantes)
                </Button>
                {!hasRegistration ? (
                  <Typography variant="body2" color="text.secondary">
                    Registro abierto próximamente.
                  </Typography>
                ) : null}
              </Stack>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Checklist
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="CV requerido (si aplica)." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Indica restricciones alimentarias." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Trae portátil y cargador." />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Stack>
      </Section>
    </Box>
  );
}
