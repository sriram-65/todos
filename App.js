// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  

  useEffect(() => {
    axios.get('http://localhost:5000/todos/')
      .then(response => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      title: title,
      description: description
    };

    axios.post('http://localhost:5000/todos/add', newTodo)
      .then(res => console.log(res.data));

    setTitle('');
    setDescription('');

    window.location.reload()
  }

  return (
    <div className="App">
      <h1>ToDo App</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <input type="text"
            required
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter Your Title'
          />
        </div>
        <div className="form-group">
          
          <textarea 
            required
            className="form-control"
            value={description}
            placeholder='Entre Your Ideas'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create Todo" className="hello" />
        </div>
      </form>
     
      
      <h2>ToDo List</h2>
      {
        todos.length === 0?"Not Found"
        :
        <ul className="list-group">
        {todos.map(todo => (
          <li key={todo._id} className="list-group-item">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
        

          </li>

        
        ))}
      </ul>
      }
      
    </div>
  );
}

export default App;
