import React from 'react';
import { Agenda } from '../features/Agenda';
import { KanbanBoard } from '../features/KanbanBoard';
import { Journal } from '../features/Journal';
import { AIAssistant } from '../features/AIAssistant';
import { Productivity } from '../features/Productivity';

export function Dashboard() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Mindful Motion Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Agenda />
        <AIAssistant />
        <KanbanBoard />
        <Journal />
        <Productivity />
      </div>
    </div>
  );
}
