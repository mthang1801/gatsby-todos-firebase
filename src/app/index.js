import React from 'react'
import {Provider as SessionProvider} from "../session"
import "./styles.css"
const App = ({children}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default App
