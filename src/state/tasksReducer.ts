import {TasksType, TaskType} from '../App';

type tasksReducerType = removeTaskACType | addTaskACType | changeTaskStatusType | editTaskType | addEmptyType
export const tasksReducer = (state: TasksType, action: tasksReducerType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .filter(e => e.id !== action.payload.taskID)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: [action.payload.newTask, ...state[action.payload.todoListID]]
            }
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(e => e.id === action.payload.taskID ?
                        {...e, isDone: action.payload.isDone} : e)
            }
        }
        case 'EDIT-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(e => e.id === action.payload.taskID ?
                        {...e, title: action.payload.newTitle} : e)
            }
        }
        case 'ADD-EMPTY': {
            return {...state, [action.payload.newID]: []}
        }
        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListID,
            taskID
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListID: string, newTask: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListID,
            newTask
        }
    } as const
}

type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
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

type editTaskType = ReturnType<typeof editTaskAC>
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

type addEmptyType = ReturnType<typeof addEmptyAC>
export const addEmptyAC = (newID: string) => {
    return {
        type: 'ADD-EMPTY',
        payload: {
            newID
        }
    } as const
}