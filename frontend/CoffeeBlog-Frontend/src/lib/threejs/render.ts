import * as THREE from "three";
import { sizes } from "./utils/sizes";

export function createRenderer(canvas: HTMLElement): THREE.WebGLRenderer {
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true,
	});

	renderer.setClearColor("#181818");
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(sizes.pixelRatio);

	return renderer;
}

export function updateRenderer(renderer: THREE.WebGLRenderer): void {
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(sizes.pixelRatio);
}
