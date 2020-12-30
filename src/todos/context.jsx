import React, {useState, createContext, useEffect} from 'react'
import api from "./resources";
import Loader from "../UI/structure/loader/loader.component"
import {useUser} from "../session"
const TodosContext = createContext({});
const TodosProvider = ({children}) => {
  const user = useUser();  
  const [status, setStatus] = useState("pending") //enum = ["pending", "resolved", "rejected"];
  const [todos, setTodos] = useState([]);
  const state = {todos};
  const add = (todo) => api.add(user.uid, todo);
  const remove = todoId => api.remove(user.uid, todoId)
  const update = todo => api.update(user.uid, todo);
  const actions = {add, remove, update}
  useEffect(()=> {
    if(user.id){
      api.onChange(user.id, todos=> {
        setTodos(todos)
        setStatus("resolved")
      } )
    }
    
    return () => setStatus("pending");
  }, [user.id])
  if(status==="pending") return <Loader/>
  return (
    <TodosContext.Provider value={{state,actions}}>
      {children}
    </TodosContext.Provider>
  )
}

export {TodosProvider as Provider, TodosContext as default }
