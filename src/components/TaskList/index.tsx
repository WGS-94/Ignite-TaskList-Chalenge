import { PlusCircle, Trash } from 'phosphor-react';
import { useState } from 'react';
//import { Transition } from '../Transition';

import './style.css';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

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

    //console.log(newTask)
    
    setNewTaskTitle('');
  }

  function handleToggleTaskDone(id: number) {

    const tasksCompleted = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(tasksCompleted);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const filterTasks = tasks.filter(task => task.id !== id);

    setTasks(filterTasks);
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
            required
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            Criar
            <PlusCircle size={24} />
          </button>
        </div>
      </header>

      <div className="task-created-and-done">
        <div className="task-counter">
          <p>Tarefas criadas</p>
          <span>0</span>
        </div>
        <div className="task-counter">
          <p>Concluídas</p>
          <span>0</span>
        </div>
      </div>

      {/*<Transition />*/}

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
            <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
              <div className='checkbox-container' >
                <input 
                  type="checkbox" 
                  id="checkbox" 
                  checked={task.isComplete}
                  onClick={() => handleToggleTaskDone(task.id)}
                />
                <label htmlFor="checkbox"></label>
                </div>
              <p>{task.title}</p>
            </div>

            <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
              <Trash size={24} />
            </button>
          </li>
          ))}
        </ul>
      </main>
    </section>
  )
}