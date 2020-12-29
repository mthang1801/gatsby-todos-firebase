import React, { useState } from "react"
import styled from "styled-components"
import Login from "./Login"
import SignUp from "./Signup"
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  // height: 100vh;
  background-color: var(--gray-dark);
  min-height: 100vh;
  color: var(--white);
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  @media screen and (min-width: 768px) {
    width: 400px;
    flex-direction: row;
    margin: auto;
  }
  & > * {
    margin-bottom: 1rem;
  }
`

const Auth = ({ loginGoogle, loginFacebook, signIn, signUp, status }) => {
  const [formType, setFormType] = useState("login") // ["signin","signup"]
  return (
    <Container>
      {status === "init" && <span>Đang tải trang...</span>}
      {status === "restored" && (
        <div>
          {formType === "login" ? (
            <Login
              loginGoogle={loginGoogle}
              loginFacebook={loginFacebook}
              setFormType={type => setFormType(type)}
              signIn={(email, password) => signIn(email, password)}
            />
          ) : (
            <SignUp
              loginGoogle={loginGoogle}
              loginFacebook={loginFacebook}
              setFormType={type => setFormType(type)}
              signUp={(email, password) => signUp(email, password)}
            />
          )}
        </div>
      )}
    </Container>
  )
}

export default Auth
