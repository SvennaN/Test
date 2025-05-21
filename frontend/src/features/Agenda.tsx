import React, { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  time: string;
}

export function Agenda() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/api/calendar/gmail')
      .then(r => r.json())
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  return (
    <section className="p-4 bg-white rounded shadow">
      <h2 className="font-semibold mb-2">Agenda</h2>
      {events.length === 0 ? (
        <p className="text-sm text-gray-500">Geen afspraken geladen.</p>
      ) : (
        <ul className="text-sm space-y-1">
          {events.map(e => (
            <li key={e.id} className="border p-1 rounded">
              <span className="font-medium">{e.time}</span> – {e.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
