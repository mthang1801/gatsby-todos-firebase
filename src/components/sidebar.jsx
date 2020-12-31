import React from 'react'
import styled from "styled-components";
import Navigation from "./navigation";
import Footer from "./footer"
import {FaChevronLeft} from "react-icons/fa"
const Sidebar = ({className, closeSidebar}) => {
  return (
    <main className={className}>
      <div className="btn-close" onClick={closeSidebar}>
       <FaChevronLeft/> 
      </div>
      <nav className="navbar">
        <Navigation/>
      </nav>    
      <footer>
        <Footer/>  
      </footer>  
    </main>
  )
}

export default styled(Sidebar)`
  background-color : var(--light);
  height : 100% ; 
  box-shadow : 2px 2px 2px 2px rgba(0,0,0,0.1);
  padding : 3rem 2rem ;  
  position : relative;  
  display : flex ; 
  flex-direction : column ;
  .btn-close{
    position : absolute; 
    height : 2rem; 
    width : 2rem ;
    display : flex ; 
    justify-content : center; 
    align-items : center;
    right : 5%;
    top : 3%;
    cursor : pointer;   
    transition : var(--transition);
    border-radius : 50% ;
    &:hover{      
      
      background-color : var(--indigo);
      color : var(--white);
    }  
  }
  .navbar{
    flex : 1 ;
  }
`
