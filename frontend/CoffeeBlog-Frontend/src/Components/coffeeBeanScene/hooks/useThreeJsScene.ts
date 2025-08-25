import React, { useRef, useEffect } from "react";
import { useThreeScene } from "./hooks/useThreeScene";

interface ThreeSceneProps {
	className?: string;
	style?: React.CSSProperties;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ className = "", style = {} }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

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
