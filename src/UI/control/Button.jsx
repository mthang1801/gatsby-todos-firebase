import React from 'react'
import styled from "styled-components";

const Container = styled.button`
  border: none ; 
  outline : none; 
  background-color : var(--primary) ; 
  text-transform : uppercase ; 
  color : var(--white); 
  cursor : pointer;  
  transition : var(--transition); 
  padding : 0.75rem 1.5rem;  
  border-radius : 5px ; 
  font-weight : 600;
  &:hover{
    background-color :var(--indigo);
    color : var(--white);
  }
`
const Button = ({children, ...props}) => {
  return (
    <Container {...props}>
      {children}
    </Container>
  )
}

export default Button
