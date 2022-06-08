import React, {useCallback} from 'react';
import {TodoList} from './components/TodoList';
import {FullInput} from './components/FullInput';
import {addTodoListAC} from './state/todoLists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './state/store';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [id: string]: TaskType[]
}

function App() {

    const todoLists = useSelector<RootStateType, TodoListType[]>(state => state.todoLists)

    const dispatch = useDispatch()

    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodoListAC(newTitle))
    }, [])

    return (
        <div className="App">

            <FullInput callBack={addTodoList}/>

            {todoLists.map(tl => {
                return (
                    <TodoList key={tl.id} todoList={tl}/>
                )
            })}

        </div>
    );
}

export default App;