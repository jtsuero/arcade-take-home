"use client";

import { useRouter } from "next/navigation";
import CardForm from "@/app/components/CardForm";
import toast from "react-hot-toast";

export default function NewCard() {
	const router = useRouter();

	const handleSubmit = async (data: {
		title: string;
		description: string;
		fillColor: string;
	}) => {
		try {
			const response = await fetch("/api/cards", {
				method: "POST",
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
				toast.success("Card created successfully");
				router.push("/");
			} else {
				const error = await response.json();
				toast.error(error.error || "Failed to create card");
			}
		} catch (error) {
			console.error("Error creating card:", error);
			toast.error("Failed to create card");
		}
	};

	return (
		<CardForm
			onSubmit={handleSubmit}
			submitText='Create Card'
			loadingText='Creating...'
			title='Create New Card'
		/>
	);
}
