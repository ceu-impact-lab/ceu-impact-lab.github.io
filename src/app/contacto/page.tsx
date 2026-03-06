"use client";

import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { Section } from "@/components/ui/Section";
import { useHaptics } from "@/hooks/useHaptics";

export default function ContactoPage() {
  const { boop } = useHaptics();
  return (
    <Box>
      <Section title="Contacto" subtitle="Hablemos">
        <Stack spacing={3}>
          <Typography color="text.secondary">
            Escríbenos para dudas generales, colaboraciones o prensa.
          </Typography>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <TextField label="Nombre" fullWidth />
                <TextField label="Email" type="email" fullWidth />
                <TextField label="Mensaje" fullWidth multiline minRows={4} />
                <Button variant="contained" size="large" onClick={() => boop()}>
                  Enviar mensaje
                </Button>
              </Stack>
            </CardContent>
          </Card>
          <Typography variant="body2" color="text.secondary">
            Email: impacto@ceu.es (placeholder)
          </Typography>
        </Stack>
      </Section>
    </Box>
  );
}
