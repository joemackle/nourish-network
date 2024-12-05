/*import NextAuth from "next-auth";
import { authOptions } from "@/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };*/
import NextAuth, { SessionStrategy } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ) {
        //async authorize(credentials) {
        console.log("Authorized called with ", credentials);
        if (!credentials) throw new Error("Missing credentials");

        // if (!credentials?.email || !credentials?.password) {
        //   throw new Error("Missing email or password");
        // }

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
        console.log("User fetched:", user);

        if (!user) {
          console.error("User not found");
          throw new Error("Invalid email or password");
        }

        console.log(
          'Plaintext password during login: "' + credentials.password + '"',
        );
        console.log("Hashed password from DB:", user.password);
        const isPasswordValid = await bcryptjs.compare(
          credentials.password,
          user.password,
        );
        console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {
          console.error("Invalid password");
          throw new Error("Invalid email or password");
        }

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
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
