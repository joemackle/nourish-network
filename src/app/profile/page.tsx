import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
    <div className="flex min-h-screen items-center gap-6">
      <div className="grid gap-2">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <Avatar>
                <AvatarFallback>Me</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.username}
                </p>
                <p className="text-sm text-muted-foreground">{user.group}</p>
              </div>
            </div>
            <p>
              <strong>Zip Code:</strong> {user.zipCode || "Not set"}
            </p>
            <ZipCodeForm userId={session.user.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
