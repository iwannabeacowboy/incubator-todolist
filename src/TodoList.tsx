import React from 'react';
import {FilterValuesType} from './App';

type TodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList: React.FC<TodoListType> = ({title, tasks, removeTask, changeFilter}) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} readOnly/>
                            {/*- readOnly*/}
                            <span>{t.title}</span>
                            <button onClick={() => removeTask(t.id)}>x</button>
                        </li>)
                })}
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};


