"use client";

import { Box, Card, CardContent, Fade, Stack, Step, StepButton, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "@/components/useInView";

type HowItWorksInteractiveProps = {
  steps: string[];
  details: string[];
};

export function HowItWorksInteractive({ steps, details }: HowItWorksInteractiveProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.6 });
  const [activeStep, setActiveStep] = useState(0);
  const hasEntered = useRef(false);
  const lastStep = steps.length - 1;

  const clampStep = useMemo(() => {
    return Math.max(0, Math.min(activeStep, lastStep));
  }, [activeStep, lastStep]);

  useEffect(() => {
    if (inView && !hasEntered.current) {
      setActiveStep(0);
      hasEntered.current = true;
    }
    if (!inView) {
      hasEntered.current = false;
    }
  }, [inView]);

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={clampStep}
        sx={{ flexWrap: "wrap" }}
      >
        {steps.map((step, index) => (
          <Step key={step}>
            <StepButton
              onClick={() => {
                setActiveStep(index);
              }}
            >
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    textDecoration: index <= clampStep ? "underline" : "none",
                    textDecorationThickness: index <= clampStep ? "2px" : "auto",
                    textUnderlineOffset: "6px",
                  },
                  "& .MuiStepIcon-root": {
                    color: index <= clampStep ? "primary.main" : "text.disabled",
                  },
                }}
              >
                {step}
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Stack spacing={2} sx={{ mt: 4 }}>
        <Fade key={clampStep} in timeout={300}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {steps[clampStep]}
              </Typography>
              <Typography color="text.secondary">
                {details[clampStep]}
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </Stack>
    </Box>
  );
}
