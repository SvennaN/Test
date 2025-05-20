import React, { useState } from 'react';

interface Entry {
  id: number;
  text: string;
  date: string;
}

export function Journal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [text, setText] = useState('');

  const addEntry = () => {
    if (!text.trim()) return;
    setEntries([{ id: Date.now(), text, date: new Date().toISOString() }, ...entries]);
    setText('');
  };

  return (
    <section className="p-4 bg-white rounded shadow col-span-2">
      <h2 className="font-semibold mb-2">Journal</h2>
      <textarea className="w-full border p-2" rows={3} value={text} onChange={e => setText(e.target.value)} placeholder="Schrijf je gedachten..." />
      <button className="mt-2 bg-green-500 text-white px-2" onClick={addEntry}>Opslaan</button>
      <ul className="mt-2 space-y-1 text-sm">
        {entries.map(e => (
          <li key={e.id} className="border p-1">{new Date(e.date).toLocaleString()} – {e.text}</li>
        ))}
      </ul>
    </section>
  );
}
