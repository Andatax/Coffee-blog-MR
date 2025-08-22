import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface Recipe {
	id: string;
	name: string;
	description: string;
	brewtime: number;
	brewer: string;
	grinder: string;
	coffee: string;
}

interface RecipesState {
	recipes: Recipe[];
}

const initialState: RecipesState = {
	recipes: [],
};

const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {
		addRecipe: (state, action: PayloadAction<Recipe>) => {
			state.recipes.push(action.payload);
		},
		deleteRecipe: (state, action: PayloadAction<string>) => {
			state.recipes = state.recipes.filter(recipe => recipe.id === action.payload);
		},
		updateRecipe: (state, action: PayloadAction<Recipe>) => {
			const recipe = state.recipes.find(recipe => recipe.id === action.payload.id);
			if (recipe) {
				recipe.id = action.payload.id;
				recipe.name = action.payload.name;
			}
		},
		resetRecipes: state => {
			state.recipes = [];
		},
	},
});
export const { addRecipe, deleteRecipe, updateRecipe, resetRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
