import React from "react";
import { CoffeeBeanScene } from "../three/CoffeeBeanScene";
import { LoadingAnimation } from "../three/LoadingAnimation";
import { Hero } from "../sections/Hero";
import { Mission } from "../../Components/sections/mission/mission";
import { Story } from "../sections/Story";
import { Features } from "../sections/Features";
import { Testimonials } from "../sections/Testimonials";
import { Contact } from "../sections/Contact";
import { Footer } from "../navigation/Footer";
import { useLoadingSequence } from "../three/LoadingAnimation/hooks/useLoadingSequence";

export const LandingPage: React.FC = () => {
	const { isLoading, loadingProgress } = useLoadingSequence();

	if (isLoading) {
		return (
			<div className="w-full h-screen">
				<CoffeeBeanScene />
				<LoadingAnimation progress={loadingProgress} />
			</div>
		);
	}

	return (
		<div className="relative">
			<CoffeeBeanScene />

			<div className="relative z-10">
				<Hero />
				<Mission />
				<Story />
				<Features />
				<Testimonials />
				<Contact />
				<Footer />
			</div>
		</div>
	);
};
