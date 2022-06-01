import {TasksType} from '../App';
import {addTaskAC, changeTaskStatusAC, editTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodoListAC} from './todoList-reducer';

let startState: TasksType

beforeEach(() => {
    startState = {
        todoListID1: [
            {id: '1', title: 'HTML&CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todoListID2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC('todoListID2', '2'))

    expect(endState).toEqual({
        todoListID1: [
            {id: '1', title: 'HTML&CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        todoListID2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    });
})

test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, addTaskAC('todoListID2', 'juice'))

    expect(endState['todoListID1'].length).toBe(3);
    expect(endState['todoListID2'].length).toBe(4);
    expect(endState['todoListID2'][0].id).toBeDefined();
    expect(endState['todoListID2'][0].title).toBe('juice');
    expect(endState['todoListID2'][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC('todoListID2', '2', false))

    expect(endState['todoListID2'][1].isDone).toBe(false);
    expect(endState['todoListID1'][1].isDone).toBe(true);
});

test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState, editTaskAC('todoListID2', '2', 'rice'))

    expect(endState['todoListID2'][1].title).toBe('rice');
    expect(endState['todoListID1'][1].title).toBe('JS');
})

test('new array should be added when new todolist is added', () => {

    const endState = tasksReducer(startState, addTodoListAC('new TodoList'));

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todoListID1' && k !== 'todoListID2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});