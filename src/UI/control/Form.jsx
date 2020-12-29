import styled from "styled-components"


export const CustomFormContainer = styled.form`
  width : 90%; 
  max-width : 500px ;
  padding : 1.5rem 2.5rem ;
  text-align : center;  
  border: 1px solid #ccc;
  margin : 1rem auto;
  border-radius : 10px;
  box-shadow : 0 3px 6px rgba(0,0,0,0.15);
  display : flex ; 
  flex-direction : column ; 
  align-items : center;    
  color : var(--dark);
  background-color : var(--white);
  @media screen and (max-width: 500px){    
    padding : 1.5rem 2rem;
  };
  @media screen and (min-width: 768px){
    width :600px;
  }
 
`
export const FormHeader = styled.div`
  margin-bottom: 0.7rem;
  width : 100% ;
`

export const FormGroups = styled.div`
  display : flex;
  width : 100%;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  margin : 1rem auto ;

`

export const FormActions = styled.div`
  display : flex ;
  flex-direction : column;
  justify-content :center;
  align-items: center;  
`

export const Title = styled.h2`
  text-transform : uppercase ;  
  font-size : 2em;
`

export const StyledLink = styled.span`
  color : var(--info) ; 
  transition : var(--transition) ;
  cursor : pointer; 
  &:hover{
    color : var(--primary);
  }
`

export const SubTitle = styled.span`
  color : var(--dark);
  font-size : .95em;
`


export const Option = styled.span`
  font-size : .95em;
`

export const FlashForm = styled.div`
  width : 100%;
  display : flex ; 
  margin : 1rem auto;
  justify-content : space-around;
  & > * {
    display : block;
    // width : 48% !important;
  }
  @media screen and (max-width : 500px){    
    flex-direction : column;        
    &> *{
      width : 100% !important;
      margin-bottom : 1rem;
    }
  }
  
`

export const ErrorMessage = styled.div`
  color : red ; 
  margin-bottom : 1rem;
`
