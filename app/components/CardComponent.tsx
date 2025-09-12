import { Card as CardType } from "@/lib/types";
import { CARD_COLORS } from "@/lib/types";
import Button from "./Button";

interface CardProps {
	card: CardType;
	onDelete: (id: number) => void;
	onEdit: (id: number) => void;
}

export default function CardComponent({ card, onDelete, onEdit }: CardProps) {
	return (
		<div
			className={
				"bg-white rounded-lg shadow-sm overflow-hidden h-64 flex flex-col mt-5"
			}
			style={{ backgroundColor: CARD_COLORS[card.fillColor] }}
		>
			<div className='p-6 flex flex-col h-full'>
				<h3 className='text-lg font-semibold text-black mb-2 break-words'>
					{card.title}
				</h3>
				{card.description && (
					<div className='text-black mb-4 text-sm leading-relaxed flex-1 overflow-y-auto'>
						<p className='break-words whitespace-pre-wrap'>
							{card.description}
						</p>
					</div>
				)}

				<div className='flex gap-2 mt-auto'>
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
