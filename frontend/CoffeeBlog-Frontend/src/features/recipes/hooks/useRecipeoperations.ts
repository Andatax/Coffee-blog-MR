import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe, updateRecipe, removeRecipe } from "../recipeSlice";
import type { Recipe, CreateRecipeRequest } from "../recipe.types";

export const useRecipeOperations = () => {
	const [isCreating, setIsCreating] = useState(false);
	const [createError, setCreateError] = useState<string | null>(null);

	const [updatingRecipes, setUpdatingRecipes] = useState<Set<string>>(new Set());
	const [updateError, setUpdateError] = useState<string | null>(null);

	const [deletingRecipes, setDeletingRecipes] = useState<Set<string>>(new Set());
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const dispatch = useDispatch();

	const createRecipe = async (recipeData: CreateRecipeRequest): Promise<Recipe | null> => {
		setIsCreating(true);
		setCreateError(null);

		try {
			const response = await fetch("/api/recipes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(recipeData),
			});
			if (response.ok) {
				const errorData = await response.json().catch(() => ({ message: "Unkown error" }));
				throw new Error(errorData.message || `HTTP ${response.status}`);
			}
			const newRecipe: Recipe = await response.json();

			dispatch(addRecipe(newRecipe));
			return newRecipe;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Failed to create recipe";
			setCreateError(errorMessage);
			return null;
		} finally {
			setIsCreating(false);
		}
	};

	const editRecipe = async (recipeId: string, update: Partial<Recipe>): Promise<boolean> => {
		setUpdatingRecipes(prev => new Set(prev).add(recipeId));
		setUpdateError(null);
		try {
			const response = await fetch(`/api/recipes/${recipeId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(update),
			});

			if (!response.ok) {
				throw new Error(`Failed to update recipe ${response.statusText}`);
			}

			const updatedRecipe: Recipe = await response.json();

			// Tell Redux about the successful update
			dispatch(updateRecipe(updatedRecipe));

			return true;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Failed to update recipe";
			setUpdateError(errorMessage);
			return false;
		} finally {
			setUpdatingRecipes(prev => {
				const newSet = new Set(prev);
				newSet.delete(recipeId);
				return newSet;
			});
		}
	};

	const deleteRecipe = async (recipeId: string): Promise<boolean> => {
		setDeletingRecipes(prev => new Set(prev).add(recipeId));
		setDeleteError(null);

		try {
			const response = await fetch(`/api/recipes${recipeId}`, { method: "DELETE" });
			if (!response.ok) {
				throw new Error(`Failed to delete recipe ${response.statusText}`);
			}
			dispatch(removeRecipe(recipeId));
			return true;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Failed to delete recipe";
			setUpdateError(errorMessage);
			return false;
		} finally {
			setDeletingRecipes(prev => {
				const newSet = new Set(prev);
				newSet.delete(recipeId);
				return newSet;
			});
		}
	};

	return {
		createRecipe,
		isCreating,
		createError,
		clearCreateError: () => setCreateError(null),

		editRecipe,
		isUpdating: (recipeId: string) => updatingRecipes.has(recipeId),
		updateError,
		clearUpdateError: () => setUpdateError(null),

		deleteRecipe,
		isDeleting: (recipeId: string) => deletingRecipes.has(recipeId),
		deleteError,
		clearDeleteError: () => setDeleteError(null),
	};
};
