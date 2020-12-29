import React from 'react'
import styled  from "styled-components"
import {FaFacebookF} from "react-icons/fa"

const Container = styled.button`
  display : flex; 
  align-items :center;
  border: none ; 
  outline : none; 
  background-color : var(--white) ; 
  text-transform : uppercase ; 
  color : #5890FF; 
  cursor : pointer;  
  transition : var(--transition); 
  padding : 0.75rem 1.5rem;  
  border-radius : 5px ; 
  font-weight : 600;
  border : 1px solid #5890FF;
  &:hover{
    background-color :#5890FF;
    color : var(--white);
  }
`
const ButtonLoginGoogle = ({...props}) => {
  return (
    <Container {...props}>
      Đăng nhập <FaFacebookF style={{marginLeft: "0.5rem", fontSize: "1.2em"}}/>
    </Container>
  )
}

export default ButtonLoginGoogle
