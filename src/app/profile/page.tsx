import React from "react";

interface ProfilesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ProfilesPage({ searchParams }: ProfilesPageProps) {
  const username = Array.isArray(searchParams.username)
    ? searchParams.username[0]
    : searchParams.username || "User";

  return (
    <div>
      <h1>Welcome back {username}!</h1>
    </div>
  );
}
