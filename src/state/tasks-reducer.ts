import {TasksType} from '../App';
import {AddTodoListAType, RemoveTodoListAType} from './todoLists-reducer';
import {v1} from 'uuid';

const initialState: TasksType = {}

type TasksReducerAType =
    RemoveTaskAType
    | AddTaskAType
    | ChangeTaskStatusAType
    | EditTaskAType
    | AddTodoListAType
    | RemoveTodoListAType

export const tasksReducer = (state: TasksType = initialState, action: TasksReducerAType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .filter(el => el.id !== action.payload.taskID)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: [{
                    id: v1(),
                    title: action.payload.newTitle,
                    isDone: false
                }, ...state[action.payload.todoListID]]
            }
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(el => el.id === action.payload.taskID ?
                        {...el, isDone: action.payload.isDone} : el)
            }
        }
        case 'EDIT-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(el => el.id === action.payload.taskID ?
                        {...el, title: action.payload.newTitle} : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todoListID]: []}
        }
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.payload.todoListID]
            return copyState
        default:
            return state
    }
}

type RemoveTaskAType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListID,
            taskID
        }
    } as const
}

type AddTaskAType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListID,
            newTitle
        }
    } as const
}

type ChangeTaskStatusAType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todoListID,
            taskID,
            isDone
        }
    } as const
}

type EditTaskAType = ReturnType<typeof editTaskAC>
export const editTaskAC = (todoListID: string, taskID: string, newTitle: string) => {
    return {
        type: 'EDIT-TASK',
        payload: {
            todoListID,
            taskID,
            newTitle
        }
    } as const
}