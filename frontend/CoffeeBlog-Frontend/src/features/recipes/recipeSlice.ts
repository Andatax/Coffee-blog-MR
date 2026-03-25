import { createSlice } from "@reduxjs/toolkit";
import type { RecipesState } from "./recipe.types";
import { recipeReducers } from "./reducers/recipeReducers";
import { recipesFilterReducers } from "./reducers/filterReducers";

const initialState: RecipesState = {
	recipes: [],
};

const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {
		...recipeReducers,
		...recipesFilterReducers,
	},
});

export const {
	setRecipes,
	addRecipe,
	updateRecipe,
	removeRecipe,
	sortRecipesByName,
	clearAllRecipes,
	removeInvalidRecipes,
} = recipesSlice.actions;

export default recipesSlice.reducer;
