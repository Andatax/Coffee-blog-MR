import * as THREE from "three";
import { sizes, updateSizes } from "../../utils/sizes";
import { scene } from "./scene";
import { camera, updateCamera } from "../../camera";
import { createRenderer, updateRenderer } from "../../render";
import { createControls } from "../../controls";
import { createDisplacement, setupDisplacementEvents, updateDisplacement } from "../../displacement";
import { createParticles, updateParticlesMaterial } from "../../particles";
import { textureLoader } from "../../loader/textureLoader";
import type { Displacement } from "../../utils/types";

export interface ThreeSceneState {
	scene: THREE.Scene;
	camera: THREE.Camera;
	renderer: THREE.WebGLRenderer;
	controls: any; // OrbitControls type
	displacement: Displacement;
	particles: THREE.Points;
	particlesMaterial: THREE.ShaderMaterial;
	cleanup: () => void;
}

// Global state for the current scene (if you need to access it from hooks)
let currentSceneState: ThreeSceneState | null = null;

export const initializeScene = (canvas: HTMLCanvasElement): ThreeSceneState => {
	// Initialize Three.js components
	const renderer = createRenderer(canvas);
	const controls = createControls(canvas);
	const displacement = createDisplacement();
	const { particles, material: particlesMaterial } = createParticles(textureLoader, displacement);

	// Setup events
	setupDisplacementEvents(displacement);

	const sceneState: ThreeSceneState = {
		scene,
		camera,
		renderer,
		controls,
		displacement,
		particles,
		particlesMaterial,
		cleanup: () => {
			// Cleanup Three.js resources
			renderer.dispose();
			controls.dispose();
			displacement.canvas.remove();
			scene.clear();
			currentSceneState = null;
		},
	};

	currentSceneState = sceneState;
	return sceneState;
};

export const getCurrentSceneState = (): ThreeSceneState | null => {
	return currentSceneState;
};
