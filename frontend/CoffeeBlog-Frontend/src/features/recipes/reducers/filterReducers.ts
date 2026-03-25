import type { PayloadAction } from "@reduxjs/toolkit";
import type { RecipesState } from "../recipe.types";

export const recipesFilterReducers = {
	sortRecipesByName: (state: RecipesState) => {
		state.recipes.sort((a, b) => a.name.localeCompare(b.name));
	},
	keepOnlyFavorites: (state: RecipesState, action: PayloadAction<string[]>) => {
		const favoriteIds = new Set(action.payload);
		state.recipes = state.recipes.filter(recipe => favoriteIds.has(recipe.id));
	},
	sortRecipesBylikes: (state: RecipesState) => {
		state.recipes.sort((a, b) => b.likes - a.likes);
	},
};
