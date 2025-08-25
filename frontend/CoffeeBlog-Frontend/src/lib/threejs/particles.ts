import * as THREE from "three";
import particlesVertexShader from "../../shaders/particles/vertex.glsl";
import particlesFragmentShader from "../../shaders/particles/fragment.glsl";
import { sizes } from "./utils/sizes";
import { scene } from "./scenes/coffeeScene/scene";
import type { Displacement } from "./utils/types";

export function createParticles(
	textureLoader: THREE.TextureLoader,
	displacement: Displacement
): { particles: THREE.Points; material: THREE.ShaderMaterial } {
	const particlesGeometry = new THREE.PlaneGeometry(10, 10, 128, 128);
	particlesGeometry.setIndex(null);
	particlesGeometry.deleteAttribute("normal");

	const intensitiesArray = new Float32Array(particlesGeometry.attributes.position.count);
	const anglesArray = new Float32Array(particlesGeometry.attributes.position.count);

	for (let i = 0; i < particlesGeometry.attributes.position.count; i++) {
		intensitiesArray[i] = Math.random();
		anglesArray[i] = Math.random() * Math.PI * 2;
	}

	particlesGeometry.setAttribute("aIntensity", new THREE.BufferAttribute(intensitiesArray, 1));
	particlesGeometry.setAttribute("aAngle", new THREE.BufferAttribute(anglesArray, 1));

	const particlesMaterial = new THREE.ShaderMaterial({
		vertexShader: particlesVertexShader,
		fragmentShader: particlesFragmentShader,
		uniforms: {
			uResolution: new THREE.Uniform(
				new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
			),
			uPictureTexture: new THREE.Uniform(textureLoader.load("../../../../static/coffeeRedChannel.png")),
			uDisplacementTexture: new THREE.Uniform(displacement.texture),
		},
		blending: THREE.AdditiveBlending,
	});

	const particles = new THREE.Points(particlesGeometry, particlesMaterial);
	scene.add(particles);

	return { particles, material: particlesMaterial };
}

export function updateParticlesMaterial(material: THREE.ShaderMaterial): void {
	material.uniforms.uResolution.value.set(
		sizes.width * sizes.pixelRatio,
		sizes.height * sizes.pixelRatio
	);
}
