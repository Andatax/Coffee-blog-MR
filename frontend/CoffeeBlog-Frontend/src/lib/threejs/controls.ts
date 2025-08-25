import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { camera } from "./camera";

export function createControls(canvas: HTMLElement): OrbitControls {
	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;
	return controls;
}
