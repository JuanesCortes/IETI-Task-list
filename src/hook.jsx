import { useState, useEffect } from 'react';

function useTaskList() {
  const [taskList, setTaskList] = useState([]);

  // carga la lista de tareas desde localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('taskList')) || [];
    setTaskList(storedTasks);
  }, []);

  // guarda la lista de tareas en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  // agrega una nueva tarea a la lista
  function addTask(taskName) {
    if (taskName) {
      setTaskList(prevTaskList => [...prevTaskList, { name: taskName, completed: false }]);
    }
  }

  // elimina una tarea de la lista
  function removeTask(index) {
    setTaskList(prevTaskList => prevTaskList.filter((task, i) => i !== index));
  }

  // actualiza el estado de una tarea (completada o no)
  function updateTask(index, completed) {
    setTaskList(prevTaskList => {
      const updatedList = [...prevTaskList];
      updatedList[index] = { ...updatedList[index], completed };
      return updatedList;
    });
  }

  // retorna las funciones y la lista de tareas
  return { taskList, addTask, removeTask, updateTask };
}

export default useTaskList;