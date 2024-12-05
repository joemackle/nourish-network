import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Request body:", body);

  const { email, username, password, group } = body;
  console.log("Plaintext password as received:", password);

  if (!email || !username || !password || !group) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 },
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    //console.log("Plaintext password during registration:", password);
    console.log("Hashed password during registration:", hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        group: group.toUpperCase() as "DONOR" | "RECIPIENT",
      },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
