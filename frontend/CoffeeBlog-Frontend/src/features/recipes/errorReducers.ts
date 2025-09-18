import { type PayloadAction } from "@reduxjs/toolkit";
import type { RecipesState } from "./recipe.types";

export const errorReducers = {
	clearAllRecipes: (state: RecipesState) => {
		state.recipes = [];
	},
	removeInvalidRecipes: (state: RecipesState, action: PayloadAction<string[]>) => {
		const invalidIds = new Set(action.payload);
		state.recipes = state.recipes.filter(recipe => !invalidIds.has(recipe.id));
	},
	resetToInitialState: (state: RecipesState) => {
		state.recipes = [];
	},
};
