import React from 'react';
import {FilterValuesType, TaskType, TodoListType} from '../App';
import {FullInput} from './FullInput';
import {EditableSpan} from './EditableSpan';
import {Checkbox} from './Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../state/store';
import {addTaskAC, changeTaskStatusAC, editTaskAC, removeTaskAC} from '../state/tasks-reducer';
import {changeFilterAC, editTodoListAC, removeTodoListAC} from '../state/todoLists-reducer';

type PropsType = {
    todoList: TodoListType
}

export const TodoList: React.FC<PropsType> = ({todoList}) => {

    const tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[todoList.id])

    const dispatch = useDispatch()

    const onClickFilterHandler = (filter: FilterValuesType) => {
        return () => dispatch(changeFilterAC(todoList.id, filter))
    }

    const removeTodoListHandler = () => {
        dispatch(removeTodoListAC(todoList.id))
    }

    const addTaskHandler = (newTitle: string) => {
        dispatch(addTaskAC(todoList.id, newTitle))
    }

    const editTodoListHandler = (newTitle: string) => {
        dispatch(editTodoListAC(todoList.id, newTitle))
    }

    let filteredTasks: TaskType[]
    switch (todoList.filter) {
        case 'active':
            filteredTasks = tasks.filter((t) => !t.isDone)
            break
        case 'completed':
            filteredTasks = tasks.filter((t) => t.isDone)
            break
        default:
            filteredTasks = tasks
    }

    const tasksListItems = filteredTasks.length
        ? filteredTasks.map(t => {

            const onClickHandler = () => dispatch(removeTaskAC(todoList.id, t.id))
            const onChangeStatus = (isDone: boolean) => {
                dispatch(changeTaskStatusAC(todoList.id, t.id, isDone))
            }
            const editTaskHandler = (newTitle: string) => {
                dispatch(editTaskAC(todoList.id, t.id, newTitle))
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

    const allBtnClass = todoList.filter === 'all' ? 'active-filter' : '';
    const activeBtnClass = todoList.filter === 'active' ? 'active-filter' : ''
    const completedBtnClass = todoList.filter === 'completed' ? 'active-filter' : ''

    return (
        <div>
            <h3>
                <EditableSpan title={todoList.title} callBack={editTodoListHandler}/>
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


