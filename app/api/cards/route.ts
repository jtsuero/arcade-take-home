import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
	try {
		const cards = await prisma.card.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(cards);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch cards" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { title, description, fillColor } = body;

		if (!title || !fillColor) {
			return NextResponse.json(
				{ error: "Title and fillColor are required" },
				{ status: 400 }
			);
		}

		const card = await prisma.card.create({
			data: {
				title,
				description,
				fillColor,
			},
		});

		return NextResponse.json(card, { status: 201 });
	} catch (error) {
		console.error("Error creating card:", error);
		return NextResponse.json(
			{ error: "Failed to create card" },
			{ status: 500 }
		);
	}
}
