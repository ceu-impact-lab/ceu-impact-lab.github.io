"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { ReactNode } from "react";
import { useHaptics } from "@/hooks/useHaptics";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const { trigger } = useHaptics();
  const renderAnswer = (answer: string): ReactNode[] => {
    const nodes: ReactNode[] = [];
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(answer)) !== null) {
      const [full, text, href] = match;
      const start = match.index;
      if (start > lastIndex) {
        nodes.push(answer.slice(lastIndex, start));
      }
      const isExternal = /^https?:\/\//i.test(href);
      nodes.push(
        <MuiLink
          key={`${href}-${start}`}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          color="inherit"
          underline="always"
        >
          {text}
        </MuiLink>
      );
      lastIndex = start + full.length;
    }

    if (lastIndex < answer.length) {
      nodes.push(answer.slice(lastIndex));
    }

    return nodes;
  };

  return (
    <div>
      {items.map((item) => (
        <Accordion key={item.question} variant="outlined" disableGutters onChange={() => trigger("nudge")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary" component="span">
              {renderAnswer(item.answer)}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
