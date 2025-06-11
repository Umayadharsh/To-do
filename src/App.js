import React, { useEffect, useState } from 'react';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodolist] = useState([]);

  const fetchTasks = () => { fetch("https://to-do-backend1.onrender.com/tasks").then((data)=> data.json()).then((data)=> setTodolist(data)).catch(err => console.log(err))}
  useEffect (()=> {
        fetchTasks() 
    },[])

  
    
  function addtodo() {
  fetch("https://to-do-backend1.onrender.com/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      createdat: Date.now(),
      task: todo,
      updatedat:Date.now(),
      status:false
    })
  })
    .then(res => res.json())
    .then(data => console.log("Task added:", data))
    .catch(err => console.error(err))
    .then(fetchTasks)
    .then(()=> setTodo(""));
}

async function toggleStatus(id) {
  try {
    // Step 1: Fetch existing task
    const res = await fetch(`https://to-do-backend1.onrender.com/tasks/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch task: ${res.status}`);
    const task = await res.json();

    // Step 2: Create updated task object
    const updatedTask = {
      ...task,
      updatedat: Date.now(),
      status: !task.status
    };

    // Step 3: PUT updated task
    const updateRes = await fetch(`https://to-do-backend1.onrender.com/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask)
    });
    if (!updateRes.ok) throw new Error(`Failed to update task: ${updateRes.status}`);
    const updatedData = await updateRes.json();
    console.log("Task updated:", updatedData);

    // Step 4: Refresh tasks
    fetchTasks();

  } catch (error) {
    console.error("Error toggling task:", error);
    // Optionally: Show user-friendly error toast here
  }
}



  
  function deleteTodo(id) {
  fetch(`https://to-do-backend1.onrender.com/tasks/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => console.log("Task added:", data))
    .catch(err => console.error(err))
    .then(fetchTasks);
}

  return (
    <div className="ca card">
      <h1 className="headingca card">To-Do List</h1>
      <div className="box input-group m-2">
        <input
          type="text"
          className="fo form-control"
          placeholder="Today's Work"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="but btn btn-outline-light"
          type="button"
          id="button-addon2"
          onClick={addtodo}
        >
          ADD
        </button>

         </div>
        

      <ul className="toto-list list-group">
        {todoList.map((item) => (
          <li
            className={`list-group-item d-flex justify-content-between align-items-center ${item.status ? 'text-decoration-line-through text-muted' : 'text-dark'}`}
            key={item.id}
            onClick={() => toggleStatus(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <span>{item.task}</span>
            <button
              className="delete btn btn-outline-danger btn-sm"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(item.id);
              }}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
      
      
    </div>
    
  );
}

export default App;
