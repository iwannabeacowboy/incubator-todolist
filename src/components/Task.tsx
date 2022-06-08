import React, {memo} from 'react';
import {changeTaskStatusAC, editTaskAC, removeTaskAC} from '../state/tasks-reducer';
import {Checkbox} from './Checkbox';
import {EditableSpan} from './EditableSpan';
import {useDispatch} from 'react-redux';
import {TaskType} from '../App';

type TaskPropsType = {
    task: TaskType
    todoListID: string
}

export const Task = memo(({task, todoListID}: TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(todoListID, task.id))

    const onChangeStatus = (isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListID, task.id, isDone))
    }

    const editTaskHandler = (newTitle: string) => {
        dispatch(editTaskAC(todoListID, task.id, newTitle))
    }

    const taskTitleClass = task.isDone ? 'is-done' : '';

    return (
        <li>
            <Checkbox isDone={task.isDone} callBack={onChangeStatus}/>

            <EditableSpan
                className={taskTitleClass}
                title={task.title}
                callBack={editTaskHandler}
            />
            <button onClick={onClickHandler}> x</button>
        </li>
    )
});