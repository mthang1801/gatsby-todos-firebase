import React, {useState, createContext, useEffect} from 'react'
import api from "./resources";
import Loader from "../UI/structure/loader"
import {useUser} from "../session"
const TodosContext = createContext({});
const TodosProvider = ({children}) => {
  const user = useUser();  
  const [status, setStatus] = useState("pending") //enum = ["pending", "resolved", "rejected"];
  const [todos, setTodos] = useState([]);
  const state = {todos};
  const add = (todo) => api.add(user.id, todo);
  const remove = todoId => api.remove(user.id, todoId)
  const update = todo => api.update(user.id, todo);
  const updateComplete = todo => api.updateComplete(user.id, todo);
  const actions = {add, remove, update, updateComplete}
  const database = {database : api.database}
  useEffect(()=> {      
    const unsubscribe = api.onChange(user.id, todos => {
      setTodos(todos);
      setStatus("resolved");
    })
    return () => unsubscribe();
  }, [user.id])  
  
  if(status==="pending") return <Loader/>
  return (
    <TodosContext.Provider value={{state,actions, database}}>
      {children}
    </TodosContext.Provider>
  )
}

export {TodosProvider as Provider, TodosContext as default }
