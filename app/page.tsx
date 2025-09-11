"use client";

import Button from "./components/Button";
import { Card } from "@/lib/types";
import { CARD_COLORS } from "@/lib/types";

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
