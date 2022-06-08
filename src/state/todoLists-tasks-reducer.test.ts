import {TasksType, TodoListType} from '../App';
import {addTodoListAC, removeTodoListAC, todoListsReducer} from './todoLists-reducer';
import {tasksReducer} from './tasks-reducer';

test('IDs should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodoListsState: TodoListType[] = [];

    const action = addTodoListAC('new todoList');

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoListID);
    expect(idFromTodoLists).toBe(action.payload.todoListID);
});


test('property with todolistID2 should be deleted', () => {
    const startState: TasksType = {
        'todoListID1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todoListID2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    };

    const action = removeTodoListAC('todoListID2');

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todoListID2']).not.toBeDefined();
});

