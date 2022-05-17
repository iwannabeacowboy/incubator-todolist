import React, {useReducer} from 'react';
import {TodoList} from './components/TodoList';
import {v1} from 'uuid';
import {FullInput} from './components/FullInput';
import {
    addEmptyAC,
    addTaskAC,
    changeTaskStatusAC,
    deleteTasksAC,
    editTaskAC,
    removeTaskAC,
    tasksReducer
} from './state/tasks-reducer';
import {
    addTodoListAC,
    changeFilterAC,
    editTodoListAC,
    removeTodoListAC,
    todoListReducer
} from './state/todoList-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListsType = {
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
    [x: string]: TaskType[]
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todoLists, todoListsDispatch] = useReducer(todoListReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'eggs', isDone: true},
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'steak', isDone: false},
            {id: v1(), title: 'rice', isDone: false},
        ]
    });

    const removeTodoList = (todolistID: string) => {
        todoListsDispatch(removeTodoListAC(todolistID))
        tasksDispatch(deleteTasksAC(todolistID))
    }

    const addTodoList = (newTitle: string) => {
        const newID = v1()
        const newTodoList: TodoListsType = {id: newID, title: newTitle, filter: 'all'}
        todoListsDispatch(addTodoListAC(newTodoList))
        tasksDispatch(addEmptyAC(newID))
    }

    const changeFilter = (todoListID: string, filter: FilterValuesType) => {
        todoListsDispatch(changeFilterAC(todoListID, filter))
    }

    const editTodoList = (todoListID: string, newTitle: string) => {
        todoListsDispatch(editTodoListAC(todoListID, newTitle))
    }

    const removeTask = (todoListID: string, taskID: string) => {
        tasksDispatch(removeTaskAC(todoListID, taskID))
    }

    const addTask = (todoListID: string, newTitle: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        tasksDispatch(addTaskAC(todoListID, newTask))
    }

    const changeTaskStatus = (todoListID: string, taskID: string, isDone: boolean) => {
        tasksDispatch(changeTaskStatusAC(todoListID, taskID, isDone))
    }

    const editTask = (todoListID: string, taskID: string, newTitle: string) => {
        tasksDispatch(editTaskAC(todoListID, taskID, newTitle))
    }

    return (
        <div className="App">

            <FullInput callBack={addTodoList}/>

            {todoLists.map(tl => {
                return (
                    <TodoList
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        filter={tl.filter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        editTodoList={editTodoList}
                        editTask={editTask}
                    />
                )
            })}

        </div>
    );
}

export default App;