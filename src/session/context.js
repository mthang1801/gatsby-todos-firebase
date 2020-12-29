import React, { useState, useEffect, createContext } from "react"
import auth from "./resources"
import Auth from "./pages/Auth"
const SessionContext = createContext({})
const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState("init")
  const state = { user }
  const actions = {
    signInWithGoogle: auth.signInWithGoogle,
    signInWithFacebook: auth.signInWithFacebook,
    signIn : auth.signIn,
    signUp : auth.signUp,
    signOut: auth.signOut,
  }
  useEffect(() => {
    const unsubscribeFromAuth = auth.onChange(async userAuth => {
      // if (userAuth) {
      //   let userRef = await auth.createUserProfile(userAuth)
      //   userRef.onSnapshot(snapshot => {
      //     setUser({
      //       id: userAuth.uid,
      //       ...snapshot.data(),
      //     })
      //   })
      // } else {        
        console.log(userAuth)
        setUser(userAuth)
      // }
        setStatus("restored")
    })
    return () => unsubscribeFromAuth()
  }, [])

  if (!user)
    return (
      <Auth
        loginGoogle={actions.signInWithGoogle}
        loginFacebook={actions.signInWithFacebook}
        signIn={actions.signIn}
        signUp={actions.signUp}
        status={status}
      />
    )
  return (
    <SessionContext.Provider value={{ state, actions }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionProvider as Provider, SessionContext as default }
