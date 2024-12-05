import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";
import ZipCodeForm from "@/components/ZipCodeForm";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="container mx-auto mt-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p>You are not logged in. Please log in to view your profile.</p>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold">Profile</h1>
        <p>Unable to load your profile data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Group:</strong> {user.group}
        </p>
        <p>
          <strong>Zip Code:</strong> {user.zipCode || "Not set"}
        </p>
        <ZipCodeForm userId={session.user.id} />
      </div>
    </div>
  );
}
