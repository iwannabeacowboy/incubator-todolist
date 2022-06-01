import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

type TodoListReducerAType = RemoveTodoListAType | AddTodoListAType | ChangeFilterAType | EditTodoListAType

export const todoListReducer = (state: TodoListType[], action: TodoListReducerAType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todoListID)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.todoListID, title: action.payload.newTitle, filter: 'all'}]
        }
        case 'CHANGE-FILTER': {
            return state.map(el => el.id === action.payload.todoListID ?
                {...el, filter: action.payload.filter} : el)
        }
        case 'EDIT-TODOLIST': {
            return state.map(el => el.id === action.payload.todoListID ?
                {...el, title: action.payload.newTitle} : el)
        }
        default:
            return state
    }
}

export type RemoveTodoListAType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListID
        }
    } as const
}

export type AddTodoListAType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todoListID: v1(),
            newTitle
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
export const editTodoListAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'EDIT-TODOLIST',
        payload: {
            todoListID,
            newTitle
        }
    } as const
}