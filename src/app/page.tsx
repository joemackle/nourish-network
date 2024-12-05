import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";
import UpcomingEvents from "@/components/UpcomingEvents";
import FavoritedPantries from "@/components/FavoritedPantries";
import HelpfulResources from "@/components/HelpfulResources";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // logged-out view
  if (!session) {
    return (
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {"Connecting people in need with the food you don't."}
            <br className="hidden sm:inline" />
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Find local food events or let others know about yours.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/register" rel="noreferrer" className={buttonVariants()}>
            Get Started
          </Link>
          <Link
            href="/login"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
        </div>
      </section>
    );
  }

  // fetch latest user data
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      username: true,
      group: true,
      zipCode: true,
    },
  });

  if (!user) {
    return (
      <div className="container mx-auto mt-4">
        <p>Unable to load your profile data. Please try again later.</p>
      </div>
    );
  }

  // logged-in view
  console.log(
    "SessionUser " + session.user.username + " session zip code:",
    session.user.zipCode,
  );
  console.log("User " + user.username + " zip code:", user.zipCode);
  return (
    <section className="container grid grid-cols-2 gap-4 p-4">
      {/* Title */}
      <div className="col-span-2 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
      </div>
      {/* Upcoming Event Listings (2 rows) */}
      <div className="col-span-1 row-span-2 border p-4 shadow-sm">
        <UpcomingEvents zipCode={user.zipCode || "32601"} />
      </div>

      {/* Favorited Pantries */}
      <div className="col-span-1 row-span-1 border p-4 shadow-sm">
        <p className="text-xl font-bold">Favorited Pantries</p>
        {/*<FavoritedPantries userId={session.user.id} />*/}
      </div>

      {/* Helpful Resources */}
      <div className="col-span-1 row-span-1 border p-4 shadow-sm">
        <HelpfulResources />
      </div>
    </section>
  );
}
