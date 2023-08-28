import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTodoAsync,removeTodoAsync,  getTodoAsync } from '../redux/todos/services'
import Loading from './Loading'
import Error from './Error'
import { selectFilteredTodos } from '../redux/todos/todosSlice'



function TodoList() {
	const dispatch = useDispatch()
	const filteredTodos = useSelector(selectFilteredTodos)
	const isLoading = useSelector(state=>state.todos.isLoading)
	const error = useSelector(state=>state.todos.error)

	useEffect(()=>{
		dispatch(getTodoAsync())
	},[dispatch])

	const handleToggle = (id,completed) =>{
		dispatch(toggleTodoAsync({id,data:{completed}}))
	}

	const handleDestroy = (id) => {
		if(window.confirm('Are you sure ?')) dispatch(removeTodoAsync(id))
	}

	if(isLoading) return <Loading/>
	
	if(error) return <Error message={error}/>

  return (
        <ul className="todo-list">
			{
				filteredTodos.map(item=>(
				<li key={item.id} className={item.completed ? "completed": ""}>
					<div className="view">
						<input className="toggle" type="checkbox" checked={item.completed} onChange={()=>handleToggle(item.id,!item.completed)} />
						<label>{item.title}</label>
						<button className="destroy" onClick={()=>handleDestroy(item.id)}></button>
					</div>
				</li>
				))
			}

		</ul>
  )
}

export default TodoList
