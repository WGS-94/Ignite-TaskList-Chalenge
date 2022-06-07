import React from 'react';
import clipboardImg from '../../assets/Clipboard.svg';

import './style.css';

export function Transition() {
  return (
    <main>
      <img src={clipboardImg} alt="clipboard" />
      <h1>Você ainda não tem tarefas cadastradas</h1>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </main>
  )
}

