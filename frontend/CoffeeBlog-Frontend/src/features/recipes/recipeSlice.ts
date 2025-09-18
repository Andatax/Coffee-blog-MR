import { createSlice } from "@reduxjs/toolkit";
import type { RecipesState } from "./recipe.types";
import { successReducers } from "./successReducers";
import { errorReducers } from "./errorReducers";
import { utilityReducers } from "./utilityReducers";

const initialState: RecipesState = {
	recipes: [],
};

const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {
		...successReducers,
		...errorReducers,
		...utilityReducers,
	},
});

export const { setRecipes, addRecipe, updateRecipe, removeRecipe, sortRecipesByName, clearAllRecipes } =
	recipesSlice.actions;

export default recipesSlice.reducer;
