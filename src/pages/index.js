import React from "react"
import {useTodos} from "../todos"
import Layout from "../components/layout"
import Title from "../components/title"
export default function Home() {  
  const todos = useTodos(); 
  return <Layout >
    <Title title="Danh sách các kế hoạch" subtitle="Bảng kế hoạch bạn đã liệt kê"/>
  </Layout>
}
