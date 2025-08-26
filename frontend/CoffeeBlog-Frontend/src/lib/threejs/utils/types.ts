import * as THREE from "three";
export interface Displacement {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	glowImage: HTMLImageElement & { loaded?: boolean };
	interactivePlane: THREE.Mesh;
	raycaster: THREE.Raycaster;
	screenCursor: THREE.Vector2;
	canvasCursor: THREE.Vector2;
	canvasCursorPrevious: THREE.Vector2;
	texture: THREE.CanvasTexture;
}

export interface Sizes {
	width: number;
	height: number;
	pixelRatio: number;
}
