import React from 'react'
import Title from "../components/title"
import Layout from "../components/layout"
import FormAddTodo from "../UI/control/FormAddTodo";

const Add = () => { 
  return (
    <Layout>
      <Title title="Thêm kế hoạch"/>
      <FormAddTodo/>
    </Layout>
  )
}

export default Add
