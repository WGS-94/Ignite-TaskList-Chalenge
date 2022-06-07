import { useState } from 'react'

import { PlusCircle, Trash } from 'phosphor-react';

import './style.css';
import { Transition } from '../Transition';

export function TaskList() {

  return (
    <section className="task-list container">
      <header>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicione uma nova tarefa" 
          />
          <button type="submit" data-testid="add-task-button">
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

      <Transition />

      {/*<main>
        <ul>
          <li>
            <div data-testid="task" >
              <div className='checkbox-container' >
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"></label>
              </div>
              <p>Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.</p>
            </div>

            <button type="button" data-testid="remove-task-button">
              <Trash size={24} />
            </button>
          </li>
        </ul>
      </main>*/}
    </section>
  )
}