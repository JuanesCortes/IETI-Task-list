import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function addTask() {
  const taskName = document.getElementById('task_name').value.trim();
  if (taskName) {
    const taskMenu = document.getElementById('task_menu');
    const newTask = document.createElement('div');
    newTask.innerHTML = `
      <div>
        <input type="checkbox"></input>
        <label>${taskName}</label>
        <button class="button" onClick="removeTask(this)"> <i>-</i></button>
      </div>
    `;
    taskMenu.appendChild(newTask);
    document.getElementById('task_name').value = '';
  }
}

function removeTask(button) {
  const taskDiv = button.closest('div');
  taskDiv.remove();
}

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Task List</h1>
      <input type="text" id="task_name" placeholder="Add your new todo"></input>
      <form>
        <label htmlFor="Tasks"></label>
        <div id="task_menu">
          {tasks.map((task, index) => (
            <div key={index}>
              <input type="checkbox"></input>
              <label>{task}</label>
              <button className="button" onClick={() => setTasks(tasks.filter((_, i) => i !== index))}>
                <i>-</i>
              </button>
            </div>
          ))}
        </div>
      </form>
      <div className="card">
        <button onClick={() => {
          const taskName = document.getElementById('task_name').value.trim();
          if (taskName) {
            setTasks([...tasks, taskName]);
            document.getElementById('task_name').value = '';
          }
        }}>
          Add new task
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
