import React, { useState, useEffect } from 'react';
import { NotebookPen } from 'lucide-react';
import { motion } from 'framer-motion';

interface Entry {
  date: string;
  answers: string[];
}

const QUESTIONS = [
  'Waar sta ik over 3 jaar?',
  'Wat moet ik vandaag doen om daar te komen?',
  'Wat houd me momenteel tegen?',
  'Wat is één klein ding dat ik vandaag wil doen?'
];

const STORAGE_KEY = 'journal-entries';

export default function Journal() {
  const today = new Date().toISOString().split('T')[0];
  const [answers, setAnswers] = useState<string[]>(Array(QUESTIONS.length).fill(''));
  const [entries, setEntries] = useState<Entry[]>([]);
  const [view, setView] = useState<Entry | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const save = () => {
    const entry = { date: today, answers };
    setEntries(prev => [entry, ...prev.filter(e => e.date !== today)]);
    setAnswers(Array(QUESTIONS.length).fill(''));
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4 col-span-2">
      <header className="flex items-center gap-2">
        <NotebookPen className="w-5 h-5" />
        <h2 className="font-semibold text-lg flex-1">Journal</h2>
        {view && <button onClick={() => setView(null)} className="text-sm underline">Terug</button>}
      </header>
      {view ? (
        <div className="space-y-2 text-sm">
          <h3 className="font-medium">{view.date}</h3>
          {QUESTIONS.map((q, i) => (
            <p key={i}><span className="font-semibold">{q}</span> {view.answers[i]}</p>
          ))}
        </div>
      ) : (
        <>
          {QUESTIONS.map((q, i) => (
            <details key={i} className="border rounded">
              <summary className="cursor-pointer px-2 py-1 font-medium">{q}</summary>
              <textarea value={answers[i]} onChange={e => setAnswers(a => { const n=[...a]; n[i]=e.target.value; return n; })} className="w-full p-2" rows={2} />
            </details>
          ))}
          <button onClick={save} className="bg-green-500 text-white px-3 rounded">Opslaan</button>
          <div className="mt-4">
            <h3 className="font-medium mb-1">Vorige entries</h3>
            <ul className="space-y-1 text-sm">
              {entries.map(e => (
                <li key={e.date} className="underline cursor-pointer" onClick={() => setView(e)}>{e.date}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </motion.section>
  );
}
