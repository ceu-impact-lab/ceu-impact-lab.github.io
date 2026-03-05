"use client";

import { LinearProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "@/hooks/useInView";

type AnimatedLinearProgressProps = {
	value: number;
	delayMs?: number;
};

export function AnimatedLinearProgress({
	value,
	delayMs = 0,
}: AnimatedLinearProgressProps) {
	// Use IntersectionObserver to only animate once the bar is on screen.
	const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
	const [progress, setProgress] = useState(0);
	// Visual boost for 30% bars to emphasize priority without changing data labels.
	const boostedValue = value === 30 ? 38 : value;
	const target = Math.max(0, Math.min(100, boostedValue));
	// Adjust durationMs to speed up or slow down the fill animation.
	const durationMs = 900;

	const prefersReducedMotion = useMemo(() => {
		if (typeof window === "undefined") {
			return false;
		}
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}, []);

	useEffect(() => {
		if (!inView || prefersReducedMotion) {
			return;
		}

		let animationFrame = 0;
		let startTime = 0;
		let timeoutId: ReturnType<typeof setTimeout> | null = null;

		const animate = (timestamp: number) => {
			if (!startTime) {
				startTime = timestamp;
			}
			const elapsed = timestamp - startTime;
			const nextValue = Math.min(target, (elapsed / durationMs) * target);
			setProgress(nextValue);
			if (elapsed < durationMs) {
				animationFrame = requestAnimationFrame(animate);
			}
		};

		// delayMs lets multiple bars stagger without changing their final values.
		timeoutId = setTimeout(() => {
			animationFrame = requestAnimationFrame(animate);
		}, delayMs);

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	}, [inView, target, delayMs, prefersReducedMotion]);

	const displayValue = prefersReducedMotion ? target : progress;

	return (
		<div ref={ref}>
			<LinearProgress
				variant="determinate"
				value={displayValue}
				sx={{ height: 8, borderRadius: 999 }}
			/>
		</div>
	);
}
