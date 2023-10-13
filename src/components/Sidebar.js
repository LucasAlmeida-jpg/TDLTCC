import React from "react";

const Sidebar = ({ isOpen, openModal, filterTodos }) => {
  return (
    <div className="sidebar" style={{ width: isOpen ? "450px" : "0", color: "white", background: "#61dafb", height: "100%", position: "fixed", top: "0", right: "0", overflowX: "hidden", transition: "0.5s", padding: "50px 0px" }}>
      <div>
        <button className="button-inverted" onClick={openModal}>
          Adicionar tarefas na lista
        </button>
      </div>

      <div>
        <select className="todo-btn-select" onChange={(e) => filterTodos(e.target.value)}>
          <option>Filtrar por Data</option>
          <option value="todos">Todos</option>
          <option value="menorData">Menor data</option>
          <option value="maiorData">Maior data</option>
        </select>
      </div>

      <div>
        <select className="todo-btn-select" onChange={(e) => filterTodos(e.target.value)}>
          <option>Filtrar por Status</option>
          <option value="todos">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="progresso">Progresso</option>
          <option value="concluido">Concluído</option>
        </select>
      </div>

      <select className="todo-btn-select" onChange={(e) => filterTodos(e.target.value)}>
        <option>Filtrar por Criticidade</option>
        <option value="todos">Todos</option>
        <option value="tranquilo">Tranquilo</option>
        <option value="normal">Normal</option>
        <option value="importante">Importante</option>
        <option value="extremo">Extremo</option>
      </select>
    </div>
  );
};

export default Sidebar;
