"use client";

import { List, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";

type TocItem = {
  id: string;
  title: string;
};

type RulebookTOCProps = {
  items: TocItem[];
};

export function RulebookTOC({ items }: RulebookTOCProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, position: "sticky", top: 96 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Tabla de contenidos
      </Typography>
      <List dense>
        {items.map((item) => (
          <ListItemButton key={item.id} component="a" href={`#${item.id}`}>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}
