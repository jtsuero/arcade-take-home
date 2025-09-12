import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

async function findCardById(id: number) {
	return await prisma.card.findUnique({
		where: { id },
	});
}

export async function GET({ params }: { params: { id: string } }) {
	try {
		console.log(params);
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid card ID" }, { status: 400 });
		}

		const card = await findCardById(id);

		if (!card) {
			return NextResponse.json({ error: "Card not found" }, { status: 404 });
		}

		return NextResponse.json(card);
	} catch (error) {
		console.error("Error fetching card:", error);
		return NextResponse.json(
			{ error: "Failed to fetch card" },
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid card ID" }, { status: 400 });
		}

		const body = await request.json();
		const { title, description, fillColor } = body;

		const existingCard = await findCardById(id);

		if (!existingCard) {
			return NextResponse.json({ error: "Card not found" }, { status: 404 });
		}

		if (!title || !fillColor) {
			return NextResponse.json(
				{ error: "Title and fillColor are required" },
				{ status: 400 }
			);
		}

		const updatedCard = await prisma.card.update({
			where: { id },
			data: {
				title,
				description,
				fillColor,
			},
		});

		return NextResponse.json(updatedCard);
	} catch (error) {
		console.error("Error updating card:", error);
		return NextResponse.json(
			{ error: "Failed to update card" },
			{ status: 500 }
		);
	}
}

export async function DELETE({ params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid card ID" }, { status: 400 });
		}

		const existingCard = await findCardById(id);

		if (!existingCard) {
			return NextResponse.json({ error: "Card not found" }, { status: 404 });
		}

		await prisma.card.delete({
			where: { id },
		});

		return NextResponse.json({ message: "Card deleted successfully" });
	} catch (error) {
		console.error("Error deleting card:", error);
		return NextResponse.json(
			{ error: "Failed to delete card" },
			{ status: 500 }
		);
	}
}
