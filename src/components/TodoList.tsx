import React, {memo, useCallback} from 'react';
import {FilterValuesType, TaskType, TodoListType} from '../App';
import {FullInput} from './FullInput';
import {EditableSpan} from './EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../state/store';
import {addTaskAC} from '../state/tasks-reducer';
import {changeFilterAC, editTodoListAC, removeTodoListAC} from '../state/todoLists-reducer';
import {Task} from './Task';

type TodoListPropsType = {
    todoList: TodoListType
}

export const TodoList = memo(({todoList}: TodoListPropsType) => {

    const tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[todoList.id])

    const dispatch = useDispatch()

    const onClickFilterHandler = useCallback((filter: FilterValuesType) => {
        return () => dispatch(changeFilterAC(todoList.id, filter))
    }, [todoList.id])

    const removeTodoListHandler = () => {
        dispatch(removeTodoListAC(todoList.id))
    }

    const editTodoListHandler = useCallback((newTitle: string) => {
        dispatch(editTodoListAC(todoList.id, newTitle))
    }, [todoList.id])

    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTaskAC(todoList.id, newTitle))
    }, [todoList.id])

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
                {filteredTasks.length ? filteredTasks.map(t => {
                        return (
                            <Task
                                task={t}
                                todoListID={todoList.id}
                                key={t.id}
                            />
                        )
                    })
                    : <span>Nothing to see</span>}
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
});

