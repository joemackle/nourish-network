import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcryptjs from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //console.log("Authorize called with credentials:", credentials);

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email.toLowerCase() },
          select: {
            id: true,
            email: true,
            username: true,
            group: true,
            zipCode: true,
            password: true,
          },
        });
        //console.log("User fetched:", user);

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required.");
        }

        if (!user) {
          throw new Error("No user found with this email.");
        }

        const isPasswordValid = await bcryptjs.compare(
          credentials.password,
          user.password,
        );
        //console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          group: user.group,
          zipCode: user.zipCode || undefined,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.group = user.group;
        token.zipCode = user.zipCode;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          username: token.username as string,
          group: token.group as string,
          zipCode: token.zipCode as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
