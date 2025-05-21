import React, { useState } from 'react';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { from: 'user', text: input };
    setMessages(m => [...m, userMsg]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });
      const data = await res.json();
      setMessages(m => [...m, { from: 'bot', text: data.reply }]);
    } catch {
      setMessages(m => [...m, { from: 'bot', text: 'Er ging iets mis.' }]);
    }
  };

  return (
    <section className="p-4 bg-white rounded shadow flex flex-col h-80">
      <h2 className="font-semibold mb-2">AI Dagassistent</h2>
      <div className="flex-1 overflow-y-auto mb-2 space-y-1 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'user' ? 'text-right' : ''}>
            <span className="inline-block px-2 py-1 rounded bg-gray-100">{m.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Stel een vraag..."
        />
        <button className="bg-blue-500 text-white px-2" onClick={sendMessage}>Send</button>
      </div>
    </section>
  );
}
