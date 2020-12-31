import {FaHome, FaPlus} from "react-icons/fa"
import  React from "react"
export default [
  {
    path : "/", 
    name : "Bảng điều khiển",
    icon : () => <FaHome/>
  },
  {
    path : "/add",
    name : "Thêm kế hoạch",
    icon : () => <FaPlus/>
  }
]