import React from 'react'
import styled from "styled-components";
import FormTodo from "../UI/control/FormTodo"
import Title from "../components/title"
const UpdateTodo = ({data, className, onClose}) => { 
  
  return (
    <div className={className} >
      <div className="overlay"></div>
      <div className="form-update">
        <Title title="Cập nhật Kế hoạch"/>
        <FormTodo updateData={data} onClose={onClose}/>
      </div>
    </div>
  )
}

export default styled(UpdateTodo)`
  transition : var(--transition);
  .overlay{
    position : fixed; 
    left: 0 ; 
    top : 0 ;
    right : 0 ;
    bottom : 0; 
    background-color : rgba(0,0,0,0.1);
    z-index : 4000;
  }
  .form-update{
    padding : 2rem;
    width : 80% ;
    border : 1px solid var(--gray);
    background-color : var(--white);
    position : absolute; 
    left : 10% ;
    top : 5%; 
    transform : translate(-50%;-50%);
    box-shadow : var(--box-shadow);
    border-radius : 5px;
    z-index: 4001;    
  }
`
