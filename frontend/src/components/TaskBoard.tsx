import React, { useState, useEffect } from 'react';
import { ListTodo, Loader, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  text: string;
}

interface BoardState {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

const STORAGE_KEY = 'kanban-tasks';

export default function TaskBoard() {
  const [state, setState] = useState<BoardState>({ todo: [], inProgress: [], done: [] });
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setState(JSON.parse(saved));
    } else {
      setState({
        todo: [{ id: Date.now(), text: 'Trainingsmateriaal voorbereiden' }],
        inProgress: [],
        done: []
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addTask = () => {
    if (!text.trim()) return;
    setState(prev => ({ ...prev, todo: [...prev.todo, { id: Date.now(), text }] }));
    setText('');
  };

  const moveTask = (task: Task, from: keyof BoardState, to: keyof BoardState) => {
    setState(prev => {
      const fromList = prev[from].filter(t => t.id !== task.id);
      const toList = [...prev[to], task];
      return { ...prev, [from]: fromList, [to]: toList };
    });
  };

  const renderColumn = (title: string, key: keyof BoardState, icon: JSX.Element) => (
    <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded space-y-2" onDragOver={e => e.preventDefault()} onDrop={e => {
      const id = Number(e.dataTransfer.getData('text/plain'));
      const task = Object.values(state).flat().find(t => t.id === id);
      if (task) {
        const from = (['todo', 'inProgress', 'done'] as (keyof BoardState)[]).find(k => state[k].some(t => t.id === id))!;
        moveTask(task, from, key);
      }
    }}>
      <h3 className="flex items-center gap-1 font-medium mb-1">
        {icon} {title}
      </h3>
      {state[key].map(t => (
        <div key={t.id} draggable onDragStart={e => e.dataTransfer.setData('text/plain', String(t.id))} className="bg-white dark:bg-gray-800 rounded p-2 shadow cursor-grab hover:scale-105 transition">
          {t.text}
        </div>
      ))}
    </div>
  );

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4">
      <header className="flex items-center gap-2">
        <ListTodo className="w-5 h-5" />
        <h2 className="font-semibold text-lg">Takenbord</h2>
      </header>
      <div className="flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Nieuwe taak" className="border flex-1 rounded px-2" />
        <button onClick={addTask} className="bg-blue-500 text-white px-3 rounded">Toevoegen</button>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        {renderColumn('To Do', 'todo', <Loader className="w-4 h-4" />)}
        {renderColumn('In Progress', 'inProgress', <Loader className="w-4 h-4 animate-spin" />)}
        {renderColumn('Done', 'done', <CheckCircle2 className="w-4 h-4 text-green-500" />)}
      </div>
    </motion.section>
  );
}
