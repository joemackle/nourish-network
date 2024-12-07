import React from "react";

interface Pantry {
  id: string;
  name: string;
  openHours: string;
}

export default async function FavoritedPantries({
  userId,
}: {
  userId: string;
}) {
  // Fetch favorited pantries from your API or database
  const pantries = await fetch(`/api/pantries/favorites?userId=${userId}`).then(
    (res) => res.json(),
  );

  if (!pantries || pantries.length === 0) {
    return <p>You have no favorited pantries.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Favorited Pantries</h2>
      <ul className="mt-2 space-y-2">
        {pantries.map((pantry: Pantry) => (
          <li key={pantry.id} className="rounded border p-2 shadow-sm">
            <p className="font-semibold">{pantry.name}</p>
            <p>Open Hours: {pantry.openHours}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
