import { useState } from "react";
import "./App.css";
import ThreeScene from "./Components/coffeeBeanScene/coffeeScene";

function App() {
	

	return (
		<>
			<ThreeScene
				className="main-scene"
				style={{
					width: "100vw",
					height: "100vh",
					position: "fixed",
					top: 0,
					left: 0,
					zIndex: -1,
				}}
			/>
		</>
	);
}

export default App;
