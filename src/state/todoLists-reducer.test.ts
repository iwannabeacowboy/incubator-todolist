import {FilterValuesType, TodoListType} from '../App';
import {addTodoListAC, changeFilterAC, editTodoListAC, removeTodoListAC, todoListsReducer} from './todoLists-reducer';

let startState: TodoListType[]

beforeEach(() => {
    startState = [
        {id: 'todoListID1', title: 'What to learn', filter: 'all'},
        {id: 'todoListID2', title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC('todoListID1'))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe('todoListID2');
});

test('correct todolist should be added', () => {

    const newTodoListTitle = 'New Todolist';

    const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
});

test('correct todolist should change its name', () => {

    const newTodolistTitle = 'New Todolist';

    const endState = todoListsReducer(startState, editTodoListAC('todoListID2', newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    const newFilter: FilterValuesType = 'completed';

    const endState = todoListsReducer(startState, changeFilterAC('todoListID2', newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
