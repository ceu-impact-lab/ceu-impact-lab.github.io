"use client";

import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Section } from "@/components/Section";
import { RulebookTOC } from "@/components/RulebookTOC";
import { CTAButtons } from "@/components/CTAButtons";
import { siteContent } from "@/content/site";

export default function BasesPage() {
  const tocItems = siteContent.rulebook.sections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  return (
    <Box>
      <Section title="Bases" subtitle="Rulebook">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <RulebookTOC items={tocItems} />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={4}>
              {siteContent.rulebook.sections.map((section) => (
                <Card key={section.id} id={section.id} variant="outlined">
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6">{section.title}</Typography>
                      {section.items.map((item) => (
                        <Box
                          key={item.text}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: item.highlight ? "primary.main" : "divider",
                            backgroundColor: item.highlight ? "action.hover" : "transparent",
                          }}
                        >
                          <Typography color="text.secondary">{item.text}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
              <CTAButtons />
            </Stack>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
}
