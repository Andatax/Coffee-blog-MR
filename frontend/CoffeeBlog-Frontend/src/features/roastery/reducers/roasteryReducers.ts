import type { PayloadAction } from "@reduxjs/toolkit";
import type { Roastery, RoasteryState, RoasteriesState } from "../roastery.types";

export const roasteryReducers = {
	setRoastery: (state: RoasteryState, action: PayloadAction<Roastery>) => {
		state.roastery = action.payload;
	},
	addRoastery: (state: RoasteriesState, action: PayloadAction<Roastery>) => {
		state.roasteries.push(action.payload);
	},
	updateRoastery: (state: RoasteriesState, action: PayloadAction<Roastery>) => {
		const index = state.roasteries.findIndex(roastery => roastery.id === action.payload.id);
		if (index !== -1) {
			state.roasteries[index] = action.payload;
		}
	},
	removeRoastery: (state: RoasteriesState, action: PayloadAction<string>) => {
		state.roasteries = state.roasteries.filter(roastery => roastery.id !== action.payload);
	},
	clearAllRoasteries: (state: RoasteriesState) => {
		state.roasteries = [];
	},
};
