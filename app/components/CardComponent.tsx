import { Card as CardType } from "@/lib/types";
import { CARD_COLORS } from "@/lib/types";
import Button from "./Button";

interface CardProps {
	card: CardType;
	onDelete: (id: number) => void;
	onEdit: (id: number) => void;
	className?: string;
}

export default function CardComponent({
	card,
	onDelete,
	onEdit,
	className = "",
}: CardProps) {
	return (
		<div
			className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}
		>
			<div
				className='h-2 w-full'
				style={{ backgroundColor: CARD_COLORS[card.fillColor] }}
			></div>

			<div className='p-6'>
				<h3 className='text-lg font-semibold text-gray-900 mb-2'>
					{card.title}
				</h3>
				{card.description && (
					<p className='text-gray-600 mb-4 line-clamp-3'>{card.description}</p>
				)}
				<div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
					<span className='capitalize'>{card.fillColor}</span>
					<span>{new Date(card.createdAt).toLocaleDateString()}</span>
				</div>

				<div className='flex gap-2'>
					<Button
						variant='secondary'
						onClick={() => onEdit(card.id)}
						text='Edit'
						className='flex-1'
					/>
					<Button
						variant='secondary'
						onClick={() => onDelete(card.id)}
						text='Delete'
						className='flex-1'
					/>
				</div>
			</div>
		</div>
	);
}
