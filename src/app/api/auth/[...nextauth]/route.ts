import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { User } from "@prisma/client";

// Define your options inline
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
          select: {
            id: true,
            email: true,
            username: true,
            group: true,
            zipCode: true,
            password: true,
          },
        });

        if (!user) throw new Error("Invalid email or password");

        const isPasswordValid = await bcryptjs.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) throw new Error("Invalid email or password");

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          group: user.group,
          zipCode: user.zipCode || "32601",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: Pick<User, "id" | "group" | "username" | "zipCode"> | undefined;
    }) {
      if (user) {
        token.id = user.id;
        token.group = user.group;
        token.username = user.username;
        token.zipCode = user.zipCode;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          id: token.id as string,
          group: token.group as string,
          username: token.username as string,
          zipCode: token.zipCode as string,
          email: session.user?.email || null,
          name: session.user?.name || null,
          image: session.user?.image || null,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
