import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

export default function PomodoroTimer() {
  const [seconds, setSeconds] = useState(WORK_DURATION);
  const [running, setRunning] = useState(false);
  const [breakTime, setBreakTime] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (seconds === 0) {
      const next = breakTime ? WORK_DURATION : BREAK_DURATION;
      setSeconds(next);
      setBreakTime(!breakTime);
      setRunning(false);
      // Sound placeholder - could play an audio clip here
    }
  }, [seconds, breakTime]);

  const percent = seconds / (breakTime ? BREAK_DURATION : WORK_DURATION) * 100;
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4 col-span-2">
      <header className="flex items-center gap-2">
        <Timer className="w-5 h-5" />
        <h2 className="font-semibold text-lg">Pomodoro</h2>
      </header>
      <div className="h-4 bg-gray-200 rounded">
        <motion.div className="h-4 bg-blue-500 rounded" style={{ width: `${percent}%` }} />
      </div>
      <div className="text-center text-2xl font-mono">
        {minutes}:{secs}
      </div>
      <div className="flex gap-2 justify-center">
        <button onClick={() => setRunning(r => !r)} className="bg-blue-500 text-white px-3 rounded">
          {running ? 'Pauze' : 'Start'}
        </button>
        <button onClick={() => { setRunning(false); setSeconds(WORK_DURATION); setBreakTime(false); }} className="bg-gray-300 px-3 rounded">
          Reset
        </button>
      </div>
    </motion.section>
  );
}
