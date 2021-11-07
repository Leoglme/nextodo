import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {cleanup, render} from "@testing-library/react";
import '@testing-library/jest-dom';
import {todosReducer} from "../../store/TodoStore/TodoReducer";
import {
    addBoxAction,
    addTodoAction,
    deleteBoxAction, deleteCompleted, deleteTodoAction, toggleTodoAction, updateTasksAction,
    updateTodoAction,
    updateTodoTitle
} from "../../store/TodoStore/TodoActions";
import {
    filteredTodosSelector,
    todosCompletedSelector,
    todosRemainingSelector,
    todosSelector,
    todosTitleSelector
} from "../../store/TodoStore/TodoSelectors";

afterEach(cleanup);


function renderWithRedux(
    component,
    {initialState, store = createStore(todosReducer, initialState)} = {}
) {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    };
}

const mockBox = {title: 'testing', tasks: []};
const mockTodo = {
    value: 'testing',
    index: 0,
    description: 'description'
}
let mockId = 1;
let expectedAddTodo = [{
    title: 'testing',
    tasks: [{
        id: mockId,
        name: mockTodo.value,
        description: mockTodo.description,
        completed: false,
    }]
}]


const resetState = () => {
    expectedAddTodo = [{
        title: 'testing',
        tasks: [{
            id: mockId,
            name: mockTodo.value,
            description: mockTodo.description,
            completed: false,
        }]
    }]
}


