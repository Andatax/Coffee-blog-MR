export interface User {
	id: string;
	name: string;
	email: string;
	token: string;
}

export interface UserState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
}

