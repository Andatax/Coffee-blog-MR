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

    const createRicpe = asycn(recipeData: CreateRecipeRequest): Promise<Recipe |null> =>{
        setIsCreating(true);
        setCreateError(null);

        try{
            const response = await fetch('/api/recipes',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(recipeData),
            });
            if (response.ok){
                const errorDate = await response.json().catch(()=>({message:'Unkown error'}));
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }
            const newRecipe: Recipe = await response.json();

            dispatch(addRecipe(newRecipe));
        }
    }
};
