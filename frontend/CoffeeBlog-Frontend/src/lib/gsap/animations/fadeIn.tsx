import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
interface Options {
	duration: number;
	delay: number;
	yDistance: number;
	triggerStart: string;
	ease: string;
	markers: boolean;
}

export function useFadeIn(options: Partial<Options> = {}) {
	const {
		duration = 1,
		delay = 0,
		yDistance = 30,
		triggerStart = "top 88%",
		ease = "power2.out",
		markers = false,
	} = options;

	const elementRef = useRef(null);

	useGSAP(
		() => {
			if (elementRef.current) return;

			gsap.set(elementRef.current, {
				opacity: 0,
				y: yDistance,
			});

			gsap.to(elementRef.current, {
				opacity: 1,
				y: 0,
				duration: 1,
				delay: 0.5,
				ease: ease,
				scrollTrigger: {
					trigger: elementRef.current,
					start: triggerStart,
					toggleActions: "play none none none",
					markers: markers,
				},
			});
		},
		{ scope: elementRef }
	);
	return elementRef;
}
