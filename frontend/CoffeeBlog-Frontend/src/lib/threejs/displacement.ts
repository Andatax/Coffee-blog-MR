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
	displacement.canvas.style.position = "fixed";
	displacement.canvas.style.width = "256px";
	displacement.canvas.style.height = "256px";
	displacement.canvas.style.top = "0";
	displacement.canvas.style.left = "0";
	displacement.canvas.style.zIndex = "10";
	document.body.append(displacement.canvas);

	// Context
	displacement.context = displacement.canvas.getContext("2d")!;
	displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height);

	// Glow image
	displacement.glowImage = new Image();
	displacement.glowImage.src = "./glow.png";

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

	displacement.texture.needsUpdate = true;
}
