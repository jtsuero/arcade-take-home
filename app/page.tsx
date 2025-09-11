"use client";

import Button from "./components/Button";

const CARD_COLORS = {
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

type ColorName = keyof typeof CARD_COLORS;

interface Card {
	id: number;
	title: string;
	description: string | null;
	fillColor: ColorName;
	createdAt: string;
}

const dummyCards: Card[] = [
	{
		id: 1,
		title: "Card 1",
		description: "Description 1",
		fillColor: "orange",
		createdAt: "2025-01-01",
	},
	{
		id: 2,
		title: "Card 2",
		description: "Description 2",
		fillColor: "teal",
		createdAt: "2025-01-01",
	},
];

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<div>
				<div>Card Manager</div>
				<Button variant='primary' route='/cards/new' text={"Add New Card"}>
					Add New Card
				</Button>
			</div>
			<div>
				<div>Cards</div>
				{dummyCards.map((card) => (
					<div
						key={card.id}
						className='flex flex-col gap-2 p-4 rounded-lg'
						style={{ backgroundColor: CARD_COLORS[card.fillColor] }}
					>
						<div>{card.title}</div>
						<div>{card.description}</div>
						<div>{card.createdAt}</div>
					</div>
				))}
			</div>
		</div>
	);
}
