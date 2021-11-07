import {
    ADD_TODO_ACTION,
    UPDATE_TODO_ACTION,
    DELETE_TODO_ACTION,
    TOGGLE_TODO_ACTION,
    DELETE_COMPLETED_TODO_ACTION,
    UPDATE_TODO_TITLE,
    ADD_BOX_ACTION,
    DELETE_BOX_ACTION,
    FILTER_BOX_ACTION,
    UPDATE_TASKS_ACTION,
    UPDATE_BOX_POSITION_ACTION,
    FILTER_APP_ACTION, DELETE_COMPLETED_APP_ACTION
} from './TodoConstants'

export const addTodoAction = (state) => ({
    type: ADD_TODO_ACTION,
    payload: state
})
export const updateTodoAction = (state) => ({
    type: UPDATE_TODO_ACTION,
    payload: state
})
export const updateTodoTitle = (state) => ({
    type: UPDATE_TODO_TITLE,
    payload: {title: state.title, index: state.index}
})
export const updateTasksAction = (state) => ({
    type: UPDATE_TASKS_ACTION,
    payload: {tasks: state.tasks, index: state.index}
})
export const toggleTodoAction = (state) => ({
    type: TOGGLE_TODO_ACTION,
    payload: {task: {...state.task, completed: !state.task.completed}, index: state.index}
})
export const deleteTodoAction = (state) => ({
    type: DELETE_TODO_ACTION,
    payload: state
})
export const deleteAllDone = (state) => ({
    type: DELETE_COMPLETED_APP_ACTION,
    payload: state
})
export const deleteCompleted = (state) => ({
    type: DELETE_COMPLETED_TODO_ACTION,
    payload: state
})

export const addBoxAction = (state) => ({
    type: ADD_BOX_ACTION,
    payload: state
})
export const filterBoxAction = (state) => ({
    type: FILTER_BOX_ACTION,
    payload: state
})
export const setAppFilters = (state) => ({
    type: FILTER_APP_ACTION,
    payload: state
})
export const updateBoxPositionAction = (state) => ({
    type: UPDATE_BOX_POSITION_ACTION,
    payload: {newIndex: state.newIndex, oldIndex: state.oldIndex}
})
export const deleteBoxAction = (index) => ({
    type: DELETE_BOX_ACTION,
    payload: index
})