describe('Todos redux tests', () => {
    it('should return the initial state', () => {
        expect(todosReducer(undefined, {})).toEqual([])
    })

    describe('Selectors Testing', () => {
        it('todos selector should select all todos', () => {
            const todos = [{
                title: 'testing',
                tasks: [{
                    id: 1,
                    name: 'task1',
                    description: "description",
                    completed: false,
                }]
            }]
            expect(todosSelector({todos})).toEqual(todos)
        });
        it('todos remaining selector should select only remaining task', () => {
            const todos = [{
                title: 'testing',
                tasks: [{
                    id: 1,
                    name: 'task1',
                    description: "description",
                    completed: true,
                }]
            }]
            expect(todosRemainingSelector({todos}, 0)).toEqual([])
        });
        it('todos title selector should select todo box title', () => {
            const todos = [{
                title: 'testing',
                tasks: [{
                    id: 1,
                    name: 'task1',
                    description: "description",
                    completed: false,
                }]
            }]
            expect(todosTitleSelector({todos}, 0)).toEqual('testing')
        });
        it('todos completed selector should select only completed task', () => {
            const todos = [{
                title: 'testing',
                tasks: [{
                    id: 1,
                    name: 'task1',
                    description: "description",
                    completed: false,
                }]
            }]
            expect(todosCompletedSelector({todos})).toEqual([])
        });
        it('if the filter is null, the filter tasks selector must select all the tasks', () => {
            const todos = [{
                title: 'testing',
                tasks: [{
                    id: 1,
                    name: 'task1',
                    description: "description",
                    completed: false,
                }]
            }]
            const filter = null;
            expect(filteredTodosSelector({todos, filter})).toEqual(todos)
        });
        it('if the filter is completed, the filter todos selector must select only completed task', () => {
            const todos = [{
                title: 'testing',
                tasks: [{
                    id: 1,
                    name: 'task1',
                    description: "description",
                    completed: true,
                }]
            }, {
                title: 'testing',
                tasks: [{
                    id: 1,
                    name: 'task1',
                    description: "description",
                    completed: false,
                }]
            }]
            const filter = true;
            expect(filteredTodosSelector({todos, filter})).toEqual([{
                title: 'testing',
                tasks: [{
                    id: 1,
                    name: 'task1',
                    description: "description",
                    completed: true,
                }]
            }])
        });
        it('if the filter is remaining, the filter todos selector must select only remaining task', () => {
            const todos = [{
                title: 'testing',
                tasks: [{
                    id: 1,
                    name: 'task1',
                    description: "description",
                    completed: true,
                }]
            }, {
                title: 'testing',
                tasks: [{
                    id: 1,
                    name: 'task1',
                    description: "description",
                    completed: false,
                }]
            }]
            const filter = true;
            expect(filteredTodosSelector({todos, filter})).toEqual([{
                title: 'testing',
                tasks: [{
                    id: 1,
                    name: 'task1',
                    description: "description",
                    completed: true,
                }]
            }])
        });
    })

    describe('Action Testing', () => {
        describe('Box Actions Testing', () => {
            it('should handle a todos box being added to an empty list', () => {
                const previousState = []
                expect(todosReducer(previousState, addBoxAction(mockBox))).toEqual([mockBox])
            })

            it('should handle a todos box added to an existing list', () => {
                const previousState = [
                    {title: 'title', tasks: []}
                ]
                expect(todosReducer(previousState, addBoxAction(mockBox))).toEqual([
                    {title: 'title', tasks: []},
                    mockBox
                ])
            })

            it('should handle a todos box being deleted', () => {
                const index = 0;
                const previousState = [
                    {title: 'title', tasks: []}
                ]
                expect(todosReducer(previousState, deleteBoxAction(index))).toEqual([])
            })
        })

        describe('Tasks Actions Testing', () => {
            it('should handle a todo tasks being updated', () => {
                const tasks = [{
                    id: 1,
                    name: 'toto',
                    description: "lorem",
                    completed: false,
                }]
                const mockState = [{
                    title: 'testing', tasks: [{
                        id: 1,
                        name: 'tata',
                        description: "lorem",
                        completed: false,
                    }]
                }];
                const mockUpdateTasks = {index: 0, tasks}
                expect(todosReducer(mockState, updateTasksAction(mockUpdateTasks)))
                    .toEqual([{
                        title: 'testing',
                        tasks: tasks
                    }])
            })

            it('should handle a task completed value being updated', () => {
                const task = {
                    id: 1,
                    name: 'toto',
                    description: "lorem",
                    completed: false,
                }
                const mockState = [{title: 'testing', tasks: [task]}];
                const mockPayload = {task, index: 0}
                expect(todosReducer(mockState, toggleTodoAction(mockPayload)))
                    .toEqual([{
                        title: 'testing',
                        tasks: [{
                            id: 1,
                            name: 'toto',
                            description: "lorem",
                            completed: true,
                        }]
                    }])
            })

            it('should handle a task box being deleted', () => {
                const task = {
                    id: 1,
                    name: 'toto',
                    description: "lorem",
                    completed: false,
                }
                const mockPayload = {task, index: 0};
                const previousState = [
                    {title: 'title', tasks: [task]}
                ]
                expect(todosReducer(previousState, deleteTodoAction(mockPayload))).toEqual([
                    {title: 'title', tasks: []}
                ])
            })
        })

        describe('Todo Actions Testing', () => {
            it('should handle a todo being added to an empty tasks list', () => {
                const previousState = [mockBox]
                expect(todosReducer(previousState, addTodoAction(mockTodo)))
                    .toEqual(expectedAddTodo)
            })
            it('should handle a todo box added to an existing tasks list', () => {
                const tempTodo = {
                    id: 2,
                    name: mockTodo.value,
                    description: mockTodo.description,
                    completed: false,
                }
                expect(todosReducer(expectedAddTodo, addTodoAction(mockTodo)))
                    .toEqual([{
                        title: 'testing',
                        tasks: [{
                            id: mockId,
                            name: mockTodo.value,
                            description: mockTodo.description,
                            completed: false,
                        }, tempTodo]
                    }])
                resetState()
            })

            it('should handle a todo being updated', () => {
                const task = {
                    id: 1,
                    name: 'toto',
                    description: "lorem",
                    completed: false,
                }
                const mockState = [{title: 'testing', tasks: [task]}];
                const updated = {
                    id: 1,
                    name: 'updateName',
                    description: 'updateDesc'
                }
                const mockUpdateTodo = {updated, index: 0, task}
                expect(todosReducer(mockState, updateTodoAction(mockUpdateTodo)))
                    .toEqual([{
                        title: 'testing',
                        tasks: [{
                            id: 1,
                            name: 'updateName',
                            description: 'updateDesc'
                        }]
                    }])
            })

            it('should handle a todo title being updated', () => {
                const mockTitle = {title: 'newTitle', index: mockTodo.index}
                expect(todosReducer(expectedAddTodo, updateTodoTitle(mockTitle)))
                    .toEqual([{
                        title: 'newTitle',
                        tasks: [{
                            id: mockId,
                            name: mockTodo.value,
                            description: mockTodo.description,
                            completed: false,
                        }]
                    }])
            })

            it('should handle a tasks completed being deleted', () => {
                const tasks = [
                    {
                        id: 1,
                        name: 'task1',
                        description: "lorem",
                        completed: true,
                    },
                    {
                        id: 2,
                        name: 'task2',
                        description: "lorem",
                        completed: false,
                    }
                ]
                const index = 0;
                const previousState = [
                    {title: 'title', tasks}
                ]
                expect(todosReducer(previousState, deleteCompleted(index))).toEqual([
                    {
                        title: 'title', tasks: [{
                            id: 2,
                            name: 'task2',
                            description: "lorem",
                            completed: false,
                        }]
                    }
                ])
            })
        })
    })

})
