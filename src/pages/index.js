import React, {useState, useEffect, useRef} from "react"
import {useTodos} from "../todos"
import Layout from "../components/layout"
import Title from "../components/title"
import TodosTable from "../components/todosTable"
import UpdateTodo from "../components/updateTodo";
export default function Home() {  
  const todos = useTodos();
  const [updateData, setUpdateData] = useState(null);  
  return <Layout >
    <Title title="Danh sách các kế hoạch" subtitle="Bảng kế hoạch bạn đã liệt kê"/>
    <TodosTable todos={todos} setUpdate={(todo) => setUpdateData(todo)}/>
    {updateData && <UpdateTodo data={updateData} onClose={() => setUpdateData(null)}/>}
  </Layout>
}
