import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useTodoActions } from "../todos"
const Table = ({ todos, className, setUpdate }) => {
  const { remove, updateComplete } = useTodoActions()
  const [deleteAll, setDeleteAll] = useState(false)
  const [dels, setDels] = useState([])   
  useEffect(() => {
    if (dels.length === todos.length) {
      setDeleteAll(true)
    } else {
      setDeleteAll(false)
    }
  }, [dels])
  const handleDeleteAll = e => {
    if (dels.length === todos.length) {
      setDeleteAll(false)
      setDels([])
    } else {
      setDeleteAll(true)
      setDels(todos)
    }
  }
  const handleChangeDeleteItem = todo => {
    setDels(prevState => {
      if (prevState.find(item => item.id === todo.id)) {
        return prevState.filter(item => item.id !== todo.id)
      } else {
        return [...prevState, todo]
      }
    })
  }

  const handleDelete = async () => {    
    // setAlert("");
    try {
      for (let todo of dels) {
        await remove(todo.id)
      }
    } catch (error) {
      console.log(error)
      // setAlert(error.message)
    }
  }

  const handleUpdate = () => {
    if(dels.length===1){
      setUpdate(dels[0]);
      setDels([]);
      setDeleteAll(false);
    }
  }
  if (!todos.length)
    return <h4 className="text-center">Hiện tại bạn chưa có kế hoạch</h4>
  return (
    <div className={className}>     
      <div className={`actions hide ${dels.length && "show"}`}>
        <span className={`update hide warning ${dels.length === 1 && "show"}`} onClick={handleUpdate}>
          Chỉnh sửa
        </span>
        <span className="delete danger" onClick={handleDelete}>
          Xóa
        </span>
      </div>
      <table>
        <thead>
          <tr className="row">
            <th className="w0">
              <input
                type="checkbox"
                onChange={handleDeleteAll}
                checked={deleteAll}
              />
            </th>
            <th className="w2">Tiêu đề</th>
            <th className="w2">Mô tả</th>
            <th className="w2">Thành viên</th>
            <th className="w2">Trạng thái</th>
            <th className="w1">Ngày Bắt đầu</th>
            <th className="w1">Ngày Kết thúc</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id} className="row">
              <td className="w0">
                <input
                  type="checkbox"
                  name="delete-item"
                  checked={!!dels.find(item => item.id === todo.id)}
                  onChange={() => handleChangeDeleteItem(todo)}
                />
              </td>
              <td className="w2">
                {todo.title.length > 50
                  ? todo.title.slice(0, 50) + "..."
                  : todo.title}
              </td>
              <td className="w2">
                {todo.description.length > 50
                  ? todo.description.slice(0, 50) + "..."
                  : todo.description}
              </td>
              <td className="w3">
                {todo.tags.length
                  ? todo.tags.map((tag, index) => (
                      <p key={tag}>
                        <a href={`mailto:${tag}`}>{tag}</a>
                      </p>
                    ))
                  : "---"}
              </td>
              <td className="w2" onClick={() => updateComplete(todo)}>
                {todo.status ? (
                  <span className="status success">Hoàn tất</span>
                ) : (
                  <span className="status indigo">Đang thực hiện</span>
                )}
              </td>
              <td className="w1">
                {new Date(
                  todo.startDate.seconds*1000
                ).toLocaleDateString("en-IN")}
              </td>
              <td className="w1">
                {new Date(todo.endDate.seconds*1000).toLocaleDateString(
                  "en-IN"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default styled(Table)`
  width: 95%;
  margin: 2rem auto;
  overflow: auto;
  position: relative;
  thead,
  tbody {
    overflow: auto;
  }
  thead {
    background-color: var(--dark);
    color: var(--white);
  }

  tr:not(:last-child) {
    border-bottom: 1px solid var(--gray);
  }
  th:not(:last-child),
  td:not(:last-child) {
    margin-right: 1rem;
  }
  tr,
  th,
  td {
    padding: 0.5rem;
  }
  .row {
    display: flex;
    flex-wrap: no-wrap;
    justify-content: space-between;
    align-items: center;
  }
  .w0 {
    width: 5%;
    min-width: 60px;
    text-align: center;
  }
  .w1 {
    width: 10%;
    min-width: 130px;
  }
  .w2 {
    width: 20%;
    min-width: 180px;
  }
  .w3 {
    width: 30%;
    min-width: 220px;
  }
  .delete-all-box {
    display: flex;
    align-items: center;
    button {
      outline: none;
      border: none;
      background-color: transparent;
      font-size: 1em;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }

  .success {
    color: var(--success);
  }
  .indigo {
    color: var(--indigo);
  }
  .warning {
    color: var(--warning);
  }
  .danger {
    color: var(--danger);
  }
  .disabled {
    color: var(--gray);
  }
  .status{
    cursor : pointer;
  }
  .status.success{
    &:hover{
      color : green ; 
    }
  }
  .status.indigo{
    &:hover{
      color : indigo;
    }
  }
  .active {
    cursor: pointer;
    color: inherit;
  }
  input[type="checkbox"] {
    transform: scale(1.2);
  }
  .actions {
    display: flex;
    flex-wrap: no-wrap;
    font-weight: bold;
    margin-left : 1rem;
    span:not(last-child) {
      margin-right: 1rem;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .hide {
    visibility: hidden;
    opacity: 0;
  }
  span.hide {
    width: 0;
    height: 0;
  }
  .show {
    visibility: visible;
    width: auto !important;
    height: auto !important;
    opacity: 1;
  }
`
