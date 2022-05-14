import {FilterValuesType, TodoListsType} from '../App';

type TodoListReducerType = RemoveTodoListAType | AddTodoListAType | ChangeFilterAType | EditTodoListAType
export const todoListReducer = (state: TodoListsType[], action: TodoListReducerType) => {
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

type RemoveTodoListAType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}

type AddTodoListAType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodoList: TodoListsType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodoList
        }
    } as const
}

type ChangeFilterAType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoListID: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todoListID,
            filter
        }
    } as const
}

type EditTodoListAType = ReturnType<typeof editTodoListAC>
export const editTodoListAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'EDIT-TODOLIST',
        payload: {
            todolistID,
            newTitle
        }
    } as const
}