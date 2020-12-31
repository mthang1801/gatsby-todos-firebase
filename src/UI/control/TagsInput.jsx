import React, { useState } from "react"
import styled from "styled-components"
const TagsInput = ({ tags, setTags, className }) => {
  const handleOnKeyUp = e => {    
    if (e.key === "Enter" || e.which === 32) {
      if (e.target.value.trim()) {
        if (
          !tags.find(
            tag =>
              tag.trim().toLowerCase() === e.target.value.trim().toLowerCase()
          )
        ) {
          setTags([...tags, e.target.value])
          e.target.value = ""
        }
      }
    }
  }
  const handleOnBlur = e => {
    if (e.target.value) {
      if (
        !tags.find(
          tag =>
            tag.trim().toLowerCase() === e.target.value.trim().toLowerCase()
        )
      ) {
        setTags([...tags, e.target.value])
        e.target.value = ""
      }
    }
  }
  const handleRemoveTag = tag => {
    setTags(prevState => prevState.filter(tagItem => tagItem !== tag))
  }
  return (
    <div className={className}>
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span
              className="tag-close-icon"
              onClick={() => handleRemoveTag(tag)}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nhập email thành viên, sau đó nhấn Enter"
        onKeyUp={handleOnKeyUp}
        onBlur={handleOnBlur}
      />
    </div>
  )
}

export default styled(TagsInput)`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  width: 100%;
  padding: 0 8px;
  border: 1px solid rgb(214, 216, 218);
  border-radius: 6px;
  &:focus-within {
    border: 2px solid var(--success);
  }
  input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 14px;
    padding: 4px 0 0 0;
    &:focus {
      outline: transparent;
    }
  }

  #tags {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;
  }

  .tag {
    width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 8px;
    font-size: 14px;
    list-style: none;
    border-radius: 6px;
    margin: 0 8px 8px 0;
    background: #0052cc;
    .tag-title {
      margin-top: 3px;
    }
    .tag-close-icon {
      display: block;
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      font-size: 14px;
      margin-left: 8px;
      color: #0052cc;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 567px) {
    .tags-input {
      width: calc(100vw - 32px);
    }
  }
`
