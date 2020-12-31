import React from 'react'
import {Provider as SessionProvider} from "../session"
import {Provider as TodosProvider} from "../todos"
import "./styles.css"
import Loader from "../UI/structure/loader"
const App = ({children}) => {
  if( typeof window === "undefined") return <Loader/>; 
  return (
    <SessionProvider>
      <TodosProvider>
        {children}
      </TodosProvider>      
    </SessionProvider>
  )
}

export default App
