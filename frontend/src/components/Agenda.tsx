import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

interface Event {
  id: number;
  time: string; // HH:mm
  title: string;
  date: string; // YYYY-MM-DD
}

const STORAGE_KEY = 'agenda-events';

export default function Agenda() {
  const today = new Date().toISOString().split('T')[0];
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('08:00');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setEvents(JSON.parse(stored).filter((e: Event) => e.date === today));
    }
  }, [today]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const others = all.filter((e: Event) => e.date !== today);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...others, ...events]));
  }, [events, today]);

  const addEvent = () => {
    if (!title.trim()) return;
    const newEvent: Event = { id: Date.now(), time, title, date: today };
    setEvents(prev => [...prev, newEvent].sort((a, b) => a.time.localeCompare(b.time)));
    setTitle('');
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4">
      <header className="flex items-center gap-2">
        <CalendarDays className="w-5 h-5" />
        <h2 className="font-semibold text-lg">Agenda</h2>
      </header>
      <div className="flex gap-2">
        <input type="time" value={time} onChange={e => setTime(e.target.value)} className="border rounded px-2 flex-shrink-0" />
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Nieuwe afspraak" className="border flex-1 rounded px-2" />
        <button onClick={addEvent} className="bg-blue-500 text-white px-3 rounded">Toevoegen</button>
      </div>
      {events.length === 0 ? (
        <p className="text-sm text-gray-500">Nog geen afspraken vandaag</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {events.map(ev => (
            <li key={ev.id} className="border rounded p-2 flex justify-between">
              <span>{ev.time}</span>
              <span>{ev.title}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}
