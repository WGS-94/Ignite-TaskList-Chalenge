import clipboardImg from '../../assets/Clipboard.svg';

import './style.css';

export function Transition() {
  return (
    <section className='clipboard-content'>
      <img src={clipboardImg} alt="clipboard" />
      <h1>Você ainda não tem tarefas cadastradas</h1>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </section>
  )
}

