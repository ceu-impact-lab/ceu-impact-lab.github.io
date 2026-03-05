"use client";

import {
  Box,
  Card,
  CardContent,
  Fade,
  Stack,
  Step,
  StepButton,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

type HowItWorksInteractiveProps = {
  steps: string[];
  details: string[];
};

// Connector styling: tweak duration to change line fill speed.
const AnimatedConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    border: 0,
    height: 2,
    borderRadius: 2,
    backgroundColor: theme.palette.divider,
    backgroundImage: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.main})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left center",
    backgroundSize: "0% 100%",
    transition: "background-size 900ms ease, background-color 900ms ease",
  },
  [`&.Mui-active .MuiStepConnector-line, &.Mui-completed .MuiStepConnector-line`]: {
    backgroundColor: theme.palette.primary.main,
    backgroundSize: "100% 100%",
  },
}));

export function HowItWorksInteractive({ steps, details }: HowItWorksInteractiveProps) {
  // Intersection trigger to reset the section when it comes into view.
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.6 });
  const [activeStep, setActiveStep] = useState(0);
  const hasEntered = useRef(false);
  const lastStep = steps.length - 1;

  const clampStep = useMemo(() => {
    return Math.max(0, Math.min(activeStep, lastStep));
  }, [activeStep, lastStep]);

  useEffect(() => {
    // Ensure the first step is active when the section enters view.
    if (inView && !hasEntered.current) {
      hasEntered.current = true;
      const frame = window.requestAnimationFrame(() => setActiveStep(0));
      return () => window.cancelAnimationFrame(frame);
    }
    if (!inView) {
      hasEntered.current = false;
    }
    return undefined;
  }, [inView]);

  return (
    <Box
      ref={ref}
      sx={{
        // Keep margins controlled by Section; avoid extra vertical padding here.
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={clampStep}
        connector={<AnimatedConnector />}
        sx={{ flexWrap: "wrap" }}
      >
        {steps.map((step, index) => (
          <Step key={step} completed={index < clampStep}>
            <StepButton
              onClick={() => {
                // Users can jump to any step; update the active marker immediately.
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
