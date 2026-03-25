import { useEffect } from "react";
import type { RefObject } from "react";
import * as THREE from "three";
import { useResize } from "./useResize";
import { useAnimation } from "./useAnimation";
import { initializeScene } from "../../../lib/threejs/scenes/coffeeScene/sceneManager";
import type { ThreeSceneState } from "../../../lib/threejs/scenes/coffeeScene/sceneManager";

export const useThreeScene = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
	useEffect(() => {
		if (!canvasRef.current) return;

		// Initialize the Three.js scene
		const sceneState = initializeScene(canvasRef.current);

		// Cleanup function
		return () => {
			sceneState.cleanup();
		};
	}, [canvasRef]);

	// Setup resize handling
	useResize(canvasRef);

	// Setup animation loop
	useAnimation(canvasRef);
};
