"use client";

import { Box, Button, Card, CardContent, Grid, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Section } from "@/components/Section";
import { siteContent } from "@/content/site";

export default function EmpresasPage() {
  return (
    <Box>
      <Section title="Empresas" subtitle="Colaboracion">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">ROI para patrocinadores</Typography>
                  <Typography color="text.secondary">
                    Acceso directo a talento, branding universitario e ideas aplicables
                    a negocio. Recogida de CVs y entrevistas opcionales durante el evento.
                  </Typography>
                </CardContent>
              </Card>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Formas de colaborar</Typography>
                  <Stack spacing={1}>
                    <Typography color="text.secondary">
                      - Proponer reto real y aportar datos/contexto.
                    </Typography>
                    <Typography color="text.secondary">
                      - Mentores y jurado especializados.
                    </Typography>
                    <Typography color="text.secondary">
                      - Premios, becas o practicas.
                    </Typography>
                    <Typography color="text.secondary">
                      - Logistica e in-kind (espacios, tecnologia, catering).
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">Quiero colaborar</Typography>
                  <TextField label="Nombre" fullWidth />
                  <TextField label="Empresa" fullWidth />
                  <TextField label="Email" type="email" fullWidth />
                  <TextField label="Mensaje" fullWidth multiline minRows={4} />
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button variant="contained" size="large">
                      Enviar solicitud
                    </Button>
                    <Button
                      component={Link}
                      href={siteContent.primaryCTAs.companyContactUrl}
                      variant="outlined"
                      size="large"
                    >
                      Escribir por email
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
}
