import type { PayloadAction } from "@reduxjs/toolkit";
import type { RoasteriesState } from "../roastery.types";

export const roasteryFilterReducer = {
	sortRoasteriesByName: (state: RoasteriesState) => {
		state.roasteries.sort((a, b) => a.name.localeCompare(b.name));
	},
	keepFavoriteRoasteries: (state: RoasteriesState, action: PayloadAction<string[]>) => {
		const favoriteRoasteriesIds = new Set(action.payload);
		state.roasteries = state.roasteries.filter(roastery => favoriteRoasteriesIds.has(roastery.id));
	},
    sortRoasteriesByFollowers: (state:RoasteriesState) => {
        state.roasteries.sort((a,b)=>b.followers - a.followers);
    }
};
