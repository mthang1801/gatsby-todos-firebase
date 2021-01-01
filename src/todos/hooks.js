import React , {useContext} from "react";
import TodosContext from "./context"
export const useTodos = () => {
  const {state : {todos}} = useContext(TodosContext);
  return todos 
}

export const useTodoActions = () => {
  const {actions} = useContext(TodosContext);
  return actions
}

export const useDatabase = () => {
  const {database : {database}} = useContext(TodosContext)
  return database
}