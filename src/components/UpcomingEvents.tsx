import React from "react";

export default async function UpcomingEvents({ zipCode }: { zipCode: string }) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"; // localhost fallback
  const apiUrl = `${baseUrl}/api/events?zipCode=${zipCode}`;

  // fetch events based on zip code
  //console.log("Fetching events from:", apiUrl);
  const events = await fetch(apiUrl).then((res) => res.json());
  //console.log("Fetched events:", events);

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
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
