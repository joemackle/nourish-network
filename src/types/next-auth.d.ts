import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      group: string; // for prisma, this might be UserGroup
      username: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    group: string; // match the prisma User model
    username: string;
    email: string;
  }
}
