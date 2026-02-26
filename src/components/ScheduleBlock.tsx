"use client";

import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

type ScheduleBlockProps = {
  day: string;
  date: string;
  label: string;
  items: string[];
};

export function ScheduleBlock({ day, date, label, items }: ScheduleBlockProps) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
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
