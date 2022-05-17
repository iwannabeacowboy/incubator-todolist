import React from 'react';
import {FilterValuesType, TaskType} from '../App';
import {FullInput} from './FullInput';
import {EditableSpan} from './EditableSpan';
import {Checkbox} from './Checkbox';

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
    editTodoList: (todoListID: string, newTitle: string) => void
    editTask: (todoListID: string, taskID: string, newTitle: string) => void
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
                                                     removeTodoList,
                                                     editTodoList,
                                                     editTask
                                                 }) => {

    const onClickFilterHandler = (filter: FilterValuesType) => {
        return () => changeFilter(todoListID, filter)
    }

    const removeTodoListHandler = () => {
        removeTodoList(todoListID)
    }

    const addTaskHandler = (newTitle: string) => {
        addTask(todoListID, newTitle)
    }

    const editTodoListHandler = (newTitle: string) => {
        editTodoList(todoListID, newTitle)
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
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

    const filteredTasks = getFilteredTasks(tasks, filter)

    const tasksListItems = filteredTasks.length
        ? filteredTasks.map(t => {

            const onClickHandler = () => removeTask(todoListID, t.id)
            const onChangeStatus = (checked: boolean) => {
                changeTaskStatus(todoListID, t.id, checked)
            }
            const editTaskHandler = (newTitle: string) => {
                editTask(todoListID, t.id, newTitle)
            }

            const taskTitleClass = t.isDone ? 'is-done' : '';

            return (
                <li key={t.id}>
                    <Checkbox isDone={t.isDone} callBack={onChangeStatus}/>

                    <EditableSpan
                        className={taskTitleClass}
                        title={t.title}
                        callBack={editTaskHandler}
                    />
                    <button onClick={onClickHandler}> x</button>
                </li>
            )
        })
        : <span>Nothing to see</span>

    const allBtnClass = filter === 'all' ? 'active-filter' : '';
    const activeBtnClass = filter === 'active' ? 'active-filter' : ''
    const completedBtnClass = filter === 'completed' ? 'active-filter' : ''

    return (
        <div>
            <h3>
                <EditableSpan title={title} callBack={editTodoListHandler}/>
                <button onClick={removeTodoListHandler}>x</button>
            </h3>

            <FullInput
                callBack={addTaskHandler}
            />

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


