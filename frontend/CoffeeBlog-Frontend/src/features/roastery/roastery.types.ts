export interface Roastery {
	location: string;
	name: string;
	id: string;
	followers:number;
}

export interface RoasteryState {
	roastery: Roastery | null;
	isLoading: boolean;
	error: string | null;
}

export interface RoasteriesState {
	roasteries: Roastery[];
	isLoading: boolean;
	error: string | null;
}
