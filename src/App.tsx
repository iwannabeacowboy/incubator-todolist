import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to learn'

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: false},
        {id: v1(), title: 'React', isDone: false}
    ])

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((t) => t.id !== taskID))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let filteredTasks: Array<TaskType>
    switch (filter){
        case 'active':
            filteredTasks = tasks.filter((t) => !t.isDone)
            break
        case 'completed':
            filteredTasks = tasks.filter((t) => t.isDone)
            break
        default:
            filteredTasks = tasks
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

