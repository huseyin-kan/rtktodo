import { createSlice } from "@reduxjs/toolkit";
import { addTodoAsync, getTodoAsync, removeTodoAsync, toggleTodoAsync } from "./services";




export const todosSlice = createSlice({
    name:'todos',
    initialState:{
        items:[],
        isLoading: false,
        error:null,
        activeFilter:localStorage.getItem('activeFilter'),
        addNewTodo:{
            isLoading:false,
            error:null
        }
    },
    reducers:{
        changeActiveFilter:(state, action) => {
            state.activeFilter = action.payload
        },
        clearCompleted:(state, action) => {
            const filtered = state.items.filter(item => item.completed=== false)
            state.items = filtered
        }
    },
    extraReducers: {
        //get todo
        [getTodoAsync.pending]:(state, action) => {
            state.isLoading = true
        },
        [getTodoAsync.fulfilled]:(state, action) =>{
            state.items = action.payload
            state.isLoading = false
        },
        [getTodoAsync.rejected]:(state,action) => {
            state.isLoading = false
            state.error = action.error.message
        },
        //add todo
        [addTodoAsync.pending]:(state,action) => {
            state.addNewTodo.isLoading = true
        },
        [addTodoAsync.rejected]:(state,action) => {
            state.addNewTodo.isLoading = false
            state.addNewTodo.error = action.error.message
        },
        [addTodoAsync.fulfilled]:(state,action) => {
            state.addNewTodo.isLoading = false
            state.items.push(action.payload)
        },
        // toggle todo
        [toggleTodoAsync.fulfilled]:(state,action) => {
            const {id,completed} = action.payload
            const index = state.items.findIndex(item=>item.id === id)
            state.items[index].completed =completed
        },
        // remove todo
        [removeTodoAsync.fulfilled]:(state,action) => {
            const id = action.payload
            const index = state.items.findIndex(item=>item.id===id)
            state.items.splice(index,1)
        }   
    }
})

export const selectTodos = (state) => state.todos.items
export const selectFilteredTodos = (state) =>{
    if(state.todos.activeFilter==='all') return state.todos.items

    return state.todos.items.filter((todo) =>
        state.todos.activeFilter === 'active' ? todo.completed === false :todo.completed === true
    )
}


export const {changeActiveFilter, clearCompleted} = todosSlice.actions
export default todosSlice.reducer