import React , {useState} from 'react'
import Sidebar from "./sidebar"
import styled from "styled-components";
import MenuButton from "../UI/control/MenuButton"
const Layout = ({children, className}, props) => { 
  console.log(props)
  const [openSidebar, setOpenSidebar] = useState(true);  
  return (
    <div className={className}>
      <section className={`sidebar-section ${openSidebar? "open" : ""}`}>
       <Sidebar closeSidebar={() => setOpenSidebar(false)}/>
      </section>
      <section className={`main-contents-section ${openSidebar ? "elastic" : ""}`}>
        <MenuButton className={`menu-button ${openSidebar ? "hide" : ""}`} onClick={() => setOpenSidebar(true)}/>
        <div className="main-contents">
          {children}
        </div>          
      </section>
      
    </div>
  )
}

export default styled(Layout)`  
  display : flex ; 
  min-height : 100vh;
  with : 100vw; 
  overflow : hidden ;
  .sidebar-section{
    width : 0;
    visibility : hidden;   
    opacity : 0;
    transition : var(--transition)  ;    
  }
  .open{
    width : 320px !important;
    visibility : visible; 
    opacity : 1;  
    z-index : 1 ;
  }
  .hide{
    opacity : 0 ; 
    visibility : hidden ;     
  }
  .elastic{
    // margin-left: 320px;
    float : right ;
    width : calc(100% - 320px);    
  }
  .main-contents-section{
    width : 100% ;
    padding: 4rem 0 ;  
  }
  .main-contents{
    width : 100% ;         
  }
  .menu-button{
    position : fixed; 
    left : 2rem;
    top : 2rem;
    transition : var(--transition);
    transition-delay : var(--transition-delay);
    z-index: 0;
  }
  @media screen and (min-width:768px){
    .main-contents{
      width : 600px;
      margin :auto;
    }
  }
  @media screen and (min-width:992px){    
    .main-contents{
      width : 90%;
      max-width : 1000px;
      margin:auto;
    }
    .open{
      width : 25% ; 
    }
    .elastic{
      // margin-left: 25%;
      width : 75%;    
    }
  }
`