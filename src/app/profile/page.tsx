import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

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

  const { user } = session;

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
      </div>
    </div>
  );
}
