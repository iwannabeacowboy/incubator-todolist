import {v1} from 'uuid';
import {FilterValuesType, TodoListsType} from '../App';
import {addTodoListAC, changeFilterAC, editTodoListAC, removeTodoListAC, todoListReducer} from './todoList-reducer';

const todoListID1 = v1();
const todoListID2 = v1();

const startState: Array<TodoListsType> = [
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'}
]

test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, removeTodoListAC(todoListID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListID2);
});

test('correct todolist should be added', () => {

    const newTodoListTitle = 'New Todolist';
    const newID = v1()
    const newTodoList: TodoListsType = {id: newID, title: newTodoListTitle, filter: 'all'}

    const endState = todoListReducer(startState, addTodoListAC(newTodoList))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
});

test('correct todolist should change its name', () => {

    const newTodolistTitle = 'New Todolist';

    const endState = todoListReducer(startState, editTodoListAC(todoListID2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    const newFilter: FilterValuesType = "completed";

    const endState = todoListReducer(startState, changeFilterAC(todoListID2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
