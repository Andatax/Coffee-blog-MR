import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import recipeReducer from "../features/recipes/recipeSlice";

export const store = configureStore({
	reducer: { user: userReducer, recipe: recipeReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
