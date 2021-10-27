
export interface Activity {
	author: string;
	image: string;
	status: string;
}

export enum ActivityStatus {
	bought = "BOUGHT",
	sold = "SOLD",
	listed = "LISTED",
	delisted = "DELISTED",
}