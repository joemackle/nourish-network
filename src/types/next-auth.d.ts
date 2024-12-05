import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      group: string; // for prisma, this might be UserGroup
      username: string;
      email?: string | null;
      zipCode?: string | "32601";
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    group: string; // match the prisma User model
    username: string;
    email: string;
    zipCode?: string | "32601";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username: string;
    group: string;
    zipCode?: string | null;
  }
}
