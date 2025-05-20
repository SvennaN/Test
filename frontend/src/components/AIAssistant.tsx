import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: number;
  from: 'user' | 'ai';
  text: string;
}

const SUGGESTIONS = [
  'Wat kan ik het beste als eerste doen vandaag?',
  'Geef me motivatie als ik uitstelgedrag heb'
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  const send = (t: string) => {
    if (!t.trim()) return;
    const userMsg: Message = { id: Date.now(), from: 'user', text: t };
    const aiMsg: Message = { id: Date.now() + 1, from: 'ai', text: 'Vandaag kun je het beste eerst je journal invullen.' };
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setText('');
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4">
      <header className="flex items-center gap-2">
        <Bot className="w-5 h-5" />
        <h2 className="font-semibold text-lg">AI Dagassistent</h2>
      </header>
      <div className="h-40 overflow-y-auto border rounded p-2 text-sm space-y-1 bg-gray-50 dark:bg-gray-700">
        {messages.map(m => (
          <div key={m.id} className={m.from === 'user' ? 'text-right' : ''}>
            <span className="inline-block px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-gray-100">
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Stel een vraag" className="border flex-1 rounded px-2" />
        <button onClick={() => send(text)} className="bg-blue-500 text-white px-3 rounded">Verstuur</button>
      </div>
      <div className="text-xs text-gray-500">
        Voorbeelden:
        <ul className="list-disc ml-4">
          {SUGGESTIONS.map((s, i) => (
            <li key={i} className="cursor-pointer hover:underline" onClick={() => send(s)}>{s}</li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
