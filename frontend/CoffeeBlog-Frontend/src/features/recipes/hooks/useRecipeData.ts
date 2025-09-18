import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { setRecipes, clearAllRecipes } from "../recipeSlice";
import { type Recipe } from "../recipe.types";

export const useRecipesData = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);

	const dispatch = useDispatch();

	const recipes = useSelector((state: RootState) => state.recipe.recipes);

	const fetchRecipes = useCallback(
		async (force = false) => {
			const now = Date.now();
			const fiveMinutesAgo = now - 5 * 60 * 1000;
			if (!force && lastFetchTime && lastFetchTime > fiveMinutesAgo) {
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch("/api/recipes");
				if (!response.ok) {
					throw new Error(`Failed to retrieve recipes data: ${response.statusText}`);
				}
				const fetchedRecipes: Recipe[] = await response.json();

				dispatch(setRecipes(fetchedRecipes));
				setLastFetchTime(now);
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : "Unknown error";
				setError(errorMessage);

				if (err instanceof Error && err.message.includes("unauthorized")) {
					dispatch(clearAllRecipes());
				}
			} finally {
				setIsLoading(false);
			}
		},
		[dispatch, lastFetchTime]
	);

	useEffect(() => {
		if (recipes.length === 0 && !isLoading && !error) {
			fetchRecipes();
		}
	}, [recipes.length, isLoading, error, fetchRecipes]);

	return {
		recipes,
		isLoading,
		error,
		refetch: () => fetchRecipes(true),
		clearError: () => setError(null),
	};
};
