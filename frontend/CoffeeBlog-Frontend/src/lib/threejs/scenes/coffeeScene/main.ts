import * as THREE from "three";
import { sizes, updateSizes } from "../../utils/sizes";
import { scene } from "./scene";
import { camera, updateCamera } from "../../camera";
import { createRenderer, updateRenderer } from "../../render";
import { createControls } from "../../controls";
import { createDisplacement, setupDisplacementEvents, updateDisplacement } from "../../displacement";
import { createParticles, updateParticlesMaterial } from "../../particles";
import { textureLoader } from "../../loader/textureLoader";

// Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLElement;
if (!canvas) {
	throw new Error("no canvas");
}

// Initialize Three.js components
const renderer = createRenderer(canvas);
const controls = createControls(canvas);
const displacement = createDisplacement();
const { particles, material: particlesMaterial } = createParticles(textureLoader, displacement);

// Setup events
setupDisplacementEvents(displacement);

// Resize handler
window.addEventListener("resize", () => {
	updateSizes();
	updateParticlesMaterial(particlesMaterial);
	updateCamera();
	updateRenderer(renderer);
});

// Animation loop
const tick = () => {
	controls.update();
	updateDisplacement(displacement, camera);
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};

tick();
