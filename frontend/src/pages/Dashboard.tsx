import React, { useState, useEffect } from 'react';
import Agenda from '../components/Agenda';
import TaskBoard from '../components/TaskBoard';
import Journal from '../components/Journal';
import PomodoroTimer from '../components/PomodoroTimer';
import AIAssistant from '../components/AIAssistant';
import classNames from 'classnames';

export default function Dashboard() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className={classNames('min-h-screen p-4 space-y-4 transition', dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900')}>
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mindful Motion Dashboard</h1>
        <button onClick={() => setDark(d => !d)} className="border px-2 rounded">{dark ? 'Light' : 'Dark'} modus</button>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        <Agenda />
        <AIAssistant />
        <TaskBoard />
        <Journal />
        <PomodoroTimer />
      </div>
    </div>
  );
}
