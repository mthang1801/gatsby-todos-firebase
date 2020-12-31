import React from 'react'
import styled from "styled-components";
const MenuButton = ({className, ...props}) => {
  return (
    <div className={className} {...props}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default styled(MenuButton)`
  display : flex ; 
  flex-direction : column ; 
  justify-content : space-between ;
  align-items: center;
  width : 2rem;  
  height: 1.5rem;  
  transition :var(--transition);
  cursor : pointer;
  &:hover{
    span {
      background-color : var(--purple);
    }
  }
  span{
    width : 1.5rem;
    height : 3px;
    background-color : var(--indigo);
    transition :var(--transition);
   
  }
`
