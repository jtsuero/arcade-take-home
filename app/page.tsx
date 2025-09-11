"use client";

import Button from "./components/Button";
import { Card } from "@/lib/types";
import { CARD_COLORS } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
	const [cards, setCards] = useState<Card[]>([]);

	useEffect(() => {
		fetchCards();
	}, []);

	const fetchCards = async () => {
		const res = await fetch("/api/cards");
		const data = await res.json();
		setCards(data);
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<div className='text-3xl font-bold text-gray-900'>Card Manager</div>
			<div className='flex justify-center mb-8'>
				<Button variant='primary' route='/cards/new' text={"Add New Card"}>
					Add New Card
				</Button>
			</div>
			<div>
				<div>Cards</div>
				{cards.map((card) => (
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
