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
        connector={<AnimatedConnector />}
        sx={{ flexWrap: "wrap" }}
      >
        {steps.map((step, index) => (
          <Step key={step} completed={index < clampStep}>
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
