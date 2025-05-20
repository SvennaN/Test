import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
}

export function KanbanBoard() {
  const [todo, setTodo] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);
  const [text, setText] = useState('');

  const addTask = () => {
    if (!text.trim()) return;
    setTodo([...todo, { id: Date.now(), text }]);
    setText('');
  };

  const moveTask = (task: Task, from: Task[], toSetter: React.Dispatch<React.SetStateAction<Task[]>>, fromSetter: React.Dispatch<React.SetStateAction<Task[]>>) => {
    fromSetter(from.filter(t => t.id !== task.id));
    toSetter(prev => [...prev, task]);
  };

  return (
    <section className="p-4 bg-white rounded shadow">
      <h2 className="font-semibold mb-2">Takenbord</h2>
      <div className="mb-2 flex gap-2">
        <input className="border flex-1 p-1" value={text} onChange={e => setText(e.target.value)} placeholder="Nieuwe taak" />
        <button className="bg-blue-500 text-white px-2" onClick={addTask}>Toevoegen</button>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <h3 className="text-center font-medium">To Do</h3>
          {todo.map(t => (
            <div key={t.id} className="bg-gray-100 p-1 my-1 cursor-pointer" onClick={() => moveTask(t, todo, setInProgress, setTodo)}>{t.text}</div>
          ))}
        </div>
        <div>
          <h3 className="text-center font-medium">In Progress</h3>
          {inProgress.map(t => (
            <div key={t.id} className="bg-gray-100 p-1 my-1 cursor-pointer" onClick={() => moveTask(t, inProgress, setDone, setInProgress)}>{t.text}</div>
          ))}
        </div>
        <div>
          <h3 className="text-center font-medium">Done</h3>
          {done.map(t => (
            <div key={t.id} className="bg-gray-100 p-1 my-1" >{t.text}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
