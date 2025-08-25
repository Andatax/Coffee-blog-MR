import * as THREE from "three";
import { sizes } from "./utils/sizes";
import { scene } from "./scenes/coffeeScene/scene";

export const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 18);
scene.add(camera);

export function updateCamera(): void {
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();
}
