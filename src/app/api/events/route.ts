import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zipCode = searchParams.get("zipCode");

  //console.log("Received zipCode:", zipCode);

  if (!zipCode) {
    return NextResponse.json(
      { error: "Zip code is required" },
      { status: 400 },
    );
  }

  try {
    const events = await prisma.event.findMany({
      where: { zipCode },
      orderBy: { date: "asc" }, // sort by date
    });

    //console.log("Fetched events:", events);

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}
