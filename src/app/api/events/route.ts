import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Function to get events based on userId
export async function GET(request: Request) {
  try {
    // Parse the query parameters from the URL
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 },
      );
    }

    // Fetch the user's preferences (e.g., zip code) from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { zipCode: true },
    });

    if (!user || !user.zipCode) {
      return NextResponse.json(
        { success: false, message: "User zip code not found" },
        { status: 404 },
      );
    }

    // Fetch events near the user's zip code
    const events = await prisma.event.findMany({
      where: {
        zipCode: user.zipCode,
        date: { gte: new Date() }, // Only fetch future events
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
