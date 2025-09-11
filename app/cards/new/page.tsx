"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CARD_COLORS } from "@/lib/types";
import Button from "@/app/components/Button";

export default function NewCard() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [fillColor, setFillColor] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const colorOptions = Object.entries(CARD_COLORS).map(([key, value]) => ({
		value: key,
		label: key,
		color: value,
	}));

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			alert("Title is required");
			return;
		}
		if (!fillColor) {
			alert("Fill color is required");
			return;
		}

		setLoading(true);
		try {
			const response = await fetch("/api/cards", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: title.trim(),
					description: description.trim() || null,
					fillColor,
				}),
			});

			if (response.ok) {
				router.push("/");
			} else {
				const error = await response.json();
				alert(error.error || "Failed to create card");
			}
		} catch (error) {
			console.error("Error creating card:", error);
			alert("Failed to create card");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gray-50 p-6'>
			<div className='max-w-2xl mx-auto'>
				<div className='flex justify-center mb-8'>
					<div className='text-3xl font-bold text-gray-900'>
						Create New Card
					</div>
				</div>

				<div className='bg-white rounded-lg shadow-sm p-6'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Title *
							</label>
							<input
								type='text'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder='Enter card title...'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								required
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Description
							</label>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder='Enter card description (optional)...'
								rows={4}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Fill Color *
							</label>
							<div className='grid grid-cols-2 gap-3'>
								{colorOptions.map((option) => (
									<label
										key={option.value}
										className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
											fillColor === option.value
												? "border-blue-500 bg-blue-50"
												: "border-gray-200 hover:border-gray-300"
										}`}
									>
										<input
											type='radio'
											name='fillColor'
											value={option.value}
											checked={fillColor === option.value}
											onChange={(e) => setFillColor(e.target.value)}
											className='sr-only'
										/>
										<div
											className='w-6 h-6 rounded-full mr-3 border border-gray-300'
											style={{ backgroundColor: option.color }}
										></div>
										<span className='text-sm font-medium text-black'>
											{option.label}
										</span>
									</label>
								))}
							</div>
						</div>

						<div className='flex gap-4 pt-4'>
							<Button
								variant='primary'
								disabled={loading || !title.trim() || !fillColor}
								text={loading ? "Creating..." : "Create Card"}
								type='submit'
							/>
							<Button route='/' variant='secondary' text='Cancel' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
