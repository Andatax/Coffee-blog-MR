export interface Recipe {
	id: string;
	name: string;
	description: string;
	brewtime: number;
	brewer: string;
	grinder: string;
	coffee: string;
	likes:number;
}

export interface CreateRecipeRequest {
	name: string;
	description: string;
	brewtime: number;
	brewer: string;
	grinder: string;
	coffee: string;
}

export interface RecipesState {
	recipes: Recipe[];
}
