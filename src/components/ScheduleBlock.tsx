"use client";

import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useInView } from "@/components/useInView";

type ScheduleBlockProps = {
  day: string;
  date: string;
  label: string;
  items: string[];
  delayMs?: number;
};

export function ScheduleBlock({ day, date, label, items, delayMs = 0 }: ScheduleBlockProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <Card
      ref={ref}
      variant="outlined"
      sx={{
        height: "100%",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: "transform 500ms ease, opacity 500ms ease, box-shadow 200ms ease",
        transitionDelay: `${delayMs}ms`,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={day} color="primary" size="small" />
            <Typography variant="subtitle2" color="text.secondary">
              {date}
            </Typography>
          </Stack>
          <Typography variant="h6">{label}</Typography>
          <Stack spacing={1}>
            {items.map((item) => (
              <Typography variant="body2" key={item} color="text.secondary">
                {item}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
