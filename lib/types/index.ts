export const CARD_COLORS = {
	red: "#FF6B6B",
	orange: "#FFA94D",
	yellow: "#FFD43B",
	green: "#69DB7C",
	teal: "#38D9A9",
	cyan: "#4DABF7",
	blue: "#748FFC",
	indigo: "#9775FA",
	pink: "#F783AC",
	gray: "#CED4DA",
} as const;

export type ColorName = keyof typeof CARD_COLORS;

export interface Card {
	id: number;
	title: string;
	description: string | null;
	fillColor: ColorName;
	createdAt: string;
}

// For API requests/responses
export interface CreateCardRequest {
	title: string;
	description?: string | null;
	fillColor: ColorName;
}

export interface UpdateCardRequest {
	title?: string;
	description?: string | null;
	fillColor?: ColorName;
}
