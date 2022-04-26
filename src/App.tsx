import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
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
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    const removeTask = (todoListID: string, taskID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
    }

    const addTask = (todoListID: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    const changeTaskStatus = (todoListID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }

    const changeFilter = (todoListID: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
    }

    return (
        <div className="App">

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
                    />
                )
            })}

        </div>
    );
}

export default App;

