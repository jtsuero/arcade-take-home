"use client";

import { useState, useEffect } from "react";
import { CARD_COLORS, Card, ColorName } from "@/lib/types";
import Button from "./Button";
import toast from "react-hot-toast";

interface CardFormProps {
	initialData?: {
		title: string;
		description: string;
		fillColor: ColorName;
	};
	onSubmit: (data: {
		title: string;
		description: string;
		fillColor: ColorName;
	}) => Promise<void>;
	submitText: string;
	loadingText: string;
	title: string;
}

export default function CardForm({
	initialData,
	onSubmit,
	submitText,
	loadingText,
	title,
}: CardFormProps) {
	const [formTitle, setFormTitle] = useState(initialData?.title || "");
	const [description, setDescription] = useState(
		initialData?.description || ""
	);
	const [fillColor, setFillColor] = useState<ColorName | "">(
		initialData?.fillColor || ""
	);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (initialData) {
			setFormTitle(initialData.title);
			setDescription(initialData.description || "");
			setFillColor(initialData.fillColor);
		}
	}, [initialData]);

	const colorOptions = Object.entries(CARD_COLORS).map(([key, value]) => ({
		value: key,
		label: key,
		color: value,
	}));

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formTitle.trim()) {
			toast.error("Title is required");
			return;
		}
		if (!fillColor) {
			toast.error("Fill color is required");
			return;
		}

		setLoading(true);
		try {
			await onSubmit({
				title: formTitle.trim(),
				description: description.trim() || "",
				fillColor: fillColor as ColorName,
			});
		} catch (error) {
			console.error("Form submission error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gray-50 p-6'>
			<div className='max-w-2xl mx-auto'>
				<div className='flex justify-center mb-8'>
					<div className='text-3xl font-bold text-gray-900'>{title}</div>
				</div>

				<div className='bg-white rounded-lg shadow-sm p-6'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Title <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								value={formTitle}
								onChange={(e) => setFormTitle(e.target.value)}
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
								Fill Color <span className='text-red-500'>*</span>
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
											onChange={(e) =>
												setFillColor(e.target.value as ColorName)
											}
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
								disabled={loading || !formTitle.trim() || !fillColor}
								text={loading ? loadingText : submitText}
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
