import type { Sizes } from "./types";

export const sizes: Sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
	pixelRatio: Math.min(window.devicePixelRatio, 2),
};

export function updateSizes(): Sizes {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;
	sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);
	return sizes;
}
