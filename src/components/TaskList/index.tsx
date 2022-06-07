import { useState, KeyboardEvent } from 'react';
import { PlusCircle, Trash } from 'phosphor-react';
import { Transition } from '../Transition';

import './style.css';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

interface Props {
  onEnter: (newTaskTitle: string) => void
}

export function TaskList({ onEnter }: Props) {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [countTask, setCountTask]= useState(0);
  const [countTaskDone, setCountTaskDone]= useState(0);

  const IncrementTaskByCreate = () => { setCountTask(countTask + 1)};
  const DecreaseTaskByRemove = () => { setCountTask(countTask - 1)};

  const handleKeyUp = (e: KeyboardEvent) => {
    if(e.code === 'Enter' && newTaskTitle !== '') {
        onEnter(newTaskTitle);
        setNewTaskTitle('');
    }
}

  function handleCreateNewTask() {
    
    if (!newTaskTitle || /^\s*$/.test(newTaskTitle)) {
      return;
    }

    const newTask = {
      id: Math.floor(Math.random() * 1000),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(oldState => [...oldState, newTask]);
    
    setNewTaskTitle('');
    IncrementTaskByCreate();
  }

  function handleToggleTaskDone(id: number) {

    const tasksCompleted = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    for(let i in tasksCompleted) {
      if (tasksCompleted[i].id === id && tasksCompleted[i].isComplete === true) {
        setCountTaskDone(countTaskDone + 1)
      }else if (tasksCompleted[i].id === id && tasksCompleted[i].isComplete === false) {
        setCountTaskDone(countTaskDone - 1)
      }
    }

    setTasks(tasksCompleted);
    
  }

  function handleRemoveTask(id: number) {

    const filterTasks = tasks.filter(task => task.id !== id);

    setTasks(filterTasks);
    DecreaseTaskByRemove()
    setCountTaskDone(countTaskDone - 1);
  }

  return (
    <section className="task-list container">
      <header>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicione uma nova tarefa" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            onKeyUp={handleKeyUp}
            required
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            Criar
            <PlusCircle size={24} />
          </button>
        </div>
      </header>

      <div className="task-created-and-done">
        <div className="created-task-counter">
          <p>Tarefas criadas</p>
          <span>{countTask}</span>
        </div>
        <div className="done-task-counter">
          <p>Concluídas</p>
          <span>{countTaskDone} de {countTask}</span>
        </div>
      </div>

    {tasks.length > 0 ?
      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
            <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={task.isComplete}
                  onClick={() => handleToggleTaskDone(task.id)}
                />
                <span className="checkmark"></span>
              </label>
              <p>{task.title}</p>
            </div>

            <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
              <Trash size={24} />
            </button>
          </li>
          ))}
        </ul>
      </main>
      : (
        <Transition />
      )}
    </section>
  )
}