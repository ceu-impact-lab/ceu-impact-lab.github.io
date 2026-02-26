"use client";

import { LinearProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "@/components/useInView";

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
	const target = Math.max(0, Math.min(100, value));
	// Adjust durationMs to speed up or slow down the fill animation.
	const durationMs = 900;

	const prefersReducedMotion = useMemo(() => {
		if (typeof window === "undefined") {
			return false;
		}
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}, []);

	useEffect(() => {
		if (!inView) {
			return;
		}
		if (prefersReducedMotion) {
			setProgress(target);
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

	return (
		<div ref={ref}>
			<LinearProgress
				variant="determinate"
				value={progress}
				sx={{ height: 8, borderRadius: 999 }}
			/>
		</div>
	);
}
