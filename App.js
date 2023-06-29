import React from 'react';
import { useState,useEffect } from 'react';
const API_BASE = "http://localhost:2310";
function App(){
  const [todos,setTodos] = useState([]);
  const [popupActive,setpopupActive] = useState(false);
  const [newTodo,setNewTodo] = useState("");
  useEffect(()=>{
    GetTodos();
    console.log(todos);
  })
  const GetTodos=()=>{
    fetch(API_BASE + "/todos").then(res=>res.json())
    .then(data=>setTodos(data))
    .catch(err=>console.error("Error:",err))
  }
  const completeTodo = async(id) =>{
    const data = await fetch(API_BASE+"/todos/complete/"+id).then(res=>res.json())
  setTodos(todos=>todos.map(todo=>{
    if(todo._id === data._id){
      todo.completed = data.completed;
    }
    return todo;
  }))  
  }
  const deleteTodo = async(id)=>{
    const data =await fetch(API_BASE+"/todos/delete/"+id,{method:"DELETE"}).then(res=>res.json());
    setTodos(todos=>todos.filter(todo=>todo._id!==data._id));
  }
  const addTodo = async(id)=>{
    const data = await fetch(API_BASE+"/todos/new/",{method:"POST",
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify({
        text:newTodo
        })
    }).then(res=>res.json());
    setTodos([...todos,data]);
    setpopupActive(false);
    setNewTodo("");
  }
  return(

    <div className='App'>
      <h1>Welcome, Janath Shiv K S </h1>
      <h4>Your Tasks</h4>
      <div className='todos'>
        {todos.map(todo=>(
          <div className={(todo.completed?"is-complete":"todo")} 
          key={todo._id} onClick={()=>completeTodo(todo._id)}>
              <div className='checkbox'></div>
              <div className='text'>{todo.text}</div>
              <div className='delete-todo' onClick={()=>deleteTodo(todo._id)}>x</div>
          </div>
          
        ))}
        
      </div>
      <div className='addPopup' onClick={()=>setpopupActive(true)}>+</div>
      {popupActive?(
        <div className='popup'>
          <div className='closePopup' onClick={()=>setpopupActive(false)}>x</div>
          <div className='content'>
            <h3>Add Task</h3>
            <input type ="text" className='add-todo-input' onChange={e=>setNewTodo(e.target.value)} value={newTodo}/><br></br><br></br>
            <div className='button' onClick={addTodo}>Create new</div>
          </div>
        </div>
      ):''}
    </div>
  )
}

export default App;