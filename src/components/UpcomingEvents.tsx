import React from "react";

export default async function UpcomingEvents({ userId }: { userId: string }) {
  // Fetch events from your API or database based on userId or zip code
  const events = await fetch(`/api/events?userId=${userId}`).then((res) =>
    res.json(),
  );

  if (!events || events.length === 0) {
    return <p>No upcoming events found.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Upcoming Events</h2>
      <ul className="mt-2 space-y-2">
        {events.map((event: any) => (
          <li key={event.id} className="rounded border p-2 shadow-sm">
            <p className="font-semibold">{event.name}</p>
            <p>{event.date}</p>
            <p>{event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
