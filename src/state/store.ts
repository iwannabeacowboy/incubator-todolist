import {combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todoListsReducer} from './todoLists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)