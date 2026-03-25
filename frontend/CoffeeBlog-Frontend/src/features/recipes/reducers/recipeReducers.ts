import type { PayloadAction } from "@reduxjs/toolkit";
import type { Recipe, RecipesState } from "../recipe.types";

export const recipeReducers = {
	setRecipes: (state: RecipesState, action: PayloadAction<Recipe[]>) => {
		state.recipes = action.payload;
	},
	addRecipe: (state: RecipesState, action: PayloadAction<Recipe>) => {
		state.recipes.push(action.payload);
	},
	updateRecipe: (state: RecipesState, action: PayloadAction<Recipe>) => {
		const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
		if (index !== -1) {
			state.recipes[index] = action.payload;
		}
	},
	removeRecipe: (state: RecipesState, action: PayloadAction<string>) => {
		state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
	},
	clearAllRecipes: (state: RecipesState) => {
		state.recipes = [];
	},
	removeInvalidRecipes: (state: RecipesState, action: PayloadAction<string[]>) => {
		const invalidIds = new Set(action.payload);
		state.recipes = state.recipes.filter(recipe => !invalidIds.has(recipe.id));
	},
};
