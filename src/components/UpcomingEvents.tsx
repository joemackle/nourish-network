import React from "react";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
}

export default async function UpcomingEvents({ zipCode }: { zipCode: string }) {
  const env = process.env.NODE_ENV;
  const baseUrl =
    env === "production"
      ? process.env.NEXTAUTH_URL_PRODUCTION
      : process.env.NEXTAUTH_URL; // localhost fallback
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
        {events.map((event: Event) => (
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
