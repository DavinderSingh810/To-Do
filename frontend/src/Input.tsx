


import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todolistState, todoListFilterState } from './Store/atom';
import { filterTodoselector } from './Store/selector';
import axios from 'axios';

interface TodoItem {
  id: string;
  text: string;
  isComplete: boolean;
  isImportant: boolean; 
}

function Input() {
  const setTodoList = useSetRecoilState<TodoItem[]>(todolistState);
  const filteredTodos = useRecoilValue(filterTodoselector);
  
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:3000/api/todos');
      setTodoList(response.data);
    };
    fetchTodos();
  }, [setTodoList]);

  const [inputValue, setInputValue] = useState<string>('');
  const setFilter = useSetRecoilState<string>(todoListFilterState);
  
  const addTodo = async () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: generateUniqueId(),
        text: inputValue,
        isComplete: false,
        isImportant: false,
      };

      try {
        const response = await axios.post('http://localhost:3000/api/todos', newTodo);
        console.log(response.data)
        setTodoList((oldTodoList) => [...oldTodoList, response.data]);
        setInputValue(''); 
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const toggleComplete = async (id: string) => {
    console.log(id)
    
    const todoToUpdate = filteredTodos.find(todo => todo.id === id);
    if (todoToUpdate) {
      const updatedTodo = { ...todoToUpdate, isComplete: !todoToUpdate.isComplete };

      try {
        await axios.put(`http://localhost:3000/api/todos/${id}`, updatedTodo);
        setTodoList((oldTodoList) =>
          oldTodoList.map((todo) =>
            todo.id === id ? updatedTodo : todo
          )
        );
      } catch (error) {
        console.error('Error updating todo in the database:', error);
      }
    }
   
  };

  const toggleImportance = async (id: string) => {
    const todoToUpdate = filteredTodos.find(todo => todo.id === id);
    if (todoToUpdate) {
        const updatedTodo = { ...todoToUpdate, isImportant: !todoToUpdate.isImportant };

        try {
            await axios.put(`http://localhost:3000/api/todos/${id}`, updatedTodo);
            setTodoList((oldTodoList) =>
                oldTodoList.map((todo) =>
                    todo.id === id ? updatedTodo : todo
                )
            );
        } catch (error) {
            console.error('Error updating todo importance in the database:', error);
        }
    }
};

// const handledel= async (id:string)=>{
//   // const deltodo = {...filteredTodos.find(todo => todo.id ===id)}
//   const deltodo = filteredTodos.find(todo => todo.id === id);

//   if(deltodo){
//     try {
//        await axios.delete(`http://localhost:3000/api/todos/${id}`)
//        setTodoList((oldTodoList) =>
//         oldTodoList.map((todo) =>
//             todo.id === id ? deltodo : todo
//         )
//     );
// } catch (error) {
//     console.error('Error updating todo importance in the database:', error);
// }
//   }
// }


const handledel = async (id: string) => {
  const deltodo = filteredTodos.find(todo => todo.id === id);

  if (deltodo) {
      try {
          await axios.delete(`http://localhost:3000/api/todos/${id}`);
         
          setTodoList((oldTodoList) => oldTodoList.filter(todo => todo.id !== id));
      } catch (error) {
          console.error('Error deleting todo:', error);
      }
  }
};



  const generateUniqueId = (): string => {

    const uid= `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log(uid);
    return uid
  };


  const today = new Date();
  const date = today.getDate();

  return (
    <div className='font-sans h-screen flex flex-col'>
      <section className="bg-cyan-800 p-9 rounded-br-full">
        <h1 className='text-white text-4xl p-2'>Todo - List</h1>
      </section>
      <div className="flex-grow w-full max-w-md mx-auto p-11 bg-slate-100 rounded-lg shadow-md mt-5 mb-6">
        <h1 className="text-4xl mb-4 text-cyan-800 mb-10">Today: {date} October</h1>
        <div className="mb-4 flex items-center">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="border-0 rounded-full p-3 w-full h-7"
            placeholder="Add a new todo"
          />
          <button
            type='button'
            onClick={addTodo}
            className="ml-1 w-20 bg-blue-400 text-white rounded-3xl p-3 hover:bg-blue-600 border-0"
          >
            + Add
          </button>
        </div>

        <ul className="list-disc list-inside p-2">
       
          {filteredTodos.map((todo) => (
            
            <li key={todo.id} className="flex items-center mb-2 p-0">
              <span className='class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300  font-medium rounded-lg text-xl px-3 me-2 m-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ">Red</button>' onClick={()=>handledel(todo.id)}>-</span>
              <span className={`text-lg font-semibold ${todo.isComplete ? 'line-through' : ''}`}>
                {todo.text}
              </span>
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => toggleComplete(todo.id)}
                className={`ml-auto size-6 border `}
              />
              <span
                onClick={() => toggleImportance(todo.id)}
                className={`ml-2 cursor-pointer ${todo.isImportant ? 'text-red-500' : 'text-gray-500'}`}
              >
                {todo.isImportant ? 'Important' : 'Not Important'}
              </span>
              
            </li>
          ))}
         
        </ul>

        

        <p className="mb-4">
          <label className="block mb-1 text-3xl font-semibold">Filter:</label>
          <select
            onChange={(e) => setFilter(e.target.value)}
            defaultValue="All"
            className="border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 p-2 w-full mt-3 text-lg bg-white transition duration-200 ease-in-out hover:bg-gray-50"
          >
            <option className='hover:bg-gray-300 transition duration-200 ease-in-out' value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
            <option value="Important">Important</option>
          </select>
        </p>
      </div>
    </div>
  );
}

export default Input;

