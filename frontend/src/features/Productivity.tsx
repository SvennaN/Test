import React, { useState, useEffect } from 'react';

export function Productivity() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <section className="p-4 bg-white rounded shadow col-span-2">
      <h2 className="font-semibold mb-2">Pomodoro</h2>
      <div className="flex items-center gap-2">
        <span className="text-xl font-mono">{seconds}s</span>
        <button className="bg-blue-500 text-white px-2" onClick={() => setRunning(!running)}>
          {running ? 'Pauze' : 'Start'}
        </button>
        <button className="bg-gray-300 px-2" onClick={() => { setSeconds(0); setRunning(false); }}>
          Reset
        </button>
      </div>
    </section>
  );
}
