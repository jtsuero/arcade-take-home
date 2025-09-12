"use client";

import Button from "./components/Button";
import { Card } from "@/lib/types";
import { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
	const [cards, setCards] = useState<Card[]>([]);
	const router = useRouter();

	useEffect(() => {
		fetchCards();
	}, []);

	const fetchCards = async () => {
		const res = await fetch("/api/cards");
		const data = await res.json();
		setCards(data);
	};

	const handleDelete = async (id: number) => {
		try {
			const res = await fetch(`/api/cards/${id}`, {
				method: "DELETE",
			});

			if (res.ok) {
				setCards((prevCards) => prevCards.filter((card) => card.id !== id));
				toast.success("Card deleted successfully");
			} else {
				console.error("Failed to delete card");
				toast.error("Failed to delete card");
			}
		} catch (error) {
			console.error("Network error:", error);
			toast.error("Network error");
		}
	};

	const handleEdit = async (id: number) => {
		router.push(`/cards/${id}/edit`);
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
					<CardComponent
						key={card.id}
						card={card}
						onDelete={handleDelete}
						onEdit={handleEdit}
					/>
				))}
			</div>
		</div>
	);
}
