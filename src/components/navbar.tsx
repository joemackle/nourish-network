"use client";

import Link from "next/link";
import { useSession, signOut, SessionProvider } from "next-auth/react";

import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import ThemeToggle from "@/components/theme-toggle";

export default function NavBar() {
  return (
    <SessionProvider>
      <HeaderContent />
    </SessionProvider>
  );
}

function HeaderContent() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
            {session && <Button onClick={() => signOut()}>Sign Out</Button>}
          </nav>
        </div>
      </div>
    </header>
  );
}
