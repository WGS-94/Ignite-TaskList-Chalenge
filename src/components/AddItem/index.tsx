import { useState, KeyboardEvent } from 'react';

import './style.css';

type AddItemProps = {
  onEnter: (taskName: string) => void
}

export default function AddItem({ onEnter }: AddItemProps) {

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleKeyUp = (e: KeyboardEvent) => {
    if(e.code === 'Enter' && newTaskTitle !== '') {
        onEnter(newTaskTitle);
        setNewTaskTitle('');
    }
}

  return (
    <header>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicione uma nova tarefa" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            onKeyUp={handleKeyUp}
          />
        </div>
      </header>
  );
}