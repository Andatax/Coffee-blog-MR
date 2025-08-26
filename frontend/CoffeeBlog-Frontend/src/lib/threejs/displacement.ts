import * as THREE from "three";
import type { Displacement } from "./utils/types";
import { sizes } from "./utils/sizes";
import { scene } from "./scenes/coffeeScene/scene";

export function createDisplacement(): Displacement {
	const displacement = {} as Displacement;

	// 2D canvas
	displacement.canvas = document.createElement("canvas");
	displacement.canvas.width = 128;
	displacement.canvas.height = 128;
	// Hide the debug canvas completely
	displacement.canvas.style.display = "none";
	// Still append to DOM but hidden
	document.body.append(displacement.canvas);

	// Context
	displacement.context = displacement.canvas.getContext("2d")!;
	displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height);

	// Glow image - create programmatically since glow.png doesn't exist
	displacement.glowImage = new Image();
	displacement.glowImage.loaded = false;
	
	// Create a simple radial gradient glow programmatically
	const glowCanvas = document.createElement('canvas');
	glowCanvas.width = 64;
	glowCanvas.height = 64;
	const glowCtx = glowCanvas.getContext('2d')!;
	
	const gradient = glowCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
	gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
	gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
	
	glowCtx.fillStyle = gradient;
	glowCtx.fillRect(0, 0, 64, 64);
	
	displacement.glowImage.onload = () => {
		displacement.glowImage.loaded = true;
	};
	
	displacement.glowImage.src = glowCanvas.toDataURL();

	// Interactive plane
	displacement.interactivePlane = new THREE.Mesh(
		new THREE.PlaneGeometry(10, 10),
		new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide })
	);
	displacement.interactivePlane.visible = false;
	scene.add(displacement.interactivePlane);

	// Raycaster
	displacement.raycaster = new THREE.Raycaster();

	// Coordinates
	displacement.screenCursor = new THREE.Vector2(9999, 9999);
	displacement.canvasCursor = new THREE.Vector2(9999, 9999);
	displacement.canvasCursorPrevious = new THREE.Vector2(9999, 9999);

	// Create texture
	displacement.texture = new THREE.CanvasTexture(displacement.canvas);

	return displacement;
}

export function setupDisplacementEvents(displacement: Displacement): void {
	window.addEventListener("pointermove", event => {
		displacement.screenCursor.x = (event.clientX / sizes.width) * 2 - 1;
		displacement.screenCursor.y = -(event.clientY / sizes.height) * 2 + 1;
	});
}

export function updateDisplacement(displacement: Displacement, camera: THREE.Camera): void {
	// Raycaster
	displacement.raycaster.setFromCamera(displacement.screenCursor, camera);
	const intersections = displacement.raycaster.intersectObject(displacement.interactivePlane);

	if (intersections.length) {
		const uv = intersections[0].uv;
		if (uv) {
			displacement.canvasCursor.x = uv.x * displacement.canvas.width;
			displacement.canvasCursor.y = (1 - uv.y) * displacement.canvas.height;
		}
	}

	// Fade out
	displacement.context.globalCompositeOperation = "source-over";
	displacement.context.globalAlpha = 0.02;
	displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height);

	// Speed alpha
	const cursorDistance = displacement.canvasCursorPrevious.distanceTo(displacement.canvasCursor);
	displacement.canvasCursorPrevious.copy(displacement.canvasCursor);
	const alpha = Math.min(cursorDistance * 0.05, 1);

	// Only draw if the image is loaded and ready
	if (displacement.glowImage.loaded && displacement.glowImage.complete) {
		const glowSize = displacement.canvas.width * 0.25;
		displacement.context.globalCompositeOperation = "lighten";
		displacement.context.globalAlpha = alpha;
		displacement.context.drawImage(
			displacement.glowImage,
			displacement.canvasCursor.x - glowSize * 0.5,
			displacement.canvasCursor.y - glowSize * 0.5,
			glowSize,
			glowSize
		);
	}

	displacement.texture.needsUpdate = true;
}
