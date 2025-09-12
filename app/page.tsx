"use client";

import Button from "./components/Button";
import { Card, ColorName, CARD_COLORS } from "@/lib/types";
import { useEffect, useState, useMemo } from "react";
import CardComponent from "./components/CardComponent";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type SortField = "title" | "description";
type SortDirection = "asc" | "desc";

export default function Home() {
	const [cards, setCards] = useState<Card[]>([]);
	const [sortField, setSortField] = useState<SortField>("title");
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
	const [filterColor, setFilterColor] = useState<ColorName | "all">("all");
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

	const filteredAndSortedCards = useMemo(() => {
		let filtered = cards;

		// Filter by color
		if (filterColor !== "all") {
			filtered = cards.filter((card) => card.fillColor === filterColor);
		}

		// Sort cards
		return filtered.sort((a, b) => {
			const aValue = sortField === "title" ? a.title : a.description || "";
			const bValue = sortField === "title" ? b.title : b.description || "";

			const comparison = aValue.localeCompare(bValue);
			return sortDirection === "asc" ? comparison : -comparison;
		});
	}, [cards, sortField, sortDirection, filterColor]);

	const toggleSortDirection = () => {
		setSortDirection(sortDirection === "asc" ? "desc" : "asc");
	};

	// UI Section Constants
	const pageHeader = (
		<div className='text-3xl font-bold text-gray-900 mb-8'>Card Manager</div>
	);

	const addCardButton = (
		<div className='flex justify-center mb-8'>
			<Button variant='primary' route='/cards/new' text={"Add New Card"}>
				Add New Card
			</Button>
		</div>
	);

	const sortControls = (
		<div className='flex items-center gap-2'>
			<label className='text-sm font-medium text-gray-700'>Sort by:</label>
			<select
				value={sortField}
				onChange={(e) => setSortField(e.target.value as SortField)}
				className='px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
			>
				<option value='title'>Title</option>
				<option value='description'>Description</option>
			</select>
			<button
				onClick={toggleSortDirection}
				className='px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors'
			>
				{sortDirection === "asc" ? "A-Z" : "Z-A"}
			</button>
		</div>
	);

	const filterControls = (
		<div className='flex items-center gap-2'>
			<label className='text-sm font-medium text-gray-700'>
				Filter by color:
			</label>
			<select
				value={filterColor}
				onChange={(e) => setFilterColor(e.target.value as ColorName | "all")}
				className='px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
			>
				<option value='all'>All Colors</option>
				{Object.keys(CARD_COLORS).map((color) => (
					<option key={color} value={color}>
						{color.charAt(0).toUpperCase() + color.slice(1)}
					</option>
				))}
			</select>
		</div>
	);

	const controlsSection = (
		<div className='w-full max-w-4xl mb-6'>
			<div className='flex flex-col sm:flex-row gap-4 items-center justify-center'>
				{sortControls}
				{filterControls}
			</div>
		</div>
	);

	const emptyState = (
		<div className='text-center text-gray-500 py-8'>
			{filterColor !== "all"
				? `No cards found with ${filterColor} color`
				: "No cards found"}
		</div>
	);

	const cardsGrid = (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{filteredAndSortedCards.map((card) => (
				<CardComponent
					key={card.id}
					card={card}
					onDelete={handleDelete}
					onEdit={handleEdit}
				/>
			))}
		</div>
	);

	const cardsSection = (
		<div className='w-full max-w-4xl'>
			<div className='text-2xl font-bold text-gray-900 mb-4'>Cards</div>
			{filteredAndSortedCards.length === 0 ? emptyState : cardsGrid}
		</div>
	);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4'>
			{pageHeader}
			{addCardButton}
			{controlsSection}
			{cardsSection}
		</div>
	);
}
