import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { addTodoAsync } from '../redux/todos/services'
import Error from './Error'
import Loading from './Loading'

function Form() {
  const [title,setTitle] = useState("")
  const isLoading = useSelector(state=>state.todos.addNewTodo.isLoading)
  const error = useSelector(state => state.todos.addNewTodo.error)

  const dispatch = useDispatch()

  const handleSubmit = (e)=>{
    if(!title) return
    e.preventDefault()
    dispatch(addTodoAsync({title}))
    setTitle('')
  }


  return (
    <form onSubmit={handleSubmit} style={{display:"flex",alignItems:"center"}}>
    <input
      disabled={isLoading}
      className="new-todo"
      placeholder={error?error:"What needs to be done?"}
      autoFocus
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
    />
    {isLoading && <Loading/>}
    {/* {error && <Error message={error}/>} */}
  </form>
  )
}

export default Form
