import { useEffect } from "react";
import type { RefObject } from "react";
import { getCurrentSceneState } from "../../../lib/threejs/scenes/coffeeScene/sceneManager";
import { updateSizes } from "../../../lib/threejs/utils/sizes";
import { updateCamera } from "../../../lib/threejs/camera";
import { updateRenderer } from "../../../lib/threejs/render";
import { updateParticlesMaterial } from "../../../lib/threejs/particles";

export const useResize = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
	useEffect(() => {
		const handleResize = () => {
			const sceneState = getCurrentSceneState();
			if (!sceneState) return;

			updateSizes();
			updateParticlesMaterial(sceneState.particlesMaterial);
			updateCamera();
			updateRenderer(sceneState.renderer);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [canvasRef]);
};
