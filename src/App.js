
import React,{useState} from "react";
import { FaPlus, FaTrash, FaCheck, FaEdit } from 'react-icons/fa';
import './style.css'


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [editIndex, setEditIndex] = useState(null)
 const updateText =(value)=>{
      setTodoText(value)

 }
const addTodo =()=>{
   if(todoText.trim()==0){
    setErrorMessage('Input Field Is Empty!!')
   }else{
      setTodos([
         
         {id:todoText, value:todoText.trim()},...todos
        ])
        setTodoText('')
        setErrorMessage('')
   }
  
}
 const removeTodo =(index)=>{
todos.splice(index,1)
setTodos([
   ...todos
])
 }

 const taskCompleted=(index)=>{
   const updatedTodos = [...todos];
   if(updatedTodos[index].style ==null){
      updatedTodos[index].style = { textDecoration: 'line-through', color: 'gray' };
   }else{
      updatedTodos[index].style =null;
   }
   

   // Update the state
   setTodos(updatedTodos);
 }
 const editTask=(index,value)=>{
   setTodoText(value)
   setEditIndex(index)
 }
 const saveEditedTask =(ind)=>{
   if(ind !==null){
    if(todoText.trim()==0){
      setErrorMessage('input field is empty!')
     }else{
      const updatedArray = [...todos]
      updatedArray[ind].value=todoText.trim()
      console.log('updatedArray =',updatedArray);
      setTodos([
         ...updatedArray
      ])
      setEditIndex(null)
      setTodoText('')
    }
   }
   
 }
 return (
  <div className="container">
    <header className="header">
      <h1 className="title">TO DO LIST</h1>
    </header>

    <div className="inputContainer">
      <input
        type="text"
        id="todoInput"
        value={todoText}
        placeholder="Add Todo"
        onChange={(e) => updateText(e.target.value)}
        className="inputField"
      />
      <button
        onClick={() => (editIndex !== null ? saveEditedTask(editIndex) : addTodo())}
        className="addButton"
      >
        <FaPlus />
      </button>
    </div>
    <div>
      <p className="errorMessage">{errorMessage}</p>
    </div>

    <div> 
      { 
      todos.map((todo, index) => (
        <div key={todo.id} className={`todoItem ${todo.style ? 'todoItemCompleted' : ''}`}>
          <div className="flex-1" id={index}>
            {todo.value}
          </div>
          <button className="button editButton" onClick={() => editTask(index, todo.value)}>
            <FaEdit />
          </button>
          <button className="button completeButton" onClick={() => taskCompleted(index)}>
            <FaCheck />
          </button>
          <button className="button removeButton" onClick={() => removeTodo(index)}>
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  </div>
);

};

export default Todo;
