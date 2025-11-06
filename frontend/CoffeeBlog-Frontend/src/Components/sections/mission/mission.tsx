import React from "react";
import { Container } from "../../layout/container";
import { useFadeIn } from "../../../lib/gsap/animations/fadeIn";
import { MissionStatement } from "./missionStatement";

export const Mission: React.FC = () => {
	const titleRef = useFadeIn({
		duration: 1.2,
		delay: 0.2,
		yDistance: 40,
		triggerStart: "top 85%",
	});
	return (
		<section className="min-h-screen bg-black bg-opacity-60 backdrop-blur-sm">
			<Container className="py-20">
				<div ref={titleRef}>
					<div className="text-center mb-16">
						<h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Mission</h2>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							Brewing the future of coffee, one perfect cup at a time
						</p>
						<MissionStatement />
					</div>
				</div>
			</Container>
		</section>
	);
};
