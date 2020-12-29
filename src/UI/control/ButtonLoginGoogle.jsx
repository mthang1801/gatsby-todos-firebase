import React from 'react'
import styled  from "styled-components"
import {FaGoogle} from "react-icons/fa"

const Container = styled.button`
  display : flex; 
  align-items :center;
  border: none ; 
  outline : none; 
  background-color : var(--white); 
  text-transform : uppercase ; 
  color : var(--red); 
  cursor : pointer;  
  transition : var(--transition); 
  padding : 0.75rem 1.5rem;  
  border-radius : 5px ; 
  font-weight : 600;
  border : 1px solid var(--red);
  &:hover{
    background-color : var(--red);
    color : var(--white);
  }
`
const ButtonLoginGoogle = ({...props}) => {
  return (
    <Container {...props}>
      Đăng nhập <FaGoogle style={{marginLeft: "0.5rem", fontSize: "1.2em"}}/>
    </Container>
  )
}

export default ButtonLoginGoogle
