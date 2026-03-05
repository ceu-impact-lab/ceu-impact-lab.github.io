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
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
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

type RulebookSectionProps = {
  section: (typeof siteContent.rulebook.sections)[number];
};

function RulebookSectionContent({
  section,
  highlight,
}: RulebookSectionProps & { highlight?: boolean }) {
  return (
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
                borderColor:
                  highlight && item.highlight ? "primary.main" : "divider",
                backgroundColor:
                  highlight && item.highlight ? "action.hover" : "transparent",
              }}
            >
              <Typography color="text.secondary">{item.text}</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function BasesPageContent() {
  const [tabIndex, setTabIndex] = useState(0);
  const sections = siteContent.rulebook.sections;
  const searchParams = useSearchParams();
  const [maxPanelHeight, setMaxPanelHeight] = useState(0);
  const measureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const highlightActive = searchParams.get("highlight") === "1";

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

  useLayoutEffect(() => {
    const measure = () => {
      const heights = measureRefs.current
        .map((node) => (node ? node.offsetHeight : 0))
        .filter((height) => height > 0);
      if (heights.length) {
        setMaxPanelHeight(Math.max(...heights));
      }
    };

    measure();
  }, [sections]);

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
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    minHeight: maxPanelHeight ? `${maxPanelHeight}px` : "auto",
                  }}
                >
                  {sections.map((section, index) => (
                    <RulebookPanel
                      key={section.id}
                      value={tabIndex}
                      index={index}
                    >
                      <RulebookSectionContent
                        section={section}
                        highlight={highlightActive && index === tabIndex}
                      />
                    </RulebookPanel>
                  ))}
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 0,
                    overflow: "hidden",
                    visibility: "hidden",
                    pointerEvents: "none",
                  }}
                >
                  {sections.map((section, index) => (
                    <Box
                      key={section.id}
                      ref={(node) => {
                        measureRefs.current[index] =
                          node instanceof HTMLDivElement ? node : null;
                      }}
                    >
                      <RulebookSectionContent
                        section={section}
                        highlight={highlightActive && index === tabIndex}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Section>
    </Box>
  );
}

export default function BasesPage() {
  return (
    <Suspense fallback={null}>
      <BasesPageContent />
    </Suspense>
  );
}
