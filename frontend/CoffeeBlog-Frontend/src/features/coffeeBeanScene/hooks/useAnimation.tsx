import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { getCurrentSceneState } from "../../../lib/threejs/scenes/coffeeScene/sceneManager";
import { updateDisplacement } from "../../../lib/threejs/displacement";

export const useAnimation = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
	const animationIdRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		const tick = () => {
			const sceneState = getCurrentSceneState();
			if (!sceneState) return;

			// Update controls
			sceneState.controls.update();

			// Update displacement
			updateDisplacement(sceneState.displacement, sceneState.camera);

			// Render
			sceneState.renderer.render(sceneState.scene, sceneState.camera);

			// Continue animation
			animationIdRef.current = window.requestAnimationFrame(tick);
		};

		// Start animation loop
		tick();

		// Cleanup
		return () => {
			if (animationIdRef.current) {
				window.cancelAnimationFrame(animationIdRef.current);
			}
		};
	}, [canvasRef]);
};
