import {FilterValuesType, TodoListsType} from '../App';

type todoListReducerType = removeTodoListType | addTodoListType | changeFilterType | editTodoListType
export const todoListReducer = (state: TodoListsType[], action: todoListReducerType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(e => e.id !== action.payload.todolistID)
        }
        case 'ADD-TODOLIST': {
            return [...state, action.payload.newTodoList]
        }
        case 'CHANGE-FILTER': {
            return state.map(e => e.id === action.payload.todoListID ?
                {...e, filter: action.payload.filter} : e)
        }
        case 'EDIT-TODOLIST': {
            return state.map(e => e.id === action.payload.todolistID ?
                {...e, title: action.payload.newTitle} : e)
        }
        default:
            return state
    }
}

type removeTodoListType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}

type addTodoListType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodoList: TodoListsType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodoList
        }
    } as const
}

type changeFilterType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoListID: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todoListID,
            filter
        }
    } as const
}

type editTodoListType = ReturnType<typeof editTodoListAC>
export const editTodoListAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'EDIT-TODOLIST',
        payload: {
            todolistID,
            newTitle
        }
    } as const
}