import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TodoListType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todoListID: string, taskID: string) => void
    addTask: (todoListID: string, title: string) => void
    changeFilter: (todoListID: string, filter: FilterValuesType) => void
    changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    removeTodoList: (todoListID: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: React.FC<TodoListType> = ({
                                                     todoListID,
                                                     title,
                                                     tasks,
                                                     filter,
                                                     removeTask,
                                                     addTask,
                                                     changeFilter,
                                                     changeTaskStatus,
                                                     removeTodoList
                                                 }) => {

    const [error, setError] = useState<boolean>(false)

    const [titleValue, setTitleValue] = useState<string>('');

    const addTaskHandler = () => {
        const trimmedTitle = titleValue.trim();
        if (!!trimmedTitle) {
            addTask(todoListID, trimmedTitle);
            setTitleValue('');
        } else {
            setError(true)
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value);
        if (error) setError(false)
    }

    const onClickFilterHandler = (filter: FilterValuesType) => {
        return () => changeFilter(todoListID, filter)
    }

    const removeTodoListHandler = () => {
        removeTodoList(todoListID)
    }

    const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        let tasksForRender: Array<TaskType>
        switch (filter) {
            case 'active':
                tasksForRender = tasks.filter((t) => !t.isDone)
                break
            case 'completed':
                tasksForRender = tasks.filter((t) => t.isDone)
                break
            default:
                tasksForRender = tasks
        }
        return tasksForRender
    }
    const tasksForRender = getTasksForRender(tasks, filter)

    const tasksListItems = tasksForRender.length
        ? tasksForRender.map(t => {
            const onClickHandler = () => removeTask(todoListID, t.id)
            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                return (
                    changeTaskStatus(todoListID, t.id, e.currentTarget.checked))
            }
            const taskTitleClass = t.isDone ? 'is-done' : '';
            return (
                <li key={t.id}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeStatus}
                    />
                    <span className={taskTitleClass}>{t.title}</span>
                    <button onClick={onClickHandler}>x</button>
                </li>
            )
        })
        : <span>Nothing to see</span>

    const allBtnClass = filter === 'all' ? 'active-filter' : '';
    const activeBtnClass = filter === 'active' ? 'active-filter' : ''
    const completedBtnClass = filter === 'completed' ? 'active-filter' : ''
    const inputClass = error ? 'error' : ''

    return (
        <div>

            <h3>
                {title}
                <button onClick={removeTodoListHandler}>x</button>
            </h3>

            <div>
                <input
                    type="text" value={titleValue}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressHandler}
                    className={inputClass}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}>Title is required</div>}
            </div>

            <ul>
                {tasksListItems}
            </ul>

            <div>
                <button
                    className={allBtnClass}
                    onClick={onClickFilterHandler('all')}>All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={onClickFilterHandler('active')}>Active
                </button>
                <button
                    className={completedBtnClass}
                    onClick={onClickFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    );
};


