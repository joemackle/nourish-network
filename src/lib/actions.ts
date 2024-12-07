"use server";

// import { authOptions } from "@/auth";
// import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
// import AuthError from "next-auth";

const prisma = new PrismaClient();

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    //await signIn("credentials", formData);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) {
      return "Email and password are required";
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        password: true,
      },
    });

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return "Invalid credentials";
    }

    // Optionally return some state to the caller
    return prevState;
  } catch (error) {
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case "CredentialsSignin":
    //       return "Invalid credentials.";
    //     default:
    //       return "Something went wrong.";
    //   }
    // }
    // throw error;
    console.error("Auth error:", error);
    return "Something went wrong";
  }
}
