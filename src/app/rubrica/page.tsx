"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { AnimatedLinearProgress } from "@/components/ui/AnimatedLinearProgress";
import { siteContent } from "@/content/site";
import { useHaptics } from "@/hooks/useHaptics";

export default function RubricaPage() {
  const [openRubricIndex, setOpenRubricIndex] = useState<number | null>(null);
  const { boop } = useHaptics();
  const activeRubricItem =
    openRubricIndex === null ? null : siteContent.rubric[openRubricIndex];

  return (
    <Box>
      <Section title="Rúbrica" subtitle="Evaluación">
        <Stack spacing={3}>
          <Typography variant="h6">{siteContent.rubricIntroTitle}</Typography>
          <Typography color="text.secondary">
            {siteContent.rubricIntroText}
          </Typography>
          {siteContent.rubric.map((item, index) => (
            <Card key={item.category} variant="outlined">
              <CardActionArea onClick={() => { boop(); setOpenRubricIndex(index); }}>
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
                    onClick={() => { boop(); setOpenRubricIndex(null); }}
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
                    {activeRubricItem.note ? (
                      <Typography variant="body2" color="text.secondary">
                        {activeRubricItem.note}
                      </Typography>
                    ) : null}
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
          <CTAButtons />
        </Stack>
      </Section>
    </Box>
  );
}
