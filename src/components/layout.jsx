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
        {openSidebar && <div className="overlay"></div>}
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
  width : 100vw; 
  overflow : auto ;
  position : relative; 
  .sidebar-section{
    position : absolute; 
    left : 0;     
    width : 0;
    height : 100% ; 
    visibility : hidden;   
    opacity : 0;    
    transition : var(--transition)  ;        
  }

  .main-contents-section{ 
    position : relative;
    width : 80vw; 
    margin : 0 auto; 
    padding: 4rem 0 ;                
  }

  .open{
    width : 320px ;
    visibility : visible; 
    opacity : 1;  
    z-index : 2 ;
  }
  .elastic{   
    z-index : 0;   
  }
  .hide{
    opacity : 0 ; 
    visibility : hidden ;     
  }
  .overlay{
    position : fixed; 
    left : 0; 
    right : 0 ;
    top : 0; 
    bottom : 0 ; 
    background : var(--dark);    
    opacity : 0.7;
    z-index : 1 ;
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
    .overlay{
      position : unset;
    }
    .main-contents-section{
      max-width : 600px;
      margin : 0 auto;
    }    
    .elastic{
      width : calc(100% - 320px); 
      margin-left :320px;
    }
  }
  @media screen and (min-width:992px){    
    .main-contents-section{
      width : 90%;
      max-width : unset;    
      margin:0 auto;
    }
    .open{
      width : 25% ; 
    }
    .elastic{     
      width : 75%;  
      margin-left : 25% ;  
    }
  }
`