import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import Sidebar from "./Sidebar";


let globalTodos = []

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Pendente");
  const [selectedCriticity, setSelectedCriticity] = useState("Tranquilo");
  const [selectedDate, setSelectedDate] = useState("");
  const [filters, setFilters] = useState({
    dateFilter: "Todos",
    statusFilter: "Todos",
    criticityFilter: "Todos",
  });

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
}, []);

  const addTodo = () => {
    const newTodo = {
      id: uuidv4(),
      task: selectedTask,
      status: selectedStatus,
      criticity: selectedCriticity,
      date: selectedDate,
      completed: false,
      isEditing: false,
    };

    setTodos([...todos, newTodo]);
    globalTodos = [...todos, newTodo];
    localStorage.setItem('todos', JSON.stringify(globalTodos));
    setIsModalOpen(false);
    setSelectedTask("");
    setSelectedStatus("Pendente");
    setSelectedCriticity("Tranquilo");
    setSelectedDate("");
  };

  const deleteTodo = (id) => {
    const filter = todos.filter((todo) => todo.id !== id)
    setTodos(filter)
    globalTodos = filter
    localStorage.setItem('todos', JSON.stringify(globalTodos));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const applyFilters = (filterValue) => {
    
    let filteredTodos = [...globalTodos];
    
      console.log(filteredTodos);
      if(filterValue === "todos") {
        setTodos(globalTodos)
        return 
      }
      if (filterValue === "menorData") {
        filteredTodos = filteredTodos.sort((a, b) => new Date(a.date) -  new Date(b.date));
      } else if (filterValue === "maiorData") {
        filteredTodos = filteredTodos.sort((a, b) => new Date(b.date) -  new Date(a.date));
      } else if (filterValue === "pendente") {
        filteredTodos = filteredTodos.filter((todo) => todo.status === "Pendente");
      } else if (filterValue === "progresso") {
        filteredTodos = filteredTodos.filter((todo) => todo.status === "Em progresso");
      } else if (filterValue === "concluido") {
        filteredTodos = filteredTodos.filter((todo) => todo.status === "Concluido");
      } else if (filterValue === "tranquilo") {
        filteredTodos = filteredTodos.filter((todo) => todo.criticity === "Tranquilo");
      } else if (filterValue === "normal") {
        filteredTodos = filteredTodos.filter((todo) => todo.criticity === "Normal");
      } else if (filterValue === "importante") {
        filteredTodos = filteredTodos.filter((todo) => todo.criticity === "Importante");
      } else if (filterValue === "extremo") {
        filteredTodos = filteredTodos.filter((todo) => todo.criticity === "Extremo");
      }
      console.log(filteredTodos);
    setTodos(filteredTodos);
  };

  return (
    <div className="TodoWrapper">
      <div>
        <h1>TO DO LIST</h1>
      </div>
      <img className="logo-react" src="/logo512.png" alt="React Logo" />
      <div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="todo-btn"
        >
          Menu
        </button>
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        openModal={() => setIsModalOpen(true)}
        filterTodos={applyFilters}
        setFilters={setFilters}
        filters={filters}
      />

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div>
              <input
                type="text"
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                placeholder="Digite sua tarefa"
              />
            </div>
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="Pendente">Pendente</option>
                <option value="Em progresso">Em progresso</option>
                <option value="Concluido">Concluido</option>
              </select>
            </div>
            <div>
              <select
                value={selectedCriticity}
                onChange={(e) => setSelectedCriticity(e.target.value)}
              >
                <option value="Tranquilo">Tranquilo</option>
                <option value="Normal">Normal</option>
                <option value="Importante">Importante</option>
                <option value="Extremo">Extremo</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                placeholder="Digite a data (dd/mm/aaaa)"
              />
            </div>
            <div className="buttons-container" style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="button-inverted" onClick={addTodo}>Adicionar</button>
              <button className="button-inverted" onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
