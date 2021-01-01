import React, { useState, useEffect } from "react"
import styled from "styled-components"
import TagsInput from "./TagsInput"
import Button from "./Button"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useTodoActions } from "../../todos"
import Loader from "../structure/loader"
import { navigate } from "gatsby"
const FormAddTodo = ({ updateData, className, onClose }) => {
  const [data, setData] = useState({
    tags: [],
    title: "",
    description: "",
    todoType: "private", //["private", "group"]
    content: "",
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 84600 * 1000 * 7), // 7days})
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { add, update } = useTodoActions(); 
  const handleChange = e => {
    let name = e.target.name
    let value = e.target.value
    setData(prevState => ({ ...prevState, [name]: value }))
  }
  useEffect(() => {
    let _render = true
    if (_render) {
      if (loading === false ) {
        setData({
          tags: [],
          title: "",
          description: "",
          todoType: "private", //["private", "group"]
          content: "",
          status: false,
          startDate: new Date(),
          endDate: new Date(new Date().getTime() + 84600 * 1000 * 7), // 7days})
        })
      }
    }
    return () => {
      _render = false ;
      setLoading(false);
    }
  }, [loading])
  useEffect(() => {
    let _render = true;
    if(_render){
      if(updateData){          
        updateData.startDate =   new Date(updateData.startDate.seconds*1000)
        updateData.endDate = new Date(updateData.endDate.seconds*1000)  
        setData(updateData)
      }
    }
    return () => _render = false;
  }, [updateData])
  const handleSubmit = async e => {
    e.stopPropagation()
    e.preventDefault()
    setLoading(true)
    if(updateData){
      await update(data);      
      setLoading(false);
      onClose()
      return;
    }
    setError("")
    try {
      await add(data)
      navigate("/")
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }
  
  return (
    <form className={className} onSubmit={e => e.preventDefault()}>
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label htmlFor="title">Tiêu đề (tên công việc): </label>
        <input
          className="form-control"
          name="title"
          id="title"
          value={data.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="desc">Mô tả công việc: </label>
        <input
          className="form-control"
          name="description"
          id="description"
          value={data.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-inline">
        <label>Hình thức hoạt động</label>
        <div className="form-check-list">
          <div className="form-inline-group">
            <input
              type="radio"
              name="todoType"
              id="private"
              className="form-check"
              value="private"
              checked={data.todoType === "private"}
              onChange={handleChange}
            />
            <label htmlFor="private">Cá nhân</label>
          </div>
          <div className="form-inline-group">
            <input
              type="radio"
              name="todoType"
              id="group"
              className="form-check"
              value="group"
              checked={data.todoType === "group"}
              onChange={handleChange}
            />
            <label htmlFor="group">Nhóm</label>
          </div>
        </div>
      </div>
      <div
        className={`form-group hide ${data.todoType === "group" ? "show" : ""}`}
      >
        <label html="members-list">Thành viên nhóm: </label>
        <TagsInput
          tags={data.tags}
          setTags={data => setData(prevState => ({ ...prevState, tags: data }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Nhật ký :</label>
        <textarea
          type="text"
          placeholder="Quá trình thực hiện công việc..."
          id="content"
          name="content"
          rows="5"
          value={data.content}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="start-date">Ngày bắt đầu: </label>
        <DatePicker
          selected={data.startDate || new  Date()}
          onChange={date =>
            setData(prevState => ({ ...prevState, startDate: date }))
          }
          dateFormat="dd/MM/yyyy"
          className="date-picker"
        />
      </div>
      <div className="form-group">
        <label htmlFor="end-date">Ngày dự kiến hoàn thành: </label>
        <DatePicker
          selected={data.endDate || new Date()}
          onChange={date =>
            setData(prevState => ({ ...prevState, endDate: date }))
          }
          dateFormat="dd/MM/yyyy"
          className="date-picker"
        />
      </div>
      <div className="text-center">
        <Button type="button" onClick={handleSubmit}>
          {updateData ?"Lưu thay đổi" : "Tạo mới"}
        </Button>
      </div>
    </form>
  )
}

export default styled(FormAddTodo)`
  width: 90%;
  margin: 2rem auto;
  input[type="date"] {
    font-family: "Roboto", sans-serif;
  }
  .error {
    color: var(--danger);
  }
  .react-datepicker-wrapper {
    input {
      width: 100%;
      padding: 0.5rem;
      outline: none;
      border-radius: 3px;
      border: 1px solid var(--gray);
      &:focus {
        border: 2px solid var(--success);
      }
    }
  }
  .hide {
    visibility: hidden;
    opacity: 0;
    transition: var(--transition);
    height: 0;
  }
  .show {
    visibility: visible;
    height: auto;
    opacity: 1;
  }
  textarea {
    padding: 1rem;
    font-family: "Roboto", sans-serif;
    font-size: 1em;
    resize: none;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }
  label {
    font-size: 0.95em;
  }
  .form-control {
    width: 100%;
    padding: 0.5rem;
    outline: none;
    border-radius: 3px;
    border: 1px solid var(--gray);
    &:focus {
      border: 2px solid var(--success);
    }
  }
  .form-inline {
    display: flex;
    justify-content: flex-start;
    label {
      flex: 30%;
    }
    .form-check-list {
      flex: 70%;
    }
  }
  .form-check {
    transform: scale(1.2);
    margin-right: 0.5rem;
    &:checked {
      transform: scale(1.2);
    }
  }
  .form-inline-group {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }

  @media screen and (min-width: 768px) {
    max-width: 600px;
  }
`
