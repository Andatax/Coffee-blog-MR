import React, { useRef } from "react";
import { useThreeScene } from "./hooks/useThreeJsScene";

interface ThreeSceneProps {
	className?: string;
	style?: React.CSSProperties;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ className = "", style = {} }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	// Custom hook handles all Three.js logic
	useThreeScene(canvasRef);

	return (
		<div className={`threejs-container ${className}`} style={style}>
			<canvas
				ref={canvasRef}
				className="webgl"
				style={{
					display: "block",
					width: "100%",
					height: "100%",
				}}
			/>
		</div>
	);
};

export default ThreeScene;
