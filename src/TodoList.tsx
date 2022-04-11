import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: React.FC<TodoListType> = ({title, tasks, removeTask, addTask, changeFilter}) => {

    const [titleValue, setTitleValue] = useState<string>('');

    const addTaskHandler = () => {
        const trimmedTitle = titleValue.trim();
        if (!!trimmedTitle) {
            addTask(trimmedTitle);
            setTitleValue('');
            debugger
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const onAllClickHandler = () => {
        changeFilter('all')
    }
    const onActiveClickHandler = () => {
        changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        changeFilter('completed')
    }

    const tasksListItems = tasks.map(t => {
        const onClickHandler = () => {
            removeTask(t.id)
        }
        return <li key={t.id}>
            <input type="checkbox" checked={t.isDone} readOnly/>
            {/*- readOnly*/}
            <span>{t.title}</span>
            <button onClick={onClickHandler}>x</button>
        </li>
    })
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text" value={titleValue}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>

            <ul>
                {tasksListItems}
            </ul>

            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};


