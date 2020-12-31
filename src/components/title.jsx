import React from 'react'
import styled from "styled-components"
const Title = ({className, title, subtitle}) => {
  return (
    <div className={className}>
      <h1 className="title">{title}</h1>
      <h4 className="subtitle">{subtitle}</h4>
    </div>
  )
}

export default styled(Title)`
  text-align  :center;
  .title{
    font-size : 2em ; 
    letter-spacing : 2px;
    font-weight : 700;
    text-transform : uppercase ;
  }
  .subtitle{
    font-size : 1em;
    letter-spacing : 3px;
    color : var(--gray);
  }
`
