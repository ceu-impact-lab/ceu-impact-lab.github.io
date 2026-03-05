"use client";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Section } from "@/components/Section";
import { CTAButtons } from "@/components/CTAButtons";
import { siteContent } from "@/content/site";

type RulebookPanelProps = {
  value: number;
  index: number;
  children: ReactNode;
};

function RulebookPanel({ value, index, children }: RulebookPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`rulebook-panel-${index}`}
      aria-labelledby={`rulebook-tab-${index}`}
    >
      {value === index ? children : null}
    </div>
  );
}

export default function BasesPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const sections = siteContent.rulebook.sections;
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabId = searchParams.get("tab");
    if (!tabId) {
      return;
    }
    const nextIndex = sections.findIndex((section) => section.id === tabId);
    if (nextIndex !== -1) {
      setTabIndex(nextIndex);
    }
  }, [searchParams, sections]);

  return (
    <Box>
      <Section title="Bases" subtitle="Reglamento">
        <Stack spacing={3}>
          <Typography color="text.secondary">
            Normas oficiales y bases del hackathon.
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={tabIndex}
                onChange={(_event, value) => setTabIndex(value)}
                aria-label="Indice del reglamento"
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  "& .MuiTab-root": {
                    alignItems: "flex-start",
                    textAlign: "left",
                    px: 1,
                  },
                }}
              >
                {sections.map((section, index) => (
                  <Tab
                    key={section.id}
                    label={section.title}
                    id={`rulebook-tab-${index}`}
                    aria-controls={`rulebook-panel-${index}`}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              {sections.map((section, index) => (
                <RulebookPanel key={section.id} value={tabIndex} index={index}>
                  <Card variant="outlined">
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
                              borderColor: item.highlight
                                ? "primary.main"
                                : "divider",
                              backgroundColor: item.highlight
                                ? "action.hover"
                                : "transparent",
                            }}
                          >
                            <Typography color="text.secondary">
                              {item.text}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </RulebookPanel>
              ))}
            </Grid>
          </Grid>
          <CTAButtons />
        </Stack>
      </Section>
    </Box>
  );
}
