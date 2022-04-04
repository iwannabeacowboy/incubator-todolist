import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to learn'

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: false},
        {id: 4, title: 'React', isDone: false}
    ])

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter((t) => t.id !== taskID))
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
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

