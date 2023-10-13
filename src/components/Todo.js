import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <div style={{ alignItems: 'center', margin: '0px 50px' }}>
        <h3>Nome da Tarefa: </h3>
        <p>{task.task}</p>
      </div>
      <div style={{ alignItems: 'center', margin: '0px 50px' }}>
        <h3>Status: </h3>
        <p>{task.status}</p>
      </div>
      <div style={{ alignItems: 'center', margin: '0px 50px' }}>
        <h3>Nível de Criticidade: </h3>
        <p>{task.criticity}</p>
      </div>
      <div style={{ alignItems: 'center', margin: '0px 50px' }}>
        <h3>Data: </h3>
        <p>{task.date}</p>
      </div>
      <div style={{ alignItems: 'center', margin: '0px 50px' }}>
        <h3>Editar</h3>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
      </div>
      <div style={{ alignItems: 'center', margin: '10px' }}>
        <h3>Excluir</h3>
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};
