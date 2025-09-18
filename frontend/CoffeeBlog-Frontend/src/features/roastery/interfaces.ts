export interface Roastery {
	location: string;
	name: string;
}

export interface RoasteryState {
	roastery: Roastery | null;
	isLoading: boolean;
	error: string | null;
}
