"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/lib/types";
import CardForm from "@/app/components/CardForm";
import toast from "react-hot-toast";

export default function EditCard() {
	const [card, setCard] = useState<Card | null>(null);
	const [fetching, setFetching] = useState(true);
	const router = useRouter();
	const params = useParams();
	const cardId = params.id as string;

	useEffect(() => {
		fetchCard();
	}, [cardId]);

	const fetchCard = async () => {
		try {
			const response = await fetch(`/api/cards/${cardId}`);
			if (response.ok) {
				const cardData = await response.json();
				setCard(cardData);
			} else {
				toast.error("Failed to fetch card");
				router.push("/");
			}
		} catch (error) {
			console.error("Error fetching card:", error);
			toast.error("Failed to fetch card");
			router.push("/");
		} finally {
			setFetching(false);
		}
	};

	const handleSubmit = async (data: {
		title: string;
		description: string;
		fillColor: string;
	}) => {
		try {
			const response = await fetch(`/api/cards/${cardId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: data.title,
					description: data.description || null,
					fillColor: data.fillColor,
				}),
			});

			if (response.ok) {
				toast.success("Card updated successfully");
				router.push("/");
			} else {
				const error = await response.json();
				toast.error(error.error || "Failed to update card");
			}
		} catch (error) {
			console.error("Error updating card:", error);
			toast.error("Failed to update card");
		}
	};

	if (fetching) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-lg'>Loading...</div>
			</div>
		);
	}

	if (!card) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-lg text-red-600'>Card not found</div>
			</div>
		);
	}

	return (
		<CardForm
			initialData={{
				title: card.title,
				description: card.description || "",
				fillColor: card.fillColor,
			}}
			onSubmit={handleSubmit}
			submitText='Update Card'
			loadingText='Updating...'
			title='Edit Card'
		/>
	);
}
